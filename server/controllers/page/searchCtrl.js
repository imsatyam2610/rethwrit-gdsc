const Post = require("../../models/post");
const asyncHandler = require("express-async-handler");

const getSearchData = asyncHandler(async (req, res) => {
  try {
    const { q, categoryid, limit } = req.query;
    const query = {
      title: { $regex: new RegExp(q, "i") },
    };
    if (categoryid) {
      query.categories = categoryid;
    }

    let postDataQuery = Post.find(query, "title slug")
      .sort({ updatedAt: -1 })
      .lean();

    if (limit) {
      postDataQuery = postDataQuery.limit(parseInt(limit));
    }

    const postData = await postDataQuery.exec();

    const data = {
      posts: postData,
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getSearchData,
};
