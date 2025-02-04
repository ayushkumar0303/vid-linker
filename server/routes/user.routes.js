import express from "express";
import testUser, {
  accessTokenCheck,
  deleteYoutubeAuthToken,
  getUser,
  signOut,
  updateUser,
} from "../controllers/user.controllers.js";
import verifyToken from "../utils/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/test", testUser);
userRouter.get("/access-token-check", accessTokenCheck);
userRouter.get("/get-user/:userId", verifyToken, getUser);
userRouter.put("/update-user/:userId", verifyToken, updateUser);
userRouter.put(
  "/delete-youtube-auth/:userId",
  verifyToken,
  deleteYoutubeAuthToken
);
userRouter.post("/sign-out", signOut);

export default userRouter;
