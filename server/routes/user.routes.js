import express from "express";
import testUser from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/test", testUser);

export default userRouter;
