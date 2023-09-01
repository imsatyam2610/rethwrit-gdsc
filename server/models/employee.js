const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    employee_image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["author", "admin", "editor"],
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
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employeeSchema.methods.isPasswordMatched = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
module.exports = mongoose.model("Employee", employeeSchema);
