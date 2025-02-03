import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  getReviewVideos,
  setVideoMetaData,
  uploadVideo,
} from "../controllers/video.controllers.js";

const videoRouter = express.Router();

videoRouter.post("/upload-video/:userId", verifyToken, uploadVideo);
videoRouter.get("/get-review-videos/:userId", verifyToken, getReviewVideos);
videoRouter.post(
  "/set-meta-data/:userId/:videoId",
  verifyToken,
  setVideoMetaData
);

export default videoRouter;
