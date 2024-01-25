const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User is not defined" });
    }
    const newPost = await Post.create({ ...req.body, userId: req.user._id });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("userId", "username email");
    if (!post) {
      res.status(404).json({ message: `Post with id ${id} Not Found` });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      res.status(404).json({ message: `Post with id ${id} Not Found` });
    } else {
      res.json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      res.status(404).json({ message: `Post with id ${id} Not Found` });
    } else {
      res.json(deletedPost);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
