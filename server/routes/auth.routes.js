import express from "express";
import signUp, { signin } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signin);

export default authRouter;
