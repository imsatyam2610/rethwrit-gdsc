"use client";
import { useState } from "react";
import AccountSideNav from "./SideNav";
import SideBar from "@/components/common/SideBar";
import HeaderNavbar from "./NavBar";

const AccountLayout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };
  return (
    <>
      <HeaderNavbar toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="flex">
        <div
          className={`${
            isNavOpen
              ? "absolute"
              : "flex w-64 lg:sticky lg:top-0 h-[91vh] max-lg:hidden"
          }`}
        >
          <SideBar>
            <AccountSideNav isOpen={isNavOpen} />
          </SideBar>
        </div>
        <div className="darklight w-full p-2">{children}</div>
      </div>
    </>
  );
};
export default AccountLayout;
