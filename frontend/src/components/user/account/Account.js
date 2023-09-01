"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { LuLogOut, LuHistory } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { UserContext } from "@/context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "@/config/axiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const [state] = useContext(UserContext);
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (state && state.user) {
      setName(state.user.name);
    }
  }, [state, state.user]);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout");
      localStorage.clear();
      Cookies.remove("token");
      toast.success("Logout Successfully!");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center min-w-full sm:min-w-[498px] sm:max-w-[498px] mx-auto bg-dlmode">
        <div className="text-center">
          <MdAccountCircle className="mx-auto h-12 w-12" />
          <h4>Welcome to Rethwrit</h4>
          <h5>{name}</h5>
          <Link
            href="/account/profile"
            className="flex items-center mx-auto text-sm justify-center"
          >
            <FiEdit />
            <p>Edit Profile</p>
          </Link>
        </div>
        <div className="block mt-6 p-4">
          <ul className="border rounded-md">
            <li
              title="Comments History"
              className="p-1 border-b flex items-center justify-between"
            >
              <Link href="/account/comments">Comments History</Link>
              <LuHistory />
            </li>
            <li
              onClick={handleLogout}
              className="p-1 flex items-center justify-between cursor-pointer"
              title="Logout"
            >
              Logout
              <LuLogOut />
            </li>
          </ul>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default AccountPage;
