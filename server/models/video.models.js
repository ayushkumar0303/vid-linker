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
      enum: ["Pending", "Approved", "Rejected", "Uploaded"],
      default: "Pending",
    },
    videoTitle: {
      type: String,
      default: "",
    },
    videoDescription: {
      type: String,
      default: "",
    },
    videoRejectMessage: {
      type: String,
      default: "",
    },
    youtubeAuthToken: {
      type: Object,
      default: {},
    },
    youtubeChannelName: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
