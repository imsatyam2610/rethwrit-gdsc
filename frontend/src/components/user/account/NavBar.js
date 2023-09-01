"use client";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { BiChevronDown, BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import DarkModeToggle from "@/components/common/DarkModeToggle";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import { axiosInstance } from "@/config/axiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HeaderNavbar = ({ toggleNav, isNavOpen }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout");
      localStorage.clear();
      Cookies.remove("token");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="py-2 sm:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {!isNavOpen && (
            <RiMenu2Line
              size={20}
              className="mx-2 hidden max-lg:block"
              onClick={toggleNav}
            />
          )}
          {isNavOpen && (
            <HiX
              size={20}
              className="text-red-600 mx-2 hidden max-lg:block z-[99px]"
              onClick={toggleNav}
            />
          )}
          <div className="text-lg font-bold">
            <Link href="/">Rethwrit</Link>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <DarkModeToggle />

          <Popover as="div" className="relative ml-2">
            {({ open }) => (
              <>
                <Popover.Button className="flex items-center">
                  <BiUserCircle size={40} />
                  <div className="text-sm text-left capitalize">
                    <div>Hello,</div>
                    <div className="items-center">{state.user.name}</div>
                  </div>
                  <BiChevronDown className="h-[25px] ml-1 w-[25px]" />
                </Popover.Button>
                {open && (
                  <Popover.Panel
                    as="div"
                    className="absolute bg-dlmode right-0 mt-1 w-40 rounded-lg shadow-lg z-20"
                  >
                    <div className="py-2">
                      <Link
                        href="/account/profile"
                        className="flex items-center cursor-pointer px-4 py-2"
                      >
                        <AiOutlineUser className="mr-2" size={20} />
                        My Profile
                      </Link>
                      <span
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer px-4 py-2"
                      >
                        <FiLogOut className="mr-2" size={20} />
                        Logout
                      </span>
                    </div>
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavbar;
