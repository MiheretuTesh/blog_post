const Post = require("../models/Post");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const ValidatePostInput = require("../middleware/validations/post");
const multer = require("multer");
const path = require("path");

// @des post images upload
// @route /api/v1/post
// @access Private

// @image import
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/posts"));
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}-posts${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadPostImages = upload.single("image");

//@desc GET all posts
//@route /api/v1/posts
//@access public

exports.getPosts = asyncHandler(async (req, res, next) => {
  const post = await Post.find().populate({
    path: "user",
    select: "firstName lastName gendet dateOfBirth",
  });
  res.status(200).json({ success: 200, count: post.length, data: post });
});

//@desc GET all post
//@route /api/v1/posts/:id
//@access public

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "user",
    select: "firstName lastName gendet dateOfBirth",
  });

  if (!post) {
    return next(
      new ErrorResponse(`Post with Id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});

//@desc POST a post
//@route /api/v1/posts
//@access private

exports.createPost = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = ValidatePostInput(req.body);
  if (!isValid) {
    res.status(404).json({ errors });
  }
  console.log(req.file.filename);

  req.body.user = req.user.id;
  req.body.avatar = req.user.img;
  const post = await Post.create({ ...req.body, images: req.file.filename });
  res.status(201).json({ success: true, data: post });
});

//@desc PUT a post
//@route /api/v1/posts/:id
//@access private

exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(
      new ErrorResponse(`Post With Id ${req.params.id} not found`, 404)
    );
  }

  const { errors, isValid } = ValidatePostInput(req.body);
  if (!isValid) {
    res.status(404).json({ errors });
  }

  res.status(200).json({
    status: 200,
    data: post,
  });
});

//@desc DELETE a post
//@route /api/v1/posts/:id
//@access public

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});

//Add like
//@desc POST api/posts/like/:id
// @desc like post
//@access private
exports.likePost = asyncHandler(async (req, res, next) => {
  // const user = await User.findOne({ user: req.user.id });
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post with ID of ${req.params.id} not found`, 404)
    );
  }
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res
      .status(400)
      .json({ alreadyLiked: "User already like this post" });
  }
  post.likes.unshift({ user: req.user.id });
  post.save();
  return res.status(200).json({ post });
});

//Add unlikes to a like posts
// @desc POST api/posts/unlike/:id
// @desc unlike a post
// @access Private
exports.unlikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post with ID of ${req.params.id} not found`, 404)
    );
  }

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return res
      .status(400)
      .json({ notLiked: "You have not yet liked this post" });
  }

  const likeToRemove = post.likes
    .map((item) => item.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(likeToRemove, 1);

  post.save();

  return res.status(200).json({ post });
});

//Add commnet to a post
//@desc POST api/posts/comment/:id
//@desc commenting for a post
//@access Private
exports.commentPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post with ID of ${req.params.id} not found`, 404)
    );
  }

  // const { errors, isValid } = ValidatePostInput(req.body);
  // if (!isValid) {
  //   return res.status(404).json({ errors });
  // }
  const newComment = {
    text: req.body.text,
    name: `${req.user.firstName} ${req.user.lastName}`,
    user: req.user.id,
  };
  post.comments.unshift(newComment);
  post.save();
  return res.status(200).json({ post });
});

// Delete comments
// @desc POST api/posts/comment/:id/:comment_id
// @desc uncommenting from a post
// @access private
exports.uncommentPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse(`Post with this Id is not found`));
  }

  //checking if the comment exists
  if (
    post.comments.filter(
      (comment) => comment._id.toString() === req.params.comment_id
    ).length === 0
  ) {
    return res.status(404).json({ commentNotExist: "Comment does not exist" });
  }

  const commentToRemove = post.comments
    .map((comment) => comment._id.toString())
    .indexOf(req.params.comment_id);

  post.comments.splice(commentToRemove, 1);

  post.save();

  return res.status(200).json({ post });
});

// REply to a comment
// @desc POST api/posts/comment/:id/:comment_id/reply
// @desc rep;y to a comment
// @access Private
exports.replyToComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post with ID of ${req.params.id} does not exists`)
    );
  }
  if (
    post.comments.filter(
      (comment) => comment._id.toString() === req.params.comment_id
    ).length === 0
  ) {
    return res.status(404).json({ commentNotExist: "Comment does not exist" });
  }

  const newReply = {
    text: req.body.text,
    name: `${req.user.firstName} ${req.user.lastName}`,
    user: req.user.id,
  };
  post.comments.replys.unshift(newReply);

  post.save();

  return res.status(200).json({ post });
});
