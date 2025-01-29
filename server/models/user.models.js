import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,

      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.mMz3b-Tnh_-Qwg3atrTl_AHaGO?rs=1&pid=ImgDetMain",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("user", userSchema);

export default User;
