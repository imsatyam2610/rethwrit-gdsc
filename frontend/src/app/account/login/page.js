"use client";
import Footer from "@/components/common/Footer";
import LoginForm from "@/components/user/account/LoginForm";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const router = useRouter();
  const handleLoginSuccess = () => {
    router.push("/account");
  };
  return (
    <>
      <div className="mx-4 max-sm:py-20 sm:py-9">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
      <Footer />
    </>
  );
}
