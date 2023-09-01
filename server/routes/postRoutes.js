const postRouter = require("express").Router();
const {
  createPost,
  getPostBySlug,
  getAllPosts,
  deleteAPost,
  editPost,
  getAPost,
  addComment,
  addReply,
  deleteReply,
  addReplyToReply,
  getPostSeoBySlug,
} = require("../controllers/postController.js");
const { authUserMiddleware } = require("../middlewares/authMiddleware.js");

postRouter.post("/create", createPost);
postRouter.post("/comment/:postId", authUserMiddleware, addComment);
postRouter.post("/comment/reply/:commentId", authUserMiddleware, addReply);
postRouter.post(
  "/comment/:commentId/reply/:replyId/reply",
  authUserMiddleware,
  addReplyToReply
);
postRouter.put("/edit/:id", editPost);
postRouter.get("/get/:id", getAPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/sluget/:slug(*)", getPostBySlug);
postRouter.get("/slugseo/:slug(*)", getPostSeoBySlug);
postRouter.delete("/delete/:id", deleteAPost);
postRouter.delete(
  "/comment/:commentId/reply/:replyId",
  authUserMiddleware,
  deleteReply
);

module.exports = postRouter;
