const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    user_image: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
    tokens: [{ type: Object }],
    passwordChangedAt: Date,
    passwordRestToken: String,
    passwordRestExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

userSchema.methods.createPasswordRestToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordRestToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordRestExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};
module.exports = mongoose.model("User", userSchema);
