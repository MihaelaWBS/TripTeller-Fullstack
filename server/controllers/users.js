const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const dayInMilliseconds = 24 * 60 * 60 * 1000;
const cloudinary = require("../cloudinaryConfig");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const parser = require("../cloudinaryConfig");
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
    // req.user is created in the auth middleware
    const user = await User.findOne({ _id: req.user._id }).select("-password");

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      const result = await cloudinary.uploader.upload(req.file.path);

      // Add this line
      console.log(result.secure_url);

      user.avatar = result.secure_url;
      await user.save();
      res.json({ message: "Avatar added successfully", user });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    user.avatar = null;
    await user.save();
    res.json({ message: "Avatar deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cloudinary.uploader.upload(req.body.avatar);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = result.secure_url;
    await user.save();

    res.json({ message: "Avatar updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const testCloudinary = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User ID:", userId);

    console.log("Image file:", req.file);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.avatar = req.file.path;
    await user.save({ validateBeforeSave: false });

    console.log("User:", user);

    res.json({
      message: "Image uploaded successfully",
      url: req.file.path,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  register,
  login,
  logout,
  deleteAvatar,
  addAvatar,
  updateAvatar,
  getLoggedInUser,
  testCloudinary,
};
