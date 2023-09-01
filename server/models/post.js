const mongoose = require("mongoose");
const htmlMinifier = require("html-minifier");

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeyword: {
      type: String,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
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
  featured_image: {
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
  widget: {
    type: {},
  },
  seo: {
    type: seoSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware function to lowercase the slug before saving
postSchema.pre("save", function (next) {
  this.slug = this.slug.toLowerCase();
  next();
});

module.exports = mongoose.model("Post", postSchema);
