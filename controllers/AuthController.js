const User = require("../models/UserModel");
const { sendOtpEmail } = require("../utils/mailer");
require("dotenv").config();

async function requestOTP(req, res) {
  const { email } = req.body;

  try {
    console.log(req.body);
    // check if a user with this email already exists
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }

    // send OTP email and wait for result
    const otpsent = await sendOtpEmail(email);

    // create new record and save
    await User.create({ email: email, otp: otpsent });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: otpsent,
    });
  } catch (err) {
    console.log("an error occured");

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function verifyOTP(req, res) {
  const { email, otp } = req.body;
  try {
    const existUser = await User.findOne({ where: { email } });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "email does not exist",
      });
    }

    if (existUser.otp === otp) {
      return res.status(200).json({
        success: true,
        message: "verified successfully",
      });
    }
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  } catch (err) {
    console.log("an error occured");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function registerUser(req, res) {
  const { fullname, role, email, password } = req.body;
  try {
    const existUser = await User.findOne({ where: { email } });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist,",
      });
    }

    // if (existUser.otp === otp) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "verified successfully",
    //   });
    // }
    existUser.fullname = fullname;
    existUser.role = role;
    existUser.password = password;

    return res
      .status(200)
      .json({ success: true, message: "registered successfully" });
  } catch (err) {
    console.log("an error occured");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { requestOTP, verifyOTP, registerUser };
