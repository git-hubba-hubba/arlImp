const Post = require("../models/Post");

async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return next(error);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.json(post);
  } catch (error) {
    return next(error);
  }
}

async function createPost(req, res, next) {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json(post);
  } catch (error) {
    return next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.json(post);
  } catch (error) {
    return next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.json({ message: "Post deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
};
