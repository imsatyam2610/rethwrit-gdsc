import Footer from "@/components/common/Footer";
import Navbar from "@/components/pages/home/Navbar";

export default function News() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Under Construction</h1>
        <p className="text-lg text-gray-700">
          We&apos;re working hard to bring you something awesome.
        </p>
      </div>
      <Footer />
    </>
  );
}
