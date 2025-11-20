const nodemailer = require("nodemailer");
require("dotenv").config();

console.log(process.env.USER_EMAIL, process.env.USER_APP_PASS);
// Create transporter using env vars. For Gmail, use an app password (USER_APP_PASS).
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_APP_PASS,
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(recipientEmail) {
  if (!recipientEmail) throw new Error("Missing recipient email for OTP");

  const otp = generateOTP();
  console.log(`Generated OTP: ${otp}`);

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: recipientEmail,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(
      "Email sent: " + (info.response || info.messageId || JSON.stringify(info))
    );
    return otp; // Return the OTP for verification/storage
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = {
  generateOTP,
  sendOtpEmail,
};
