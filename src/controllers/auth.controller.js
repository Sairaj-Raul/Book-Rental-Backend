import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password, userName } = req.body;
  console.log("req.body: ", req.body);

  try {
    if (!fullName || !email || !password || !userName) {
      return res.status(400).json({ error: "Please Enter all detailssss" });
    }
    //hash password
    // if (password.length < 6) {
    //   return res
    //     .status(400)
    //     .json({ error: "Password must be at least 6 characters" });
    // }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    // console.log("New User: ", newUser);

    if (newUser) {
      //Generate JWT token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        userName: newUser.userName,
        profilePic: newUser.profiePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    if (!(userName || email)) {
      throw new ApiError(400, "Please Enter Email or Username");
    }

    // console.log("Login Credentials: ", req.body);

    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }

    if (!password) {
      throw new ApiError(400, "Password is required");
    }

    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        return res.status(400).json({ error: "Invalid Password" });
      }

      generateToken(user._id, res);

      console.log("Login UserId: ", user._id);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        message: "Login Success",
      });
    }
  } catch (error) {
    console.log("Error in Login controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error " });
  }
};
