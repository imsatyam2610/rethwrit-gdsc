const express = require("express");
const userRouter = express.Router();
const {
  registerAUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getAUser,
  blockUser,
  unblockUser,
  updateUserPassword,
  forgotPasswordToken,
  resetPassword,
  verifyUser,
  logoutUser,
  requestEmailVerification,
  verifyEmailOTP,
} = require("../controllers/userCtrl.js");
const {
  authUserMiddleware,
  authEmployeeMiddleware,
  isAdmin,
} = require("../middlewares/authMiddleware.js");
const {
  getCommentsByUser,
  deleteCommentByUser,
} = require("../controllers/user/CommentCtrl.js");

userRouter.post("/register", registerAUser);
userRouter.post("/request-email-verification", requestEmailVerification);
userRouter.post("/verify-email-otp", verifyEmailOTP);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPasswordToken);
userRouter.get("/all-users", authEmployeeMiddleware, isAdmin, getAllUser);
userRouter.get("/get/:id", authUserMiddleware, getAUser);
userRouter.get("/verify", authUserMiddleware, verifyUser);
userRouter.put("/update-profile", authUserMiddleware, updateUser);
userRouter.put("/block/:id", authUserMiddleware, blockUser);
userRouter.put("/unblock/:id", authUserMiddleware, unblockUser);
userRouter.put("/update-password", authUserMiddleware, updateUserPassword);
userRouter.put("/reset-password/:token", resetPassword);
userRouter.delete("/delete/:id", authUserMiddleware, deleteUser);
userRouter.get("/comments", authUserMiddleware, getCommentsByUser);
userRouter.post("/logout", authUserMiddleware, logoutUser);
userRouter.delete(
  "/comments/:postId/:commentId",
  authUserMiddleware,
  deleteCommentByUser
);
module.exports = userRouter;
