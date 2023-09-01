const Widget = require("../models/widgets.js");
const asyncHandler = require("express-async-handler");

/* Create Widget */
const createWidget = asyncHandler(async (req, res) => {
  try {
    const { name, title, content, widgetType } = req.body;

    // Create a new widget instance
    const newWidget = new Widget({
      name,
      title,
      content,
      widgetType,
    });

    // Save the widget to the database
    await newWidget.save();

    res.status(201).json({ message: "Widget created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to create widget" });
  }
});

/* Get Widget Data */
const getWidget = asyncHandler(async (req, res) => {
  try {
    const widgetId = req.params.id;

    // Fetch the widget from the database based on the ID
    const widget = await Widget.findById(widgetId);

    if (!widget) {
      return res.status(404).json({ error: "Widget not found" });
    }

    res.json(widget);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch widget" });
  }
});
/* Update Widget Data */
const updateWidget = asyncHandler(async (req, res) => {
  try {
    const widgetId = req.params.id;
    const { title, content } = req.body;

    // Find the widget by ID and update its title and content
    const updatedWidget = await Widget.findByIdAndUpdate(
      widgetId,
      { title, content },
      { new: true }
    );

    if (!updatedWidget) {
      return res.status(404).json({ error: "Widget not found" });
    }

    res.json(updatedWidget);
  } catch (error) {
    res.status(500).json({ error: "Unable to update widget" });
  }
});
/*Get All Widget Data */
const getWidgetData = asyncHandler(async (req, res) => {
  try {
    const widgets = await Widget.find().select("title content widgetType");

    res.json(widgets);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch widgets" });
  }
});
module.exports = { createWidget, getWidget, updateWidget, getWidgetData };
