const mongoose = require("mongoose");

// Define the Upload schema
const uploadSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Image model
module.exports = mongoose.model("Upload", uploadSchema);
