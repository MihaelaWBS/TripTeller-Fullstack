const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { authenticate } = require("../middleware/auth");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
  addFlag,
  updateAvatar,
  addAvatar,
  addNickname,
  deleteAvatar,
  getLoggedInUser,
} = require("../controllers/users");
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post(
  "/users/:id/avatar",
  authenticate,
  upload.single("image"),
  addAvatar
);
authRouter.post(
  "/users/:id/flag",
  authenticate,
  upload.single("flag"),
  addFlag
);
authRouter.post("/users/:id/nickname", authenticate, addNickname);
authRouter.get("/currentUser", authenticate, getLoggedInUser);

module.exports = authRouter;
