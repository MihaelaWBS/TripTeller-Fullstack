const express = require("express");
const { authenticate } = require("../middleware/auth");
const postRouter = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  clapPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");
postRouter.use(authenticate);
postRouter.post("/", createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.put("/:id/like", likePost);
postRouter.put("/:id/clap", clapPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
module.exports = postRouter;
