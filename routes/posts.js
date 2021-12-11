const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  unlikePost,
  uncommentPost,
  uploadPostImages
} = require("../controllers/posts");

//Include other resource routers
// const reviewRouter = require('./reviews');

//models
const Post = require("../models/Post");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
// router.use('/:postId/reviews', reviewRouter)
router
  .route("/")
  .get(getPosts)
  .post(protect, uploadPostImages,createPost);

router
  .route("/:id")
  .get(getPost)
  .put(protect, uploadPostImages, updatePost)
  .delete(protect, authorize("admin"), deletePost);

router
  .route("/like/:id")
  .post(protect, likePost);
  
  router
  .route("/uploadimage")
  .post(protect, uploadPostImages);

router
  .route("/unlike/:id")
  .post(protect, unlikePost);

router
  .route("/comment/:id")
  .post(protect, commentPost);

router
  .route("/comment/:id/:comment_id")
  .post(protect, uncommentPost);

module.exports = router;
