const express = require("express");
const router = express.Router();
const { createPost, getPosts, toggleLike, addComment, getUserPosts } = require("../controllers/postController");
const{ protect }= require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.put("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);
router.get("/user/:id", protect, getUserPosts)

module.exports = router;