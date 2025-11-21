const User = require("../models/UserModel");
const { sendOtpEmail } = require("../utils/mailer");
require("dotenv").config();
const { hashPass, comparePass } = require("../utils/bcrypt");
const { createToken } = require("../middlewares/authMiddleware");

const { Op } = require("sequelize");

async function getall() {
  return await User.findAll({ where: {} });
}

async function ceateUser(data) {
  return await User.create(data);
}

async function getByEmail(email) {
  return await User.findByPk(email);
}
async function getByrole(userrole) {
  return await User.findAll({ where: { role: userrole } });
}

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
    const existUser = await getByEmail(email);
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
    const existUser = await getByEmail(email);
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist,",
      });
    }

    const hashpassword = await hashPass(password);
    existUser.fullname = fullname;
    existUser.role = role;
    existUser.password = hashpassword;
    await existUser.save();

    return res.status(200).json({
      success: true,
      message: "registered successfully",
    });
  } catch (err) {
    console.log("an error occured");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password is required",
      });
    }
    const existUser = await getByEmail(email);
    if (!existUser || !existUser.password) {
      return res.status(404).json({
        success: false,
        message: "User not found or not registered",
      });
    }

    const match = await comparePass(password, existUser.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }

    const token = createToken(existUser.id);

    return res
      .status(200)
      .json({ success: true, message: "loginsuccessfully", token: token });
  } catch (err) {
    console.log("an error occured");

    return res.status(500).json({
      success: false,
      message: `internal server error ${err.message}`,
    });
  }
}

module.exports = { requestOTP, verifyOTP, registerUser, loginUser };
