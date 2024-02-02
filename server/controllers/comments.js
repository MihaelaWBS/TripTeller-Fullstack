const Comment = require("../models/comment");

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate(
      "userId",
      "username email avatar firstName lastName"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id).populate(
      "userId",
      "username email"
    );
    if (!comment) {
      res.status(404).json({ message: `Comment with id ${id} Not Found` });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedComment) {
      res.status(404).json({ message: `Comment with id ${id} Not Found` });
    } else {
      res.json(updatedComment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      res.status(404).json({ message: `Comment with id ${id} Not Found` });
    } else {
      res.json(deletedComment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
