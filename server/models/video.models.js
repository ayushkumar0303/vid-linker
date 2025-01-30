import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    freelancerId: {
      type: String,
      required: true,
      ref: "User",
    },
    clientId: {
      type: String,
      required: true,
      ref: "User", // Foreign Key (References Users collection)
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("video", videoSchema);
export default Video;
