const express = require("express");
const { MessengerChat } = require("../controllers/messengerCtrl");
const messengerRouter = express.Router();

messengerRouter.post("/create", MessengerChat);

module.exports = messengerRouter;
