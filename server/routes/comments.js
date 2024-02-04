const express = require("express");
const { authenticate } = require("../middleware/auth");
const commentRouter = express.Router();
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  getCommentsByPostId,
  deleteComment,
} = require("../controllers/comments");
commentRouter.use(authenticate);
commentRouter.get("/post/:postId", getCommentsByPostId);
commentRouter.post("/", createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);
module.exports = commentRouter;
