const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedon: {
      type: mongoose.Schema.Types.ObjectId,
    },
    refType: {
      type: String,
      enum: ["Post", "College", "News"],
    },
    replies: [
      {
        comment: {
          type: String,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        approved: {
          type: Boolean,
          default: false,
        },
        replies: [this],
      },
    ],
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
