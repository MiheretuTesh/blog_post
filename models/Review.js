const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "please provide post title"],
    maxlength: [100, "comment title cannot be more than 100 charachters"],
  },
  isLiked: {
    type: boolean,
    defaudlt: false,
  },
  post_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
