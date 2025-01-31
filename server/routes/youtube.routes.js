import express from "express";
import {
  youtubeCallback,
  youtubeConnect,
} from "../controllers/youtube.controllers.js";

const youtubeRouter = express.Router();

youtubeRouter.get("/connect", youtubeConnect);
youtubeRouter.get("/callback", youtubeCallback);

export default youtubeRouter;
//
