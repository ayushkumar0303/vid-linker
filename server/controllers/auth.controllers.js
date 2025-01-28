import errorHander from "../utils/error.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let name = firstName;

  if (lastName) {
    name = " " + lastName;
  }
  // console.log(name);
  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHander(404, "All fields are required"));
  }

  const username =
    name.toLowerCase().split(" ").join("") +
    Math.random().toString(9).slice(-4);
  // console.log(username);
  // const num = Math.random();
  // console.log(num.toString());
  // console.log(num.toString(9));
  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    name,
    username,
    email,
    password: hashPassword,
    role: "freelancer",
  });

  try {
    await newUser.save();
    res.status(200).json("Sign up successful");
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHander(404, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHander(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHander(401, "Invalid password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        role: validUser.role,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: _pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
  // console.log(user);
};

export default signUp;
