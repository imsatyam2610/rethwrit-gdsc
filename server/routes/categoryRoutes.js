const categoryRouter = require("express").Router();
const {
  getAllCategory,
  createCategory,
  getACategory,
  updateACategory,
  deleteACategory,
} = require("../controllers/categoryController.js");

categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getACategory);
categoryRouter.put("/:id", updateACategory);
categoryRouter.delete("/:id", deleteACategory);

module.exports = categoryRouter;
