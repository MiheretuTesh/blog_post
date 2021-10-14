const Post = require("../models/Post");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

//@desc GET all posts
//@route /api/v1/posts
//@access public

exports.getPosts = asyncHandler(async (req, res, next) => {
    res.status(200).json({status: 200, data: "Get all post from api"})
});


//@desc GET all post
//@route /api/v1/posts/:id
//@access public

exports.getPost = asyncHandler(async (req, res, next) => {
    res.status(200).json({status: 200, data: `Get single post from api with id of ${req.params.id}`})
});


//@desc POST a post
//@route /api/v1/posts
//@access private

exports.createPost = asyncHandler(async (req, res, next) => {
    res.status(200).json({status: 200, data: `post a new post`})
});


//@desc PUT a post
//@route /api/v1/posts/:id
//@access private

exports.updatePost = asyncHandler(async (req, res, next) => {
    res.status(200).json({status: 200, data: `Update a specific post whit and Id of ${req.params.id}`})
});


//@desc DELETE a post
//@route /api/v1/posts/:id
//@access public

exports.deletePost = asyncHandler(async (req, res, next) => {
    res.status(200).json({status: 200, data: `Delete a specific post whit and Id of ${req.params.id}`})
});
