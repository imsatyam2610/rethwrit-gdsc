const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 587,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = asyncHandler(async (data, req, res) => {
  let info = await transporter.sendMail({
    from: "Rethwrit",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
});

const sendVerificationCode = asyncHandler(async (email, verificationCode) => {
  let info = await transporter.sendMail({
    from: "sprakashtv@gmail.com",
    to: email,
    subject: `Your Email Verification Code ${verificationCode}`,
    text: `Your OTP for Creating New Account at Rethwrit.com`,
    html: `<p>Your OTP: <strong>${verificationCode}</strong></p>`,
  });
});

module.exports = { sendEmail, sendVerificationCode };
