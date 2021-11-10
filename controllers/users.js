const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

//@desc GET all User
//@route /api/v1/users
//@access public

exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({ success: 200, count: user.length, data: user });
});

//@desc GET all User
//@route /api/v1/users/:id
//@access public

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User with Id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc Create user
//@route /api/v1/users/
//@access private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc Update user
//@route /api/v1/users/:id
//@access private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc Delete user
//@route /api/v1/users/:id
//@access private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: [],
  });
});

