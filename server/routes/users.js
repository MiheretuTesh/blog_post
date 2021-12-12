const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadProfile,
} = require("../controllers/users");

const User = require("../models/User");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("admin", "user"), getUsers)
  .post(protect, authorize("admin"), uploadProfile, createUser);

router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, authorize("admin", "user"), uploadProfile, updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
