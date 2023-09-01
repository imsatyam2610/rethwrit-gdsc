const pageRouter = require("express").Router();
const { getSearchData } = require("../controllers/page/searchCtrl");

pageRouter.get("/search", getSearchData);

module.exports = pageRouter;
