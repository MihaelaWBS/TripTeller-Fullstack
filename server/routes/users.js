const express = require("express");
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
authRouter.put("/users/:id/avatar", updateAvatar);
authRouter.post("/users/:id/avatar", addAvatar);
authRouter.delete("/users/:id/avatar", deleteAvatar);

module.exports = authRouter;
