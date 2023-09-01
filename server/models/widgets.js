const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: {},
  widgetType: String,
});

module.exports = mongoose.model("Widget", widgetSchema);
