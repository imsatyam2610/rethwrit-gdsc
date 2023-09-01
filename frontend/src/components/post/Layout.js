"use client";
import { Suspense, useState } from "react";
import Navbar from "../navbar/Navbar";
import SideNav from "../navbar/SideNav";

const PostLayout = ({ children }) => {
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
          <Suspense fallback={<p>Loading..</p>}>
            <SideNav isOpen={isNavMenuOpen} />
          </Suspense>
        </div>

        <div className="w-full bp324">
          <main className="block lg:grid lg:grid-cols-[750px_350px] lg:max-xl:grid-cols-[minmax(600px,1fr)] lg:gap-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
export default PostLayout;
