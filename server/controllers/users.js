const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    if (!email || !password) {
      res.status(400).json({ message: "Invalid Login Attempt" });
    } else {
      const userDoc = await User.findOne({ email });
      console.log("USER RECORD", userDoc.email, userDoc.password, password);
      if (!userDoc) {
        res.status(400).json({ message: "Invalid Login Attempt" });
      } else {
        // user doc with email is found!
        const isPasswordValid = await bcrypt.compare(
          password,
          userDoc.password
        );
        if (!isPasswordValid) {
          res.status(400).json({ message: "Invalid Login Attempt" });
        } else {
          const userPayload = {
            _id: userDoc._id,
            email: userDoc.email,
            username: userDoc.username,
            role: userDoc.role,
          };
          const userToken = jwt.sign(userPayload, SECRET);
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
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      // Convert buffer to a readable stream
      const stream = require("stream");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(Buffer.from(req.file.buffer, "binary"));

      // Upload file to cloudinary
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        bufferStream.pipe(cloudinaryStream);
      });

      user.avatar = cloudinaryResponse.secure_url;
      await user.save();

      res.json({ message: "Avatar updated successfully", user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    // Convert buffer to a readable stream
    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(req.file.buffer, "binary"));

    // Upload file to cloudinary
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the stream to cloudinary
      bufferStream.pipe(cloudinaryStream);
    });

    user.avatar = cloudinaryResponse.secure_url;
    await user.save({ validateBeforeSave: false });

    console.log("User:", user);

    res.json({
      message: "Image uploaded successfully",
      url: cloudinaryResponse.secure_url,
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

  addAvatar,

  getLoggedInUser,
};
