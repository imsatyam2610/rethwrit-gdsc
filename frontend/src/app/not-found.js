import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-8xl font-bold text-[#d6d6d6] mb-4">404</div>
        <h2 className="text-4xl font-bold mb-4">Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Could not find the requested resource
        </p>
        <Link
          title="Rethwrit"
          href="/"
          className="text-white p-2 rounded-full bg-blue-500 shadow-md"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
