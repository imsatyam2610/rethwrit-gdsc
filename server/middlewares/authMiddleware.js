const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Employee = require("../models/employee.js");

const authUserMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorised, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to the header...");
  }
});

const authEmployeeMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findById(decoded?.id);
        req.employee = employee;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorised, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to the header...");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.employee;
  const adminEmployee = await Employee.findOne({ email });
  if (adminEmployee.role !== "admin") {
    throw new Error("You are not Admin");
  } else {
    next();
  }
});

module.exports = {
  authUserMiddleware,
  authEmployeeMiddleware,
  isAdmin,
};
