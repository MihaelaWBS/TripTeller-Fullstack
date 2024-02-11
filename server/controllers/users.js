const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const SECRET = process.env.JWT_SECRET;
const dayInMilliseconds = 24 * 60 * 60 * 1000;

const express = require("express");
const fs = require("fs");
const router = express.Router();

const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const userPayload = {
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    const userToken = jwt.sign(userPayload, SECRET);
    res
      .status(201)
      .cookie("accessToken", userToken, {
        httpOnly: true,
        expires: new Date(Date.now() + dayInMilliseconds),
      })
      .json({ message: "user created!", user: userPayload });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Attempting to login with email: ${email}`);
    if (!email || !password) {
      console.log("Invalid login attempt: Missing email or password");
      res.status(400).json({ message: "Invalid Login Attempt" });
    } else {
      const userDoc = await User.findOne({ email });
      if (!userDoc) {
        console.log(
          `Invalid login attempt: No user found with email: ${email}`
        );
        res.status(400).json({ message: "Invalid Login Attempt" });
      } else {
        console.log(`User found with email: ${email}`);
        const isPasswordValid = await bcrypt.compare(
          password,
          userDoc.password
        );
        if (!isPasswordValid) {
          console.log("Invalid login attempt: Incorrect password");
          res.status(400).json({ message: "Invalid Login Attempt" });
        } else {
          console.log("Password is valid, generating JWT...");
          const userPayload = {
            _id: userDoc._id,
            email: userDoc.email,
            username: userDoc.username,
            role: userDoc.role,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            avatar: userDoc.avatar,
          };
          const userToken = jwt.sign(userPayload, SECRET);
          console.log("JWT generated, sending response...");
          res
            .cookie("accessToken", userToken, {
              httpOnly: true,
              expires: new Date(Date.now() + dayInMilliseconds),
            })
            .json({ message: "user loggedin!", user: userPayload });
        }
      }
    }
  } catch (error) {
    console.log("Error during login:", error.message);
    res.status(400).json({ message: error.message });
  }
};
const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.json({ message: "You have Successfully logged out!" });
};
const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const addAvatar = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: result.secure_url,
    });

    res.status(200).json({ avatar: user.avatar });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const addFlag = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const { flag } = req.body;

    if (!flag) {
      return res.status(400).json({ message: "No flag selected." });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { flag },
      { new: true }
    );

    res.status(200).json({ flag: user.flag });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  addFlag,
  addAvatar,
  getLoggedInUser,
};
