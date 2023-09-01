"use client";
import { Popover, Transition } from "@headlessui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { BiChevronDown, BiMessageSquareDetail } from "react-icons/bi";
import { RiUserSettingsLine, RiLogoutCircleRLine } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import LoginPopup from "@/components/common/LoginPopup";

const UserProfile = () => {
  const [state, setState] = useContext(UserContext);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const usermenuItems = [
    // {
    //   name: "Dashboard",
    //   href: "##",
    //   icon: RxDashboard,
    // },
    {
      name: "Account",
      href: "/account",
      icon: RiUserSettingsLine,
    },
    {
      name: "Comments",
      href: "/account/comments",
      icon: BiMessageSquareDetail,
    },
  ];

  const handleLogin = () => {
    if (
      state.user.email &&
      state.user.email.trim() !== "" &&
      state.name !== ""
    ) {
      setLoginPopupOpen(false);
    } else if (!state.user.email || state.user.email.trim() === "") {
      setLoginPopupOpen(true);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("token");
    toast.success("Logout Successfully!");
  };

  return (
    <>
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="flex items-center justify-center max-sm:pr-0 p-2 hover:border-none focus:outline-none">
              <FaRegUserCircle className="w-6 h-6" />
              <BiChevronDown className="h-[25px] ml-1 w-[25px]" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-2 max-w-sm top-0 px-4 sm:px-0">
                <div className="overflow-hidden bg-dlmode rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-2 top">
                    {state.name && state.token !== null ? (
                      <div className="px-2">
                        <Link
                          href="/account/profile"
                          title="My Profile"
                          className="-m-3 my-1 pb-1 flex items-center rounded-lg border-b border-b-gray-400 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex ml-3 shadow-2xl bg-[#e5e5e5] rounded-full shrink-0 items-center justify-center w-10 h-10">
                            <HiUserCircle
                              aria-hidden="true"
                              className="w-10 h-10"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium">Profile</p>
                            <span className="text-sm">{state.name}</span>
                          </div>
                        </Link>
                        {usermenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            title={item.name}
                            className="-m-3 my-1 pb-1 flex items-center rounded-lg border-b border-b-gray-400 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="flex ml-3 shadow-2xl bg-[#e5e5e5] rounded-full shrink-0 items-center justify-center h-7 w-7">
                              <item.icon aria-hidden="true" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium">{item.name}</p>
                            </div>
                          </Link>
                        ))}
                        <div
                          onClick={handleLogout}
                          className="-m-3 my-1 cursor-pointer flex items-center transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex ml-3 shadow-2xl bg-[#e5e5e5] rounded-full shrink-0 items-center justify-center h-7 w-7">
                            <RiLogoutCircleRLine aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium">Logout</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="px-2 cursor-pointer"
                        onClick={handleLogin}
                      >
                        <span
                          title="Login"
                          className="-m-3 my-1 flex items-center rounded-lg transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex ml-3 shadow-2xl bg-[#e5e5e5] rounded-full shrink-0 items-center justify-center w-8 h-8">
                            <HiUserCircle
                              aria-hidden="true"
                              className="w-8 h-8 text-black"
                            />
                          </div>
                          <div className="ml-4 bg-yellow-300 px-2.5 py-[1px] rounded">
                            <p className="text-base text-black font-medium">
                              Login
                            </p>
                          </div>
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <a
                      href="mailto:rethwrit@gmail.com?subject=Rethwrit Need My Feedback&body=Hello"
                      title="Feedback"
                      target="_blank"
                      className="flow-root rounded-md px-2 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium">
                          Give Feedback
                        </span>
                      </span>
                      <span className="block text-sm">
                        Rethwrit Need Your Feedback
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <Toaster />
      {isLoginPopupOpen && (
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={() => setLoginPopupOpen(false)}
          onLoginSuccess={() => setLoginPopupOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
