"use client";
import { useState, useEffect } from "react";
import LoginForm from "../user/account/LoginForm";
import { HiX } from "react-icons/hi";

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="opacity-100 z-50 relative max-sm:w-full max-sm:mx-2">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-gray-200"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <HiX className="text-gray-600" />
                </button>
              </div>
              <div className="bg-dlmode p-1 rounded-lg">
                <LoginForm onLoginSuccess={onLoginSuccess} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPopup;
