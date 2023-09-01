"use client";
import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "@/config/axiosConfig";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "@/context/UserContext";
import RegisterForm from "./RegisterForm";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";

const LoginForm = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setState] = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("user/login", {
        email,
        password,
      });
      setState({
        user: response.data,
        name: response.data.name,
        token: response.data.token,
      });

      toast.success(response.data.message);
      Cookies.set("token", response.data.token, { expires: 4 });
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("access_token", JSON.stringify(response.data.token));
      onLoginSuccess();
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };
  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };
  return (
    <>
      <div className="flex sm:w-[750px] my-0 mx-auto max-h-[596px] shadow-lg">
        <div className="max-sm:hidden w-1/2 bg-blue-50">
          <div className="flex flex-col justify-center h-full p-8">
            <h2 className="text-3xl font-semibold mb-4">Welcome to Rethwrit</h2>
            <p>🎉 Greetings, Future Scholar! 📚</p>
            <p className="text-green-800 my-3">
              Unlock a World of Knowledge and Opportunities with Rethwrit
              Education.
            </p>
            <ul>
              <li>💬 Member-Only Comments</li>
              <li>🔗 Seamless Learning Experience</li>
              <li>💡 Interactive Resources</li>
            </ul>
          </div>
        </div>

        <div className="max-sm:w-full sm:w-1/2 bg-white p-5">
          {showLogin ? (
            <>
              <h1 className="text-2xl font-semibold mb-6">Login</h1>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block  text-sm font-medium">
                      Password
                    </label>
                    <span className="text-blue-700 text-xs cursor-pointer">
                      Forgot Password?
                    </span>
                  </div>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 mt-3 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
                  </button>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                  type="submit"
                >
                  Log in
                </button>
                <p className="mt-4">
                  New user?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setShowLogin(false)}
                  >
                    Register here
                  </span>
                </p>
              </form>
            </>
          ) : (
            <RegisterForm switchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </div>

      <Toaster />
    </>
  );
};
export default LoginForm;
