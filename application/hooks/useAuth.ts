import { useRouter } from "next/navigation";
import { LoginUseCase } from "@/application/useCases/LoginUseCase";
import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";

type UseAuthHook = {
  login: (userData: any) => Promise<void>;
  //register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuth = (): UseAuthHook => {
  const router = useRouter();
  const loginUseCase = new LoginUseCase();
  const logoutUseCase = new LogoutUseCase();

  const login = async (userData: any): Promise<void> => {
    try {
      await loginUseCase.execute(userData);
      router.push("/home");
    } catch (error: any) {
      throw new Error(error.message || "Error during login");
    }
  };
/*
  const register = async (userData: any): Promise<void> => {
    try {
      await registerUseCase.execute(userData);
      router.push("/home");
    } catch (error: any) {
      throw new Error(error.message || "Error during registration");
    }
  };
*/
  const logout = async (): Promise<void> => {
    try {
      await logoutUseCase.execute();
      router.push("/login");
    } catch (error: any) {
      throw new Error(error.message || "Error during logout");
    }
  };

  return { login, logout };
};

export default useAuth;
