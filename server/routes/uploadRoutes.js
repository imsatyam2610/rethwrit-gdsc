const express = require("express");
const uploadController = require("../controllers/uploadController");

const router = express.Router();

router.post("/", uploadController.uploadImage);
router.get("/all", uploadController.getUpload);
router.delete("/delete/:id", uploadController.uploadDelete);
module.exports = router;
