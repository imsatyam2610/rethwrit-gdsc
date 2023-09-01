"use client";
import React, { useState } from "react";
import DarkModeToggle from "@/components/common/DarkModeToggle";
import Logo from "@/components/navbar/Logo";
import UserProfile from "@/components/navbar/UserProfile";
import MainMenu from "./MainMenu";
import { RiMenu2Line } from "react-icons/ri";
import "@/styles/pages/hnavbar.scss";
import { HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const toggleMainMenu = () => {
    setIsMainMenuOpen((prevIsMainMenuOpen) => !prevIsMainMenuOpen); // Step 3
  };
  return (
    <>
      <header className="top-0 left-0 right-0 z-[80] sm:py-1 relative w-full">
        <div className="flex items-center justify-between sm:px-4 max-sm:pl-3">
          <div className="flex items-center">
            {!isMainMenuOpen && (
              <RiMenu2Line
                size={20}
                className="mr-2 mb-[0.13rem] hidden max-lg:block"
                onClick={toggleMainMenu}
              />
            )}
            {isMainMenuOpen && (
              <HiX
                size={20}
                className="text-red-600 mr-2 mb-[0.13rem] hidden max-lg:block z-[99px]"
                onClick={toggleMainMenu}
              />
            )}
            <Logo />
          </div>
          <div
            className={`${
              isMainMenuOpen ? "block" : "flex items-center max-lg:hidden"
            }`}
          >
            <MainMenu isOpen={isMainMenuOpen} />
          </div>

          <div className="flex items-center justify-end lg:space-x-8">
            <DarkModeToggle />
            {!isMainMenuOpen && <UserProfile />}
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
