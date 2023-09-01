"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdOutlineMoveToInbox } from "react-icons/md";

const NestedList = ({
  data = [],
  icon = <MdOutlineMoveToInbox />,
  text = "Default",
  navOpen,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div>
        {open && !navOpen && (
          <div
            className={`absolute inset-0 bg-black opacity-50 h-screen w-screen`}
          ></div>
        )}
        <div className="relative" onMouseLeave={() => setOpen(false)}>
          <div
            onMouseOver={() => setOpen(true)}
            className={`flex items-center ${
              navOpen && "border-green-200 border-b pb-2"
            }  ${open && !navOpen && "dl-inset text-white"} `}
          >
            <div className="mr-2 flex ml-3 shadow-2xl dl-icon rounded-full shrink-0 items-center justify-center h-8 w-8">
              {icon}
            </div>
            <span>{text}</span>
            <div className="ml-auto">
              {open ? (
                <FiChevronRight className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>

          {open && (
            <div className="dropdown_menu">
              {open && !navOpen ? (
                <div className="absolute rounded-tl-md rounded-tr-md inset-0 opacity-[0.175] bg-white" />
              ) : null}
              <ul
                className={`${
                  navOpen
                    ? "relative px-2 mx-2 shadow-[0px_4px_0px_1px] shadow-green-200 rounded-md"
                    : "absolute z-50 min-w-[11.45rem] top p-2 rounded-bl-md rounded-br-md shadow-lg shadow-indigo-500/40"
                } ${open ? "block" : "hidden"}`}
              >
                {data.length &&
                  data.map((item) => (
                    <li key={item.id} className="py-1 border-b border-gray-200">
                      <span>{item.text}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NestedList;
