const express = require("express");

const router = express.Router();
const { isAdmin, isStudent, isTutor } = require("../middlewares/authHandler");

const {
  requestOTP,
  verifyOTP,
  registerUser,
  loginUser,
} = require("../controllers/AuthController");

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", registerUser);
router.post("/ login", loginUser);

module.exports = router;
