const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
    // default: "default.png",
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
