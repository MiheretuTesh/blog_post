const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");


//models
const Bootcamp = require("../models/Post");

const router = express.Router();

router
  .route("/")
  .get(getPosts)
  .post(createPost);

router
  .route("/:id")
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
