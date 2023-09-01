import Footer from "@/components/common/Footer";
import Navbar from "@/components/pages/home/Navbar";

export default function ToolLayout({children}){
    return(
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}