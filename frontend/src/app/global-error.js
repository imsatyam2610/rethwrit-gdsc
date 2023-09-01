"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-semibold mb-4">Something went wrong!</h1>
        <p className="text-gray-700">
          Oops! Rethwrit experiencing some technical difficulties at the moment.
          Please try again later..
        </p>
        <p className="mt-2 text-gray-700">
          If the problem persists, please contact our support team for
          assistance.
        </p>
        <button
          onClick={() => reset()}
          className="text-white p-2 rounded-full bg-green-800 shadow-md"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
