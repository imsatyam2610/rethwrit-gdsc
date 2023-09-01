const {
  createWidget,
  getWidget,
  updateWidget,
  getWidgetData,
} = require("../controllers/widgetCtrl");

const widgetRouter = require("express").Router();

widgetRouter.post("/create", createWidget);
widgetRouter.get("/get/:id", getWidget);
widgetRouter.get("/data", getWidgetData);
widgetRouter.put("/update/:id", updateWidget);

module.exports = widgetRouter;
