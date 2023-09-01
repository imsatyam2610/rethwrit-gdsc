"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "@/config/axiosConfig";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";

const RegisterForm = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendEnabled, setResendEnabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isDisabled, setDisabled] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEditEmail = () => {
    setDisabled(false);
    setOtpSent(false);
    setResendEnabled(true);
    setIsOtpVerified(false);
  };
  const handleSendOTP = async () => {
    try {
      await axiosInstance.post("/user/request-email-verification", { email });
      setOtpSent(true);
      setCountdown(60);
      setResendEnabled(false);
      toast.success("OTP Sent Successfully");
      startCountdown();
      setDisabled(true);
    } catch (error) {
      toast.error("Failed to Send OTP");
    }
  };
  const handleVerifyOTP = async () => {
    try {
      await axiosInstance.post("/user/verify-email-otp", { email, otp });
      setIsOtpVerified(true);
      toast.success("OTP Verified Successfully");
    } catch (error) {
      toast.error("OTP Verification Failed");
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    if (isOtpVerified && isPasswordValid) {
      try {
        const response = await axiosInstance.post("user/register", {
          name,
          email,
          password,
        });
        toast.success("Registration Successful");
        localStorage.clear();
        localStorage.setItem("register", response.data.message);
        switchToLogin();
      } catch (error) {
        toast.error("Registration Failed");
      }
    } else {
      if (!isPasswordValid) {
        toast.error("Password must be at least 6 characters long.");
      } else {
        toast.error("Please verify OTP before registering.");
      }
    }
  };
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setResendEnabled(true);
      setCountdown(60);
    }, 60000);
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNumericInput = /^[0-9]*$/;
  const isPasswordValid = password.length >= 6;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Email</label>
            {isDisabled && (
              <button
                type="button"
                title="Edit Email"
                className="font-medium text-xs rounded-md p-1 text-white bg-orange-900"
                onClick={handleEditEmail}
              >
                Edit Email
              </button>
            )}
          </div>
          {isDisabled ? (
            <>
              <span>{email}</span>
            </>
          ) : (
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isDisabled}
            />
          )}

          {isEmailValid && !otpSent && (
            <button
              type="button"
              className="absolute right-0 font-medium text-xs rounded-md p-1 mr-1 mt-2 text-white bg-blue-900"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          )}
          {otpSent && (
            <button
              type="button"
              title="Resend OTP"
              disabled={!resendEnabled}
              className="absolute right-0 font-medium text-xs rounded-md p-1 mr-1 text-white bg-blue-900"
              onClick={handleSendOTP}
            >
              {resendEnabled ? `Resend OTP` : `${countdown} sec`}
            </button>
          )}
        </div>
        {otpSent && (
          <div className="flex items-center mb-4">
            <input
              className="border border-gray-300 rounded-lg py-1 px-2"
              type="text"
              inputMode="numeric"
              placeholder="Enter OTP"
              minLength="6"
              maxLength="6"
              value={otp}
              onChange={(e) => {
                if (isNumericInput.test(e.target.value)) {
                  setOtp(e.target.value);
                }
              }}
              disabled={isOtpVerified}
              required
            />
            <button
              type="button"
              className={`${
                isOtpVerified && "hidden"
              } font-medium text-sm p-1 ml-2 rounded-md bg-blue-900 text-white`}
              onClick={handleVerifyOTP}
              disabled={!isNumericInput.test(otp) || otp.length !== 6}
            >
              Verify OTP
            </button>
          </div>
        )}
        <div className="mb-4 relative">
          <label className="block mb-2 text-sm font-medium">Password</label>
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
          {password.length > 0 && password.length < 6 && (
            <p className="text-red-500 text-xs mt-1">
              Password must be at least 6 characters long.
            </p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
          type="submit"
        >
          Register
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={switchToLogin}
          >
            Log in
          </span>
        </p>
      </form>
      <Toaster />
    </>
  );
};

export default RegisterForm;
