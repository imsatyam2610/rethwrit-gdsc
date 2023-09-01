import Footer from "@/components/common/Footer";
import Navbar from "@/components/pages/home/Navbar";

export default function PagesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
