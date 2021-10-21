const Review = require("../models/Review");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAllReviews = asyncHandler(async (req, res, next) => {
  if(req.params.post_id)
  res.status(200).json({ success: true, message: "Get All Reviews" });
});

exports.getReview = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Get one Review" });
});

exports.createReview = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Create A review" });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Update A Review" });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Delete A Review" });
});
