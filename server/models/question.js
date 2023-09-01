const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: { String },
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  featured_image: {
    type: String,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  answers: [
    {
      text: {
        type: { String },
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ["answered", "not answered"],
    default: "not answered",
  },
  isMCQ: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [String],
  },
  correctOption: {
    type: Number,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
