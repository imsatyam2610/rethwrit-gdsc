"use client";
import { useState } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { StudyItems } from "./StudyMenu";
import { AiOutlineRead } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { LuSchool } from "react-icons/lu";
import { PiExam } from "react-icons/pi";
import { CiCircleMore } from "react-icons/ci";

const SubMenuItem = ({ item, isOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`cursor-pointer ${
        isOpen
          ? "shadow-[0px_1px_1px_1px] shadow-blue-200 p-[5px_5px_5px_5px] rounded"
          : "flex px-4 py-2"
      } ${open && !isOpen ? "bg-indigo-100 text-black" : null}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {item.path ? (
        <Link href={item.path} className="flex items-center justify-between">
          <span>{item.text}</span>
          {item.submenu && <BiChevronDown className="ml-1 submenu-arrow" />}
        </Link>
      ) : (
        <div className="flex items-center justify-between">
          <span>{item.text}</span>
          {item.submenu && <BiChevronDown className="ml-1 submenu-arrow" />}
        </div>
      )}

      {item.submenu && open && (
        <>
          <div
            className={`${
              isOpen
                ? "relative"
                : "absolute left-full bg-dlmode min-w-[180px] shadow-[0px_1px_1px_1px] shadow-blue-500 submenu z-10 rounded-md pt-2"
            }`}
          >
            <SubMenu items={item.submenu} isOpen={isOpen} />
          </div>
        </>
      )}
    </div>
  );
};

const SubMenu = ({ items, isOpen }) => {
  return (
    <>
      {items.map((item, index) => (
        <SubMenuItem key={index} item={item} isOpen={isOpen} />
      ))}
    </>
  );
};

const MainMenu = ({ isOpen }) => {
  const [open, setOpen] = useState(false);
  const [moreopen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        className={`${
          isOpen
            ? "fixed top-12 left-0 max-w-[400px] w-full bg-dlmode h-full lg:hidden z-10"
            : ""
        }`}
      >
        <ul
          className={`${isOpen ? "block overflow-auto" : "flex items-center"}`}
        >
          <li
            className={`${isOpen ? "border-b pb-2" : "mx-2 relative"}`}
            key="study"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="mx-2 flex items-center justify-between">
              <div className="justify-start flex items-center">
                <div className="flex ml-3 shadow-2xl dl-icon rounded-full shrink-0 items-center justify-center h-8 w-8">
                  <AiOutlineRead />
                </div>

                <span>Study Material</span>
              </div>
              <BiChevronDown className="ml-1" />
            </div>
            {open && (
              <>
                {!isOpen && (
                  <div
                    key="study"
                    className="fixed inset-0 backdrop-filter backdrop-blur-sm top-12"
                    onMouseEnter={() => setOpen(false)}
                  ></div>
                )}
                <div
                  className={`${
                    isOpen
                      ? "relative px-1"
                      : "absolute bg-dlmode pt-2 top-full min-w-[180px] shadow-[0px_1px_1px_1px] submenu z-10 shadow-amber-400 rounded"
                  }`}
                >
                  <SubMenu items={StudyItems} isOpen={isOpen} />
                </div>
              </>
            )}
          </li>

          <li className={`${isOpen ? "border-b pb-2 pt-1" : "mx-2 relative"}`}>
            <div className="mx-2 flex items-center justify-between">
              <div className="justify-start flex items-center">
                <div className="flex ml-3 shadow-2xl dl-icon rounded-full shrink-0 items-center justify-center h-8 w-8">
                  <LuSchool />
                </div>

                <span>College</span>
              </div>
              <BiChevronDown className="ml-1 submenu-arrow" />
            </div>
          </li>
          <li className={`${isOpen ? "border-b pb-2 pt-1" : "mx-2 relative"}`}>
            <div className="mx-2 flex items-center justify-between">
              <div className="justify-start flex items-center">
                <div className="flex ml-3 shadow-2xl dl-icon rounded-full shrink-0 items-center justify-center h-8 w-8">
                  <BsNewspaper />
                </div>
                <Link href="/news">
                  <span>News</span>
                </Link>
              </div>
            </div>
          </li>
          <li className={`${isOpen ? "border-b pb-2 pt-1" : "mx-2 relative"}`}>
            <div className="mx-2 flex items-center justify-between">
              <div className="justify-start flex items-center">
                <div className="flex ml-3 shadow-2xl dl-icon rounded-full shrink-0 items-center justify-center h-8 w-8">
                  <PiExam />
                </div>
                <Link href="/exam">
                  <span>Exam</span>
                </Link>
              </div>
            </div>
          </li>
          <li
            className={`${isOpen ? "border-b pb-2 pt-1" : "mx-2 relative"}`}
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <div className="mx-2 flex items-center justify-between cursor-pointer">
              <div className="justify-start flex items-center">
                <div className="flex ml-3 shadow-2xl dl-icon rounded-full shrink-0 items-center justify-center h-8 w-8">
                  <CiCircleMore />
                </div>
                <span>More</span>
              </div>
              <BiChevronDown className="ml-1 submenu-arrow" />
            </div>
            {moreopen && (
              <>
                {!isOpen && (
                  <div
                    key="more"
                    className="fixed inset-0 backdrop-filter backdrop-blur-sm top-12"
                    onMouseEnter={() => setMoreOpen(false)}
                  ></div>
                )}
                <div
                  className={`${
                    isOpen
                      ? "relative px-1"
                      : "absolute bg-dlmode p-2 top-full min-w-[260px] shadow-[0px_1px_1px_1px] submenu z-10 shadow-amber-400 rounded"
                  }`}
                >
                  <div className="grid grid-cols-2 sm:gap-6">
                    <div className="block">
                      <h4 className="text-violet-700 font-semibold">
                        Explore More
                      </h4>
                      <ul className="text-sm">
                        <li className="border-b p-1 rounded-lg my-1">
                          <Link href="/doubt">Doubts</Link>
                        </li>
                        <li className="border-b p-1 rounded-lg mb-1">
                          <Link href="/tool">Tools</Link>
                        </li>
                        <li className="p-1 border-b rounded-lg">Full Forms</li>
                      </ul>
                    </div>
                    <div className="block">
                      <h4 className="text-violet-700 font-semibold">
                        Quick Link
                      </h4>
                      <ul className="text-sm">
                        <li className="border-b rounded-lg my-1 p-1">
                          <Link href="/about">About Us</Link>
                        </li>
                        <li className="p-1 border-b rounded-lg">
                          <Link href="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MainMenu;
