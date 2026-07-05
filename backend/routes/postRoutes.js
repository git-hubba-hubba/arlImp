const express = require("express");
const {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
