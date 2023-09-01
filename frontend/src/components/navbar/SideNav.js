"use client";
import { useEffect } from "react";
import { sideListItems } from "./SideNavData";
import NestedList from "../common/NestedList";

const SideNav = ({ isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidenav-open");
    } else {
      document.body.classList.remove("sidenav-open");
    }

    return () => {
      document.body.classList.remove("sidenav-open");
    };
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen
          ? "fixed top-12 left-0 max-w-[400px] w-full bg-dlmode h-full lg:hidden z-10"
          : "w-full p-3 pt-0"
      }`}
    >
      {sideListItems.map((item) => {
        return (
          <div key={item.id} className="py-[8px] px-[4px] cursor-pointer">
            {item.nested ? (
              <NestedList
                data={item.data}
                icon={item.icon}
                text={item.text}
                navOpen={isOpen}
              />
            ) : (
              <nav aria-label="SideBar">
                <ul>
                  <li className="p-0">
                    <button className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.text}</span>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default SideNav;
