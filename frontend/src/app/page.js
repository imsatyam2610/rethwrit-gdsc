import Footer from "@/components/common/Footer";
import Navbar from "@/components/pages/home/Navbar";
import HomeSection1 from "@/components/pages/home/Section1";
import HomeSubjectSection from "@/components/pages/home/SubjectSection";
import HomeToolSection from "@/components/pages/home/ToolSection";
import "@/styles/pages/home.scss";

export default function Home() {
  return (
    <>
      <main className="home">
        <Navbar />
        <HomeSection1 />
        <HomeToolSection />
        <HomeSubjectSection />
        <Footer />
      </main>
    </>
  );
}
