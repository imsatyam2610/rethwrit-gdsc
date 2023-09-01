import Navbar from "@/components/pages/home/Navbar";
import SearchBar from "@/components/navbar/SearchBar";
import Footer from "@/components/common/Footer";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="flex md:h-[220px] h-[300px] flex-col items-center justify-center overflow-hidden">
        <div className="text-center max-w-[625px]">
          <h1 className="text-2xl mb-8">Clear Your Doubt</h1>
          <p>Explore Questions by searching...</p>
        </div>
        <div className="text-center mx-auto max-w-[500px] w-full mt-1">
          <SearchBar />
        </div>
      </div>
      <Footer />
    </>
  );
}
