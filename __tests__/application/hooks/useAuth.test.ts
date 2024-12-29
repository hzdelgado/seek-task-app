import { useRouter } from "next/navigation";
import useAuth from "@/application/hooks/useAuth";
import { act, renderHook } from "@testing-library/react";
import { LoginUseCase } from "@/application/useCases/LoginUseCase";
import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/application/useCases/LoginUseCase", () => ({
  LoginUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  })),
}));

jest.mock("@/application/useCases/LogoutUseCase", () => ({
  LogoutUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  })),
}));


describe("useAuth", () => {
  let mockRouterPush: jest.Mock;
  let loginExecuteMock: jest.Mock;
  let logoutExecuteMock: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    loginExecuteMock = jest.fn();
    logoutExecuteMock = jest.fn();

    (LoginUseCase as jest.Mock).mockImplementation(() => ({
      execute: loginExecuteMock,
    }));

    (LogoutUseCase as jest.Mock).mockImplementation(() => ({
      execute: logoutExecuteMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call LoginUseCase and redirect to /home on successful login", async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({ email: "test@example.com", password: "123456" });
    });

    expect(loginExecuteMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
    expect(mockRouterPush).toHaveBeenCalledWith("/home");
  
  });
  
  it("should handle errors during LoginUseCase failure", async () => {
    const errorMessage = "Login failed";
    loginExecuteMock.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useAuth());

    await expect(
      act(async () => {
        await result.current.login({ email: "test@example.com", password: "123456" });
      })
    ).rejects.toThrow(errorMessage);

    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("should call LogoutUseCase and redirect to /login on successful logout", async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(logoutExecuteMock).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });
  
  it("should handle errors during LogoutUseCase failure", async () => {
    const errorMessage = "Logout failed";
    logoutExecuteMock.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useAuth());

    await expect(
      act(async () => {
        await result.current.logout();
      })
    ).rejects.toThrow(errorMessage);

    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
