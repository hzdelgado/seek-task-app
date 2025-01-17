"use client";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-500">
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
