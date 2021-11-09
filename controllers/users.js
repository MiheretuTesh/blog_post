const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.getusers = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({ success: 200, count: user.length, data: user });
});
