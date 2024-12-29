import RegisterForm from "@/components/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-y-5 h-screen items-center justify-center bg-gray-100 dark:bg-slate-500">
      <RegisterForm />
    </div>
  );
};
export default RegisterPage;
