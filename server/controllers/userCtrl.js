const { generateToken } = require("../config/jwtToken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId.js");
const crypto = require("crypto");
const { sendEmail, sendVerificationCode } = require("../controllers/emailCtrl");
const EmailVerificationToken = require("../models/user/emailVerification.js");

/* Create A User */
const registerAUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    return res.status(409).json({
      status: false,
      message: "A User Already Exists with This Email",
    });
  }
  if (!findUser) {
    const createUser = await User.create(req.body);
    res.status(200).json({
      status: true,
      message: "User Created Successfully!",
      createUser,
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Failed to Create User",
    });
  }
});

/* Login User */
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email: email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
      const token = generateToken(findUser?._id);
      let oldTokens = findUser.tokens || [];

      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }
      await User.findByIdAndUpdate(findUser._id, {
        tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
      });
      res.status(200).json({
        status: true,
        message: "Logged In Successfully!",
        token: token,
        username: findUser?.username,
        name: findUser?.name,
        user_image: findUser?.user_image,
        email: findUser?.email,
      });
    } else {
      res.status(401).json({ status: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

/* Get All User */
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({
      status: true,
      message: "All User Fetched Successfully!",
      allUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
/* Get A User */
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getProfile = await User.findById(id);
    res.status(200).json({
      status: true,
      message: "User Found!",
      getProfile,
    });
  } catch (error) {
    throw new Error(error);
  }
});
/* Update A User */
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Delete A User */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "User Deleted Successfully!",
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
/* Block A User */
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isblocked: true },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "User Blocked Successfully!",
      block,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* UnBlock A User */
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isblocked: false },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "User UnBlocked Successfully!",
      unblock,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Update User Password */
const updateUserPassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  try {
    const user = await User.findById(_id);
    if (user && (await user.isPasswordMatched(password))) {
      throw new Error("Please Provide a new Password instead of old one");
    } else {
      user.password = password;
      await user.save();

      res.status(200).json({
        status: true,
        message: "Password Updated Successfully!",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

/* Forgot Password Token */
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User Not Exists with this email");
  try {
    const token = await user.createPasswordRestToken();
    await user.save();
    const resetlink = `http://localhost:5000/api/user/reset-password/${token}`;
    const data = {
      to: email,
      text: `Hey ${user.name}`,
      subject: "Forgot Password",
      html: resetlink,
    };
    sendEmail(data);
    res.status(200).json(resetlink);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = res.body;
  const { token } = req.params;
  const hasedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordRestToken: hasedToken,
    passwordRestExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again");
  user.password = password;
  user.passwordRestToken = undefined;
  user.passwordRestExpires = undefined;
  await user.save();
  res.status(200).json({
    status: true,
    message: "Password Reset Successfully",
  });
});

/* Verify Current User */
const verifyUser = asyncHandler(async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }
    const tokens = req.user.tokens;
    const name = req.user.name;
    const currToken = tokens.filter((t) => t.token === token);
    //console.log(req.user.id);
    res.json({
      success: true,
      ok: true,
      message: "Verify successfully!",
      token: currToken[0].token,
      name: name,
      email: req.user.email,
      username: req.user.username,
      user_image: req.user.user_image,
      gender: req.user.gender,
    });
  } else {
    throw new Error("Something Went Wrong");
  }
});
/* Logout Employee */
const logoutUser = asyncHandler(async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
});
/* Email Verification */
const requestEmailVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(404).json({
        status: false,
        message: "Please Enter Vaild Email",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        status: false,
        message: "A User Already Exists with This Email",
      });
    }
    await EmailVerificationToken.deleteOne({ email });
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    await EmailVerificationToken.create({ email, verificationCode });
    //sendVerificationCode(email, verificationCode);

    res.status(200).json({
      status: true,
      message: "Email Verification Code Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to Send Email Verification Code",
      error: error,
    });
  }
});
/* Verify Email OTP */
const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  try {
    const token = await EmailVerificationToken.findOne({
      email,
      verificationCode: otp,
    });

    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    await token.deleteOne();

    res.status(200).json({
      status: true,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
});
module.exports = {
  registerAUser,
  loginUser,
  getAllUser,
  getAUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updateUserPassword,
  forgotPasswordToken,
  resetPassword,
  verifyUser,
  logoutUser,
  requestEmailVerification,
  verifyEmailOTP,
};
