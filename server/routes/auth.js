const express = require("express");

const { register, login, getMe } = require("../controllers/auth");
const { uploadProfile } = require("../controllers/users");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", uploadProfile, register);
router.post("/login", login);
router.get("/me", protect, getMe);
// router.get("/logout", logoutUser);

module.exports = router;
