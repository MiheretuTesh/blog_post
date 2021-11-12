const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//Protect User
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.header.authorization &&
    req.header.authorization.startWith("Bearer")
  ) {
    token = req.header.authorization.split(' ')[1];
    console.log(token);
    console.log("I was here");

    console.log("I was here");
    console.log("I was here");
    console.log("I was here");
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    req.user = await User.findOne(decoded.id);
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
