const express = require("express");

const router = express.Router();
const { isAdmin, isStudent, isTutor } = require("../middlewares/authHandler");

const {
  requestOTP,
  verifyOTP,
  registerUser,
} = require("../controllers/AuthController");

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", registerUser);

module.exports = router;
