import User from "../models/user.models.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";

const testUser = (req, res) => {
  // console.log("testing is successful");
  res.json({ message: "testing is successful" });
};
export const getUser = async (req, res, next) => {
  // console.log(req.user.id);
  // console.log(req.params.userId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to get this user"));
  }

  try {
    const user = await User.findById(req.user.id);
    // console.log(user);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const { password: _pass, ...rest } = user._doc;

    return res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};
export const updateUser = async (req, res, next) => {
  let { username, email, password } = req.body;
  // console.log(req.params.userId);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to update this user"));
  }
  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }

    password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username.length < 8 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be in between 8 to 20 characters")
      );
    }
    if (username != username.toLowerCase()) {
      return next(errorHandler(400, "username must be in lower case"));
    }

    if (username.includes(" ")) {
      return next(
        errorHandler(400, "Username should not contain white spaces")
      );
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username must contain only numbers and letters")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          email,
          password,
        },
      },
      { new: true }
    );

    const { password: _pass, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};

export const deleteYoutubeAuthToken = async (req, res, next) => {
  // console.log("ddjjddj");
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(401, "You are not allowed to delete the youtube auth token")
    );
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $unset: {
          youtubeAuthToken: "",
        },
      },
      { new: true }
    );
    const { password: _pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    return next(error);
  }
};

export default testUser;

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token", { httpOnly: true });
    if (req.cookies?.auth_token) {
      res.clearCookie("auth_token", { httpOnly: true });
    }

    return res.status(200).json({ message: "User sign out successful" });
  } catch (error) {
    return next(error);
  }
};

export const accessTokenCheck = async (req, res, next) => {
  if (!req.cookies?.access_token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  return res.status(200).json({ message: "Authenticated" });
};

export const fetchClients = async (req, res, next) => {
  const { search } = req.query;
  // console.log(search);
  if (search.length === 0) {
    return res.status(200).json([]);
  }
  try {
    const clients = await User.find({
      username: { $regex: `^${search}`, $options: "i" }, // Case-insensitive regex
      role: "client",
    }).limit(5);
    // console.log(clients);
    if (clients.length === 0) {
      return res.status(400).json({ message: "No clients found" });
    }
    return res.status(200).json(clients);
  } catch (error) {
    return next(error);
  }
};
