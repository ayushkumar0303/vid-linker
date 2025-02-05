import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
    videoDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
