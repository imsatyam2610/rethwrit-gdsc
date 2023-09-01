"use client";
import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import SideNav from "@/components/navbar/SideNav";

const NewsLayout = ({ children }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const toggleNavMenu = () => {
    setIsNavMenuOpen((prevIsNavMenuOpen) => !prevIsNavMenuOpen);
  };
  return (
    <>
      <Navbar toggleNavMenu={toggleNavMenu} isNavOpen={isNavMenuOpen} />
      <div className="flex">
        <div
          className={`${
            isNavMenuOpen
              ? "absolute"
              : "flex w-64 lg:sticky lg:top-0 h-screen max-lg:hidden"
          }`}
        >
          <SideNav isOpen={isNavMenuOpen} />
        </div>

        <div className="w-full bp324">
          <main className="block news lg:grid lg:grid-cols-[750px_350px] lg:max-xl:grid-cols-[minmax(600px,1fr)] lg:gap-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
export default NewsLayout;
