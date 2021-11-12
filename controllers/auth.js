const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const jsonwebtoken = require("jsonwebtoken");
const validateRegisterInput = require("../middleware/validations/register");
const User = require("../models/User");

//@desc POST register users
//@route /api/v1/posts
//@access public

exports.register = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    image,
    gender,
    birthDate,
    role,
  } = req.body;
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    image,
    gender,
    birthDate,
    role,
  });

  sendTokenResponse(user, 200, res);
});

//GET token from model and create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
