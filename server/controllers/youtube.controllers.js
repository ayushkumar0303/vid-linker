import { google } from "googleapis";
import oauth2Client from "../googleAuth.js";
import Video from "../models/video.models.js";
import fs from "fs";
import errorHandler from "../utils/error.js";
import { pipeline } from "stream/promises";
import jwt from "jsonwebtoken";

export const youtubeConnect = async (req, res) => {
  // console.log("inside youtube connect");
  const { videoId } = req.query;
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],

    // state: JSON.stringify({ videoId, username }), // Store User ID in state
    state: videoId,
  });

  // console.log(url);

  res.redirect(url);
};

export const youtubeCallback = async (req, res, next) => {
  // console.log("inside youtube callback");

  // console.log(req.query);
  // const { code, state } = req.query;
  const { code, state } = req.query;
  // const { username, videoId } = JSON.parse(state);
  // console.log(username);
  // console.log(videoId);
  // console.log(state);

  if (!code || !state)
    return res.status(400).json({ message: "Missing parameters" });

  // Exchange code for tokens
  const { tokens } = await oauth2Client.getToken(code);
  const authToken = jwt.sign(tokens, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  // console.log(authToken);
  // console.log(tokens);

  res.cookie("auth_token", authToken, {
    httpOnly: true,
  });

  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  // console.log(youtube.channels);

  try {
    const response = await youtube.channels.list({
      part: "snippet",
      mine: true,
    });

    const channelName = response.data.items[0].snippet.customUrl;

    // console.log(channelName);
    // res.redirect(`http://localhost:5173/dashboard`);

    // // const { password: _pass, ...rest } = user._doc;
    res.redirect(`http://localhost:5173/upload/${state}/${channelName}`);
  } catch (error) {
    // console.error(error);
    res.status(400).json({
      message: "Youtube auth failed",
      error,
    });
  }
};

export const youtubeUpload = async (req, res, next) => {
  // console.log("youtubeUplaod");
  const { videoId } = req.query;
  const { id } = req.user;
  // console.log(videoId);
  // console.log(id);
  const tempFilePath = "./tempVideoForYoutube.mp4";
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to upload this video"));
  }

  const authToken = req.cookies.auth_token;
  if (!authToken) {
    return next(errorHandler(401, "You are not allowed to upload this video"));
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (error, youtubeTokens) => {
    if (error) {
      return next(error);
    }
    req.youtubeTokens = youtubeTokens;
  });

  // console.log(req);
  oauth2Client.setCredentials(req.youtubeTokens);

  // Get User’s YouTube Channel ID
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  try {
    const videoToUpload = await Video.findOne({
      _id: videoId,
      clientId: id,
    });

    const { videoTitle, videoDescription, videoUrl } = videoToUpload;
    const resUrl = await fetch(videoUrl);
    if (!resUrl.ok) {
      return res.status(400).json({ message: "Failed to download file" });
    }
    const fileStream = fs.createWriteStream(tempFilePath);
    await pipeline(resUrl.body, fileStream);
    // console.log(fileStream);
    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: videoTitle,
          description: videoDescription,
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: fs.createReadStream(tempFilePath),
      },
    });
    // console.log(response);

    fs.unlink(tempFilePath, (err) => {
      if (err) {
        return next(err);
      }
    });

    // console.log(videoToUpload);
    // console.log(response);
    // console.log(response.statusText);

    if (response.status === 200) {
      videoToUpload.videoStatus = "Approved";
      await videoToUpload.save();
    }

    // console.log("Upload response:", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return next(error);
  }
};
