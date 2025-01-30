import express from "express";
import testUser, {
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";
import verifyToken from "../utils/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/test", testUser);
userRouter.get("/get-users", getUsers);
userRouter.put("/update-user/:userId", verifyToken, updateUser);

export default userRouter;
