import { google } from "googleapis";
import oauth2Client from "../googleAuth.js";
import Video from "../models/video.models.js";
import fs from "fs";
import errorHandler from "../utils/error.js";
import { pipeline } from "stream/promises";
import jwt from "jsonwebtoken";
import { error } from "console";

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
  const authToken = jwt.sign(tokens, process.env.JWT_SECRET);
  // // console.log(authToken);
  // // console.log(tokens);

  // res.cookie("auth_token", authToken, {
  //   httpOnly: true,
  // });

  // console.log(tokens);

  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  // console.log(youtube.channels);

  try {
    const response = await youtube.channels.list({
      part: "snippet",
      mine: true,
    });

    const channelName = response.data.items[0].snippet.customUrl;

    if (!channelName) {
      return next(errorHandler(404, "No youtube channel found"));
    }

    const video = await Video.findByIdAndUpdate(
      state,
      {
        $set: {
          youtubeAuthToken: authToken,
          youtubeChannelName: channelName,
          videoStatus: "Approved",
        },
      },
      { new: true }
    );

    if (!video) {
      return next(errorHandler(404, "Video not found"));
    }

    // console.log(channelName);
    // res.redirect(`http://localhost:5173/dashboard`);

    // // const { password: _pass, ...rest } = user._doc;
    res.redirect(`https://vid-linker.onrender.com//dashboard`);
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

  const tempFilePath = "./tempVideoForYoutube.mp4";
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to upload this video"));
  }

  // console.log(req);

  try {
    const videoToUpload = await Video.findById(videoId);

    if (!videoToUpload) {
      return next(errorHandler(401, "Video not found"));
    }

    const { videoTitle, videoDescription, videoUrl, youtubeAuthToken } =
      videoToUpload;
    // console.log(youtubeAuthToken);

    if (
      !videoTitle ||
      !videoDescription ||
      !videoUrl ||
      videoTitle === "" ||
      videoDescription === "" ||
      videoUrl === ""
    ) {
      return next(errorHandler(404, "Missing parameters"));
    }

    if (!youtubeAuthToken || youtubeAuthToken === "") {
      return next(
        errorHandler(401, "you are not allowed to upload video in this channel")
      );
    }

    jwt.verify(youtubeAuthToken, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return next(err);
      }
      req.token = token;
    });

    oauth2Client.setCredentials(req.token);

    // Get User’s YouTube Channel ID
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    const resUrl = await fetch(videoUrl);

    if (!resUrl.ok) {
      // console.log(resUrl);
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
      videoToUpload.videoStatus = "Uploaded";
      videoToUpload.youtubeAuthToken = {};
      await videoToUpload.save();
    }

    // console.log("Upload response:", response.data);
    return res.status(200).json({ message: "Video Uploaded Successfully" });
  } catch (error) {
    return next(error);
  }
};
