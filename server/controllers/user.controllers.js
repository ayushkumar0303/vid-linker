import User from "../models/user.models.js";
import errorHander from "../utils/error.js";
import bcryptjs from "bcryptjs";

const testUser = (req, res) => {
  console.log("testing is successful");
  res.json("testing is successful");
};
export const getUsers = async (req, res, next) => {};
export const updateUser = async (req, res, next) => {
  let { username, email, password } = req.body;
  // console.log(req.params.userId);
  if (req.user.id !== req.params.userId) {
    return next(errorHander(401, "You are not allowed to update this user"));
  }
  if (password) {
    if (password.length < 6) {
      return next(errorHander(400, "Password must be at least 6 characters"));
    }

    password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username.length < 8 || username.length > 20) {
      return next(
        errorHander(400, "Username must be in between 8 to 20 characters")
      );
    }
    if (username != username.toLowerCase()) {
      return next(errorHander(400, "username must be in lower case"));
    }

    if (username.includes(" ")) {
      return next(errorHander(400, "Username should not contain white spaces"));
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHander(400, "Username must contain only numbers and letters")
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

export default testUser;
