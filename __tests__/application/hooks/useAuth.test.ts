import { useRouter } from "next/navigation";
import useAuth from "@/application/hooks/useAuth";
import { act } from "@testing-library/react";
import { ErrorNotifierService } from "@/application/services/ErrorNotifierService";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/application/useCases/LoginUseCase", () => ({
  LoginUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  })),
}));

jest.mock("@/application/useCases/RegisterUseCase", () => ({
  RegisterUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  })),
}));

jest.mock("@/application/useCases/LogoutUseCase", () => ({
  LogoutUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  })),
}));

jest.mock("@/application/services/ErrorNotifierService", () => ({
  ErrorNotifierService: {
    getInstance: jest.fn().mockReturnValue({
      notifyError: jest.fn(),
    }),
  },
}));

describe.skip("useAuth", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    jest.clearAllMocks();
  });


  it("should call LoginUseCase and redirect to /home on successful login", async () => {
    const mockUser = { email: 'john@example.com', password: "123456" };
    const { login } = useAuth();
  
    await act(async () => {
      await login(mockUser);
      
    });

    expect(ErrorNotifierService.getInstance().notifyError).not.toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith("/home");
  
  });
  
  it("should handle errors during LoginUseCase failure", async () => {
    const mockUser = { email: 'john@example.com', password: "123456" };
    const { login } = useAuth();
    const mockError = new Error("Login failed");

    await act(async () => {
      await login(mockUser);
    });
    expect(ErrorNotifierService.getInstance().notifyError).toHaveBeenCalledWith(mockError);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("should call RegisterUseCase and redirect to /home on successful registration", async () => {
    const mockUser = { email: 'john@example.com', password: "123456", name: "Hillari Z" };

    const { register } = useAuth();

    await act(async () => {
      await register(mockUser);
      expect(ErrorNotifierService.getInstance().notifyError).not.toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith("/home");
    });

  });
  
  it("should handle errors during RegisterUseCase failure", async () => {
    const mockUser = { email: 'john@example.com', password: "123456", name: "Hillari Z" };
    const mockError = new Error("Registration failed");

    const { register } = useAuth();
  
    await act(async () => {
      await register(mockUser);
      expect(ErrorNotifierService.getInstance().notifyError).toHaveBeenCalledWith(mockError);
      expect(mockRouterPush).not.toHaveBeenCalled();
    });

  });
  it("should call LogoutUseCase and redirect to /login on successful logout", async () => {

    const { logout } = useAuth();
  
    await act(async () => {
      await logout();
      expect(ErrorNotifierService).not.toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith("/login");
    });

  });
  
  it("should handle errors during LogoutUseCase failure", async () => {
    const mockError = new Error("Logout failed");
    const { logout } = useAuth();

    await act(async () => {
      await logout();
      expect(ErrorNotifierService.getInstance().notifyError).toHaveBeenCalledWith(mockError);
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });
});
