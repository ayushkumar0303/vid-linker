import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
const app = express();

mongoose
  .connect(
    "mongodb+srv://ayush8295:ayush@vid-linker.s2mfe.mongodb.net/?retryWrites=true&w=majority&appName=vid-linker"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(3000, (req, res) => {
  console.log("server is running on port number 3000");
});

app.use("/", userRouter);
