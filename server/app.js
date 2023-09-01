const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

//imports
const connectDB = require("./config/db.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const pageRoutes = require("./routes/pageRoutes.js");
const employeeRoutes = require("./routes/employeeRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const messengerRoutes = require("./routes/messengerRoutes.js");
const widgetRoutes = require("./routes/widgetRoutes.js");
const { notFound, handleError } = require("./middlewares/errorHandler.js");
const rateLimitter = require("./middlewares/reqLimit.js");

/* CONFIGURATION */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.get("/api/status", (req, res) => {
  res.send("The server is running successfully.");
});
app.set("trust proxy", 1);
app.use(
  "/api",
  rateLimitter(60 * 60 * 1000, "Secs", 100, "Only 100 Requests Allowed")
);
app.use("/api/posts", postRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/uploads", uploadRoutes);
app.use("/api/widget", widgetRoutes);
app.use("/api/messenger", messengerRoutes);

app.use(notFound);
app.use(handleError);

/* MongoDB */
connectDB();

app.listen(process.env.PORT || "9000", () => {
  console.log("Server is running successfully");
});
