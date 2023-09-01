const multer = require("multer");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const Upload = require("../models/upload.js");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDir = "uploads";
    const now = moment();
    const year = now.format("YYYY");
    const month = now.format("MM");
    const yearMonthDir = path.join(destinationDir, year, month);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(yearMonthDir)) {
      fs.mkdirSync(yearMonthDir, { recursive: true });
    }

    cb(null, yearMonthDir);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname; // Use original filename
    cb(null, filename);
  },
});

// Create multer instance
const upload = multer({ storage });

function generateFilePath(filename) {
  const now = moment();
  const year = now.format("YYYY");
  const month = now.format("MM");
  return `uploads/${year}/${month}/${filename}`;
}

function uploadImage(req, res) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to upload image." });
    }

    const filePath = generateFilePath(req.file.filename);

    // Create a new Upload instance
    const newUpload = new Upload({ url: filePath });

    // Save the upload record
    newUpload
      .save()
      .then((savedUpload) => {
        return res.status(200).json({ filePath });
      })
      .catch((error) => {
        console.error("Failed to save upload:", error);
        return res.status(500).json({ error: "Failed to save upload." });
      });
  });
}
//Delete
function uploadDelete(req, res) {
  const uploadId = req.params.id;

  // Find the Upload record by ID
  Upload.findById(uploadId)
    .then((upload) => {
      if (!upload) {
        return res.status(404).json({ error: "Upload not found." });
      }

      // Delete the uploaded file from the filesystem
      const filePath = path.join(__dirname, "..", upload.url);
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Failed to delete file:", error);
          return res.status(500).json({ error: "Failed to delete file." });
        }

        // Delete the Upload record from the database
        Upload.deleteOne({ _id: uploadId })
          .then(() => {
            return res
              .status(200)
              .json({ message: "File deleted successfully." });
          })
          .catch((error) => {
            console.error("Failed to delete Upload record:", error);
            return res
              .status(500)
              .json({ error: "Failed to delete Upload record." });
          });
      });
    })
    .catch((error) => {
      console.error("Failed to find Upload record:", error);
      return res.status(500).json({ error: "Failed to find Upload record." });
    });
}

// Get All
function getUpload(req, res) {
  // Fetch all Upload records from the database
  Upload.find()
    .then((uploads) => {
      return res.status(200).json(uploads);
    })
    .catch((error) => {
      console.error("Failed to fetch Upload records:", error);
      return res.status(500).json({ error: "Failed to fetch Upload records." });
    });
}
module.exports = { uploadImage, uploadDelete, getUpload };
