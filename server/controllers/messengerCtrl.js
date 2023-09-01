const asyncHandler = require("express-async-handler");
const MessengerChat = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});
module.exports = { MessengerChat };
