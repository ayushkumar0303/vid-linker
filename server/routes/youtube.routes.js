import express from "express";
import {
  youtubeCallback,
  youtubeConnect,
  youtubeUpload,
} from "../controllers/youtube.controllers.js";
import verifyToken from "../utils/verifyToken.js";

const youtubeRouter = express.Router();

youtubeRouter.get("/connect/:userId", verifyToken, youtubeConnect);
youtubeRouter.get("/callback", youtubeCallback);
youtubeRouter.get("/upload/:userId", verifyToken, youtubeUpload);

export default youtubeRouter;
//
