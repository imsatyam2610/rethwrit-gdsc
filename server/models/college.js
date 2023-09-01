const mongoose = require("mongoose");
const htmlMinifier = require("html-minifier");

const collegeSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      required: true,
    },
    collegeAddress: { type: String },
    collegeType: { type: String },
    content: {
      type: {},
      required: true,
      set: function (content) {
        return htmlMinifier.minify(content, {
          collapseWhitespace: true,
          removeComments: true,
        });
      },
    },
    excerpt: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    college_logo: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    status: {
      type: String,
      enum: ["draft", "publish"],
      require: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    comment_status: {
      type: String,
      enum: ["closed", "open"],
      default: "open",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeyword: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

collegeSchema.pre("save", function (next) {
  this.slug = this.slug.toLowerCase();
  next();
});

module.exports = mongoose.model("College", collegeSchema);
