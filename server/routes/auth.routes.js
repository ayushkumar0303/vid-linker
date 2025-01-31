import express from "express";
import signUp, {
  googleClient,
  signin,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signin);
authRouter.post("/google-client-auth", googleClient);

export default authRouter;
