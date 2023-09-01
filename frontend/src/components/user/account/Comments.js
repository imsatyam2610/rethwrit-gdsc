"use client";
import { useState, useEffect } from "react";
import { Popover, Dialog } from "@headlessui/react";
import { BiDotsVerticalRounded, BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "@/config/axiosConfig";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get("/user/comments");
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleDeleteClick = (postId, commentId) => {
    setSelectedPostId(postId);
    setSelectedCommentId(commentId);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(
        `/user/comments/${selectedPostId}/${selectedCommentId}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== selectedCommentId)
      );
      setSelectedCommentId(null);
      setSelectedPostId(null);
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <>
      <h1 className="text-xl font-bold">Comments</h1>
      {loading && <p>Loading...</p>}
      {!loading && comments.length === 0 && (
        <p>No comments found for this user.</p>
      )}
      {!loading && comments.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="shadow-lg p-2 rounded-md bg-dlmode"
            >
              <span>Commented</span>
              <div className="float-right">
                <Popover as="div">
                  {({ open }) => (
                    <>
                      <Popover.Button className="flex items-center relative">
                        <BiDotsVerticalRounded />
                      </Popover.Button>

                      {open && (
                        <Popover.Panel static className="z-10 relative">
                          <div className="absolute right-0 w-24 bg-dlmode border border-gray-200 p-2 rounded-lg shadow-lg">
                            <ul>
                              <li
                                title="Edit"
                                className="cursor-pointer flex items-center"
                                onClick={() => {
                                  setEditOpen(true);
                                  setEditedComment(comment.comment);
                                }}
                              >
                                <BiSolidPencil className="mr-2" />
                                Edit
                              </li>
                              <li
                                title="Delete"
                                className="cursor-pointer flex items-center"
                                onClick={() =>
                                  handleDeleteClick(
                                    comment.postedon,
                                    comment._id
                                  )
                                }
                              >
                                <MdDelete className="mr-2" />
                                Delete
                              </li>
                            </ul>
                          </div>
                        </Popover.Panel>
                      )}
                    </>
                  )}
                </Popover>
              </div>
              <div className="rounded-md m-1 p-2 bg-gray-200 text-black">
                {comment.comment}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs mt-1">
                  {formatDate(comment.createdAt)}
                </div>
                <div
                  className="float-right text-sm cursor-pointer text-purple-800"
                  onClick={() => setReplyOpen(true)}
                >
                  View Reply
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-4 rounded">
            <div className="pb-1 mb-3 flex items-center justify-between border-b border-black/10">
              <div className="text-center sm:text-left">
                <Dialog.Title className="text-base font-bold leading-6 text-gray-900 dark:text-gray-200">
                  Delete Comment?
                </Dialog.Title>
              </div>
            </div>
            <p>This will delete the selected comment. Are you sure?</p>
            <div className="flex items-center justify-end mt-4">
              <button
                onClick={() => setDeleteOpen(false)}
                className="p-1 border rounded-md shadow mr-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-1 px-2 bg-red-700 rounded-md shadow ml-2 text-white"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Edit */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-4 rounded w-[500px]">
            <div className="pb-1 mb-3 flex items-center justify-between border-b border-black/10">
              <div className="text-center sm:text-left">
                <Dialog.Title className="text-base font-bold leading-6 text-gray-900 dark:text-gray-200">
                  Edit Comment?
                </Dialog.Title>
              </div>
            </div>
            <p>Edit the comment below:</p>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md resize-none"
              rows="4"
            />
            <div className="flex items-center justify-end mt-4">
              <button
                onClick={() => {
                  setEditOpen(false);
                  setEditedComment("");
                }}
                className="p-1 border rounded-md shadow mr-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-1 px-2 bg-blue-700 rounded-md shadow ml-2 text-white"
              >
                Update
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* View Reply */}
      <Dialog
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-4 rounded">
            <div className="pb-1 mb-3 flex items-center justify-between border-b border-black/10">
              <div className="text-center sm:text-left">
                <Dialog.Title className="text-base font-bold leading-6 text-gray-900 dark:text-gray-200">
                  Comment
                </Dialog.Title>
              </div>
            </div>
            <p>This will delete the selected comment. Are you sure?</p>
            <div className="flex items-center justify-end mt-4">
              <button
                onClick={() => setReplyOpen(false)}
                className="p-1 bg-amber-700 border rounded-md shadow mr-1"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default CommentPage;
