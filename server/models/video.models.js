import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    freelancerId: {
      type: String,
      ref: "User",
      required: true,
    },
    clientId: {
      type: String,
      requrired: true,
      ref: "User", // Foreign Key (References Users collection)
    },
    videoUrl: {
      type: String,
      unique: true,
    },
    videoStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    videoTitle: {
      type: String,
    },
    videoDiscription: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
