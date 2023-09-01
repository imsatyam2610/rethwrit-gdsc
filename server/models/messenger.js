const mongoose = require("mongoose");

const messengerSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
      unique: true,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    messages: [
      {
        senderId: {
          type: String,
        },
        messageId: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
          unique: true,
        },
        message: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Resolved", "Unresolved"],
      default: "Unresolved",
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messenger", messengerSchema);
