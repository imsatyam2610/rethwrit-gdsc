"use client";
import { useState, useContext } from "react";
import { axiosInstance } from "@/config/axiosConfig";
import { UserContext } from "@/context/UserContext";
import LoginPopup from "@/components/common/LoginPopup";
import toast, { Toaster } from "react-hot-toast";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [state] = useContext(UserContext);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      comment.trim() !== "" &&
      state.user.email &&
      state.user.email.trim() !== ""
    ) {
      try {
        const response = await axiosInstance.post(`posts/comment/${postId}`, {
          comment: comment,
        });
        if (response.status === 200) {
          setComment("");
          toast.success("Comment submitted successfully!");
        }
      } catch (error) {
        toast.error("Comment Posted Failed");
      }
    } else if (!state.user.email || state.user.email.trim() === "") {
      setLoginPopupOpen(true);
    }
  };
  const handleLoginSuccess = () => {
    setLoginPopupOpen(false);
  };
  return (
    <>
      <div className="ads_common top p-1 rounded-tr-md rounded-tl-md">
        <h4 className="text-gray-600">Comments</h4>
        <textarea
          placeholder="Write you message, we reply you soon..."
          className="resize-y	min-h-[6rem] max-h-[10rem] w-full focus:outline-none border border-slate-400 top rounded"
          required={true}
          value={comment}
          onChange={handleCommentChange}
        />
        <button
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleSubmit}
        >
          Submit Comment
        </button>
      </div>
      {isLoginPopupOpen && (
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={() => setLoginPopupOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <Toaster />
    </>
  );
};
export default CommentForm;
