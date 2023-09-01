const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
  },
  { timestamps: true }
);

// Middleware function to lowercase the slug before saving
categorySchema.pre("save", function (next) {
  this.slug = this.slug.toLowerCase();
  next();
});

module.exports = mongoose.model("Category", categorySchema);
