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
    const posts = await Post.find().populate(
      "userId",
      "username email avatar firstName lastName"
    );
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
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: `Post with id ${id} not found.` });
    }

    if (!req.user || post.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to update this post." });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the post to check ownership
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: `Post with id ${id} not found.` });
    }

    // Check if the logged-in user is the owner of the post
    if (!req.user || post.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this post." });
    }

    // If the user is the owner, proceed with the delete
    const deletedPost = await Post.findByIdAndDelete(id);
    res.json({ message: "Post successfully deleted", post: deletedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const post = await Post.findById(postId);
    const userIndex = post.likedBy.indexOf(userId);

    if (userIndex === -1) {
      post.likes += 1;
      post.likedBy.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully", post });
    } else {
      post.likes -= 1;
      post.likedBy.splice(userIndex, 1);
      await post.save();
      res.status(200).json({ message: "Post unliked successfully", post });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

const clapPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const clapsToAdd = req.body.claps || 1;
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { claps: clapsToAdd } },
      { new: true }
    );

    res.status(200).json({ message: "Claps added successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  createPost,
  likePost,
  getAllPosts,
  getPostById,
  updatePost,
  clapPost,
  deletePost,
};
