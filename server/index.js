import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import youtubeRouter from "./routes/youtube.routes.js";
const app = express();

app.use(express.json());
dotenv.config();
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(3000, (req, res) => {
  console.log("server is running on port number 3000");
});

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
app.use("/server/youtube", youtubeRouter);
