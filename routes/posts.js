const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

//Include other resource routers
// const reviewRouter = require('./reviews');

//models
const Post = require("../models/Post");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
// router.use('/:postId/reviews', reviewRouter)
router.route("/").get(getPosts).post(protect, createPost);

router
  .route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, authorize("admin"), deletePost);

module.exports = router;
