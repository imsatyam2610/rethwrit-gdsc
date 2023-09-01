const express = require("express");
const employeeRouter = express.Router();
const {
  registerEmployee,
  loginEmployee,
  getAllEmployee,
  getAEmployee,
  logoutEmployee,
  verifyEmployee,
} = require("../controllers/employeeController.js");
const {
  authEmployeeMiddleware,
  isAdmin,
} = require("../middlewares/authMiddleware.js");

employeeRouter.post("/create", registerEmployee);
employeeRouter.post("/login", loginEmployee);
employeeRouter.get(
  "/all-employee",
  authEmployeeMiddleware,
  isAdmin,
  getAllEmployee
);
employeeRouter.post("/logout", authEmployeeMiddleware, logoutEmployee);
employeeRouter.get("/get/:id", authEmployeeMiddleware, getAEmployee);
employeeRouter.get("/verify", authEmployeeMiddleware, verifyEmployee);

module.exports = employeeRouter;
