const Post = require("../models/Post");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

//@desc GET all posts
//@route /api/v1/posts
//@access public

exports.getPosts = asyncHandler(async (req, res, next) => {
  const post = await Post.find();
  res.status(200).json({ success: 200, count: post.length, data: post });
});

//@desc GET all post
//@route /api/v1/posts/:id
//@access public

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

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
  const post = await Post.create(req.body);
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

  if(!post){
      return next(new ErrorResponse(`Post with id ${req.params.id} not found`, 404))
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
