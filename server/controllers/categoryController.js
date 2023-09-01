const Category = require("../models/category.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId.js");

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const allcategories = await Category.find();
    res.status(200).json({
      status: true,
      message: "All Category Fetched Successfully",
      allcategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const newCategory = new Category({ name, slug, description });
    const category = await newCategory.save();
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getACategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findCategory = await Category.findById(id);
    res.status(200).json({
      status: true,
      message: "Category Found!",
      findCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteACategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Category Deleted Successfully!",
      deleteCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateACategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      status: true,
      message: "Category Updated!",
      updateCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
/* Get Category by /:slug(*) */
{
  /*const CategoryBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const slugs = slug.split("/").filter((slug) => slug !== "");

    if (
      slugs.length === 0 ||
      slugs.length !== req.params.slug.split("/").length
    ) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Category.findOne({ slug: { $all: slugs } });

    if (!post || post.slug.length !== slugs.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
*/
}

module.exports = {
  getAllCategory,
  createCategory,
  getACategory,
  deleteACategory,
  updateACategory,
};
