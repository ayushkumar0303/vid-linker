import { google } from "googleapis";
import oauth2Client from "../googleAuth.js";
import User from "../models/user.models.js";

export const youtubeConnect = async (req, res) => {
  console.log("inside youtube connect");
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing user ID" });

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
    state: userId, // Store User ID in state
  });

  // console.log(url);

  res.redirect(url);
};

export const youtubeCallback = async (req, res) => {
  console.log("inside youtube callback");
  // console.log(req.query);
  const { code, state } = req.query; // Auth Code + User ID
  if (!code || !state)
    return res.status(400).json({ message: "Missing parameters" });

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    oauth2Client.setCredentials(tokens);

    // Get User’s YouTube Channel ID
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });
    const response = await youtube.channels.list({
      mine: true,
      part: "id",
    });
    // console.log(response);
    const channelId = response.data.items[0]?.id || null;
    if (!channelId) {
      return res.status(400).json({ message: "No YouTube channel found" });
    }

    const user = await User.findByIdAndUpdate(
      state,
      {
        $set: {
          youtubeAuthToken: {
            youtubeAccessToken: tokens.access_token,
            youtubeRefreshToken: tokens.refresh_token,
            youtubeChannelId: channelId,
            linked: true,
          },
        },
      },
      { new: true }
    );

    // const { password: _pass, ...rest } = user._doc;
    res.redirect(`http://localhost:5173/dashboard?tab=add-accounts`);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "YouTube OAuth failed", error });
  }
};
