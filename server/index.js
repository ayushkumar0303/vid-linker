import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import youtubeRouter from "./routes/youtube.routes.js";
import videoRouter from "./routes/video.routes.js";
import path from "path";

const app = express();

app.use(express.json());
dotenv.config();
app.use(cookieParser());

const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(express.static(path.join(__dirname, "/client/dist")));

app.listen(3000, (req, res) => {
  console.log("server is running on port number 3000");
});

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
app.use("/server/youtube", youtubeRouter);
app.use("/server/video", videoRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: statusCode,
    message,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
