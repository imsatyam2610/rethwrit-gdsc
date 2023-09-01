const asyncHandler = require("express-async-handler");
const Post = require("../models/post.js");
const validateMongodbId = require("../config/validateMongodbId.js");
const postcomment = require("../models/comment.js");

/* Creating New post */
const createPost = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      content,
      slug,
      categories,
      featured_image,
      status,
      widget,
      metaTitle,
      metaDescription,
      metaKeyword,
    } = req.body;
    const seo = {
      metaTitle,
      metaDescription,
      metaKeyword,
    };
    const newPost = new Post({
      title,
      content,
      slug,
      categories,
      featured_image,
      status,
      widget,
      seo,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Failed to create post. Please try again." });
  }
});

/* Get Post By Slug */
const getPostBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, status: "publish" }).select("-seo");

    if (!post) {
      return res.status(404).json({ error: "Post Slug not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

/* Get Post Seo By Slug */
const getPostSeoBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, status: "publish" }).select(
      "seo slug featured_image createdAt updatedAt"
    );

    if (!post) {
      return res.status(404).json({ error: "Post Slug not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

/* Get all Posts */
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const allposts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json({
      status: true,
      message: "All Posts Fetched Successfully",
      allposts,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findAPost = await Post.findById(id);
    if (!findAPost) {
      return res.status(404).json({ error: "Post Id not found" });
    }
    res.status(200).json({
      status: true,
      message: "Post Found!",
      findAPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const deleteAPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteAPost = await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Post Deleted Successfully!",
      deleteAPost,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const editPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const editPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!editPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({
      status: true,
      message: "Post Updated!",
      editPost,
    });
  } catch (error) {
    console.error("Error editing post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/* Comment */
const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(postId);
  try {
    const createComment = await postcomment.create({
      user: id,
      comment: req.body.comment,
      postedon: postId,
    });
    const findPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: createComment._id } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Comment Posted!" });
  } catch (error) {
    throw new Error(error);
  }
});

const addReply = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(commentId);
  try {
    const createReply = {
      comment: req.body.comment,
      user: id,
    };
    const updatedComment = await postcomment.findByIdAndUpdate(
      commentId,
      { $push: { replies: createReply } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Reply Posted!" });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReply = asyncHandler(async (req, res) => {
  const { commentId, replyId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(commentId);
  try {
    const updatedComment = await postcomment.findByIdAndUpdate(
      commentId,
      { $pull: { replies: { _id: replyId } } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Reply Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

const addReplyToReply = asyncHandler(async (req, res) => {
  const { commentId, replyId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(commentId);
  try {
    const createReply = {
      comment: req.body.comment,
      user: id,
    };
    const updatedComment = await postcomment.findOneAndUpdate(
      { _id: commentId, "replies._id": replyId },
      { $push: { "replies.$.replies": createReply } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Reply Posted!" });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReplyToReply = asyncHandler(async (req, res) => {
  const { commentId, replyId, replyToReplyId } = req.params;
  const { id } = req.user;
  validateMongodbId(id);
  validateMongodbId(commentId);
  try {
    const updatedComment = await postcomment.findOneAndUpdate(
      { _id: commentId, "replies._id": replyId },
      { $pull: { "replies.$.replies": { _id: replyToReplyId } } },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Reply Deleted!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPost,
  getPostBySlug,
  getPostSeoBySlug,
  getAllPosts,
  getAPost,
  deleteAPost,
  editPost,
  addComment,
  addReply,
  deleteReply,
  addReplyToReply,
};
