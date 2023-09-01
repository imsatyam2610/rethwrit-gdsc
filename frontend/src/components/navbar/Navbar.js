import DarkModeToggle from "../common/DarkModeToggle";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import { RiMenu2Line } from "react-icons/ri";
import "@/styles/common/navbar.scss";
import { HiX } from "react-icons/hi";
import { Suspense } from "react";

const Navbar = ({ toggleNavMenu, isNavOpen }) => {
  return (
    <>
      <header className="top-0 max-sm:h-[85px] left-0 right-0 z-[80] sm:py-1 relative w-full">
        <div className="mx-auto pl-3 pr-1 sm:px-6 lg:px-8">
          <div className="relative flex justify-between md:flex-row">
            <div className="flex items-center">
              {!isNavOpen && (
                <RiMenu2Line
                  size={20}
                  className="mr-2 mb-[0.13rem] hidden max-lg:block"
                  onClick={toggleNavMenu}
                />
              )}
              {isNavOpen && (
                <HiX
                  size={20}
                  className="text-red-600 mr-2 mb-[0.13rem] hidden max-lg:block z-[99px]"
                  onClick={toggleNavMenu}
                />
              )}
              <Logo />
            </div>

            <div
              className={`${
                isNavOpen ? "hidden" : ""
              } sm:flex-1 sm:flex sm:max-w-[690px] mx-auto max-sm:absolute max-sm:top-full max-sm:w-full`}
            >
              <Suspense fallback={<p>Search</p>}>
                <SearchBar className="rounded-full" />
              </Suspense>
            </div>
            <div className="flex items-center justify-end lg:space-x-8">
              <DarkModeToggle />
              <Suspense fallback={<p>Hello</p>}>
                <UserProfile />
              </Suspense>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
