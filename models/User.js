const mongoose = require("mongoose");

const User = new mongoose.Schema({
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
