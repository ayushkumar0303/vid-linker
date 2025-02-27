import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  getClientsList,
  getFreelancersList,
  getVideosForFreelancer,
  getVideosForClient,
  setVideoMetaData,
  uploadVideo,
  videoReject,
} from "../controllers/video.controllers.js";

const videoRouter = express.Router();

videoRouter.post("/upload-video/:userId", verifyToken, uploadVideo);
videoRouter.get("/get-review-videos/:userId", verifyToken, getVideosForClient);
videoRouter.get("/get-videos/:userId", verifyToken, getVideosForFreelancer);
videoRouter.post(
  "/set-meta-data/:userId/:videoId",
  verifyToken,
  setVideoMetaData
);

videoRouter.get(
  "/get-freelancers-list/:userId",
  verifyToken,
  getFreelancersList
);
videoRouter.get("/get-clients-list/:userId", verifyToken, getClientsList);
videoRouter.post("/video-reject/:userId/:videoId", verifyToken, videoReject);

export default videoRouter;
