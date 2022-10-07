import express from "express";

import {
  fetchPosts,
  deletePost,
  updatePost,
  fetchPost,
  createPost,
} from "../controllers/posts.js";
const router = express.Router();

router.post("/", createPost);

router.get("/", fetchPosts);

router.get("/:id", fetchPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
