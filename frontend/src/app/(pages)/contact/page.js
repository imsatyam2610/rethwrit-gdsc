"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    toast.success("Message Submitted Successfully!");
    setSubmitted(true);
  };

  return (
    <>
      <iframe
        name="hiddenConfirm"
        id="hiddenConfirm"
        className="hidden"
      ></iframe>
      <div className="container mx-auto md:w-[628px]">
        <h1 className="text-2xl mt-2">Contact Us</h1>
        <div className="block my-2">
          <div className={`${submitted ? "min-h-[300px] mt-24" : "hidden"}`}>
            <div className="text-blue-600 text-center">Message</div>
            <div className="mt-2 mb-4">
              Thank you for showing interest in Rethwrit. We will get back to
              you shortly.
            </div>
            <div className="text-center">
              <Link
                href="/"
                className="p-2 shadow rounded-full bg-green-700 text-white"
              >
                Go Home
              </Link>
            </div>
          </div>
          <form
            action="https://docs.google.com/forms/d/e/1FAIpQLSdjTaD3m2rTL6WR_Ksb3YTKnVde8lAguqy8l319oZw6LJq0wg/formResponse"
            method="post"
            target="hiddenConfirm"
            onSubmit={handleSubmit}
            className={`${submitted ? "hidden" : ""}`}
          >
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="entry.1260225585"
                className="w-full p-2 border rounded"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="entry.357312757"
                className="w-full p-2 border rounded"
                placeholder="Your Email Address"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="entry.1823517929"
                className="w-full p-2 border rounded"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="entry.1749453642"
                rows="4"
                className="w-full p-2 border rounded"
                placeholder="Your Messeage to Us"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default Contact;
