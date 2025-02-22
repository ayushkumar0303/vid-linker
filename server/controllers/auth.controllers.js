import errorHandler from "../utils/error.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const clientSignup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let name = firstName;

  if (lastName) {
    name += " " + lastName;
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
    next(errorHandler(404, "All fields are required"));
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
    role: "client",
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "Sign up successful" });
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

export const clientSignin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(404, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser || validUser.role === "freelancer") {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
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

export const googleClient = async (req, res, next) => {
  const { name, email, profilePicture } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.role === "freelancer") {
        return next(errorHandler(404, "User not found"));
      }
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      const { password: __pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const username =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4);
      const password = Math.random().toString(36).slice(-8);
      // console.log(password);
      // console.log(username);

      const hashPassword = bcryptjs.hashSync(password, 10);
      try {
        const newUser = await User({
          name,
          username,
          email,
          profilePicture,
          password: hashPassword,
          role: "client",
        });

        await newUser.save();

        const token = jwt.sign(
          {
            id: newUser._id,
            isAdmin: newUser.isAdmin,
            role: newUser.role,
          },
          process.env.JWT_SECRET
        );

        const { password: __pass, ...rest } = newUser._doc;

        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json(rest);
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const freelancerSignup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let name = firstName;

  if (lastName) {
    name += " " + lastName;
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
    next(errorHandler(404, "All fields are required"));
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
    res.status(200).json({ message: "Sign up successful" });
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

export const freelancerSignin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser || validUser.role === "client") {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
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

export const googleFreelancer = async (req, res, next) => {
  const { name, email, profilePicture } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.role === "client") {
        return next(errorHandler(404, "User not found"));
      }
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      const { password: __pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const username =
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4);
      const password = Math.random().toString(36).slice(-8);
      // console.log(password);
      // console.log(username);

      const hashPassword = bcryptjs.hashSync(password, 10);
      try {
        const newUser = await User({
          name,
          username,
          email,
          profilePicture,
          password: hashPassword,
          role: "freelancer",
        });

        await newUser.save();

        const token = jwt.sign(
          {
            id: newUser._id,
            isAdmin: newUser.isAdmin,
            role: newUser.role,
          },
          process.env.JWT_SECRET
        );

        const { password: __pass, ...rest } = newUser._doc;

        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json(rest);
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};
