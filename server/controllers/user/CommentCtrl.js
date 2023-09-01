const Comment = require("../../models/comment.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../config/validateMongodbId.js");
const Post = require("../../models/post.js");

/* Get Comment By User  */
const getCommentsByUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const comments = await Comment.find({ user: id }).exec();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments by user." });
  }
});

/* Delete Comments By User */
const deleteCommentByUser = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(postId);
  try {
    const delComment = await Comment.findByIdAndDelete(commentId);
    const findPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: commentId } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Comment Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

/* Edit Comments By User */
module.exports = { getCommentsByUser, deleteCommentByUser };
