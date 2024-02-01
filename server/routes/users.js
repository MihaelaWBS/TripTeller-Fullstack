const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { authenticate } = require("../middleware/auth");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
  updateAvatar,
  addAvatar,
  deleteAvatar,
  getLoggedInUser,
} = require("../controllers/users");
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/currentUser", authenticate, getLoggedInUser);

authRouter.post(
  "/users/:id/avatar",
  authenticate,
  upload.single("image"),
  addAvatar
);

module.exports = authRouter;
