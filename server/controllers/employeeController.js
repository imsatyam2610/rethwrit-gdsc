const { generateToken } = require("../config/jwtToken");
const Employee = require("../models/employee.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId.js");

/* Create A Employee */
const registerEmployee = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findEmployee = await Employee.findOne({ email: email });
  if (!findEmployee) {
    const createEmployee = await Employee.create(req.body);
    res.status(200).json({
      status: true,
      message: "Employee Created Successfully!",
      createEmployee,
    });
  } else {
    throw new Error("Employee Already Exists");
  }
});
/* Login A Employee */
const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findEmployee = await Employee.findOne({ email: email });
  if (findEmployee && (await findEmployee.isPasswordMatched(password))) {
    const token = generateToken(findEmployee?._id);
    let oldTokens = findEmployee.tokens || [];

    if (oldTokens.length) {
      oldTokens = oldTokens.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 86400) {
          return t;
        }
      });
    }
    await Employee.findByIdAndUpdate(findEmployee._id, {
      tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
    });

    res.status(200).json({
      status: true,
      message: "Logged In Successfully!",
      token: token,
      name: findEmployee?.name,
      email: findEmployee?.email,
      username: findEmployee?.username,
      role: findEmployee?.role,
      employee_image: findEmployee?.employee_image,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
/* Get All Employee */
const getAllEmployee = asyncHandler(async (req, res) => {
  try {
    const allEmployee = await Employee.find();
    res.status(200).json({
      status: true,
      message: "All Employee Fetched Successfully!",
      allEmployee,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Get A Employee */
const getAEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getProfile = await Employee.findById(id);
    res.status(200).json({
      status: true,
      message: "Employee Found!",
      getProfile,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* Logout Employee */
const logoutEmployee = asyncHandler(async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.employee.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await Employee.findByIdAndUpdate(req.employee._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
});
/* Verify Employee */
const verifyEmployee = asyncHandler(async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }
    const tokens = req.employee.tokens;
    const role = req.employee.role;
    const name = req.employee.name;
    const email = req.employee.email;
    const employee_image = req.employee.employee_image;
    const currToken = tokens.filter((t) => t.token === token);
    //console.log(req.employee.id);
    res.json({
      success: true,
      message: "Verify successfully!",
      name: name,
      email: email,
      role: role,
      username: req.employee.username,
      employee_image: employee_image,
      token: currToken[0].token,
    });
  } else {
    throw new Error("Something Went Wrong");
  }
});
module.exports = {
  registerEmployee,
  loginEmployee,
  getAllEmployee,
  getAEmployee,
  logoutEmployee,
  verifyEmployee,
};
