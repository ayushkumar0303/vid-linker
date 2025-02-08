import express from "express";
import {
  clientSignin,
  clientSignup,
  freelancerSignin,
  freelancerSignup,
  googleClient,
  googleFreelancer,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/client-signup", clientSignup);
authRouter.post("/client-signin", clientSignin);
authRouter.post("/freelancer-signin", freelancerSignin);
authRouter.post("/freelancer-signup", freelancerSignup);
authRouter.post("/google-freelancer-auth", googleFreelancer);
authRouter.post("/google-client-auth", googleClient);

export default authRouter;
