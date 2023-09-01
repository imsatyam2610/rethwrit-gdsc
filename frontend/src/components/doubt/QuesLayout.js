import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/common/Footer";

const QuestionLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-full bp324">
          <main className="block doubt">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default QuestionLayout;
