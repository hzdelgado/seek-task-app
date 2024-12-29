import { useRouter } from "next/navigation";
import { LoginUseCase } from "@/application/useCases/LoginUseCase";
import { RegisterUseCase } from "@/application/useCases/RegisterUseCase";
import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";
import { ErrorNotifierService } from "@/application//services/ErrorNotifierService";

type UseAuthHook = {
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuth = (): UseAuthHook => {
  const router = useRouter();
  const loginUseCase = new LoginUseCase();
  const registerUseCase = new RegisterUseCase();
  const logoutUseCase = new LogoutUseCase();

  const login = async (userData: any): Promise<void> => {
    try {
      await loginUseCase.execute(userData);
      router.push("/home");
    } catch (error: any) {
      ErrorNotifierService.getInstance().notifyError(new Error(error.message));
    }
  };

  const register = async (userData: any): Promise<void> => {
    try {
      await registerUseCase.execute(userData);
      router.push("/home");
    } catch (error: any) {
      ErrorNotifierService.getInstance().notifyError(new Error(error.message));
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutUseCase.execute();
      router.push("/login");
    } catch (error: any) {
      ErrorNotifierService.getInstance().notifyError(new Error(error.message));
    }
  };

  return { login, logout, register };
};

export default useAuth;
