import { LoginUseCase } from "@/application/useCases/LoginUseCase";
import { ErrorNotifierService } from "@/application/services/ErrorNotifierService";
import { setTokenInCookie } from "@/application/utils/cookieUtils";

jest.mock("@/application/utils/cookieUtils", () => ({
  setTokenInCookie: jest.fn(),
}));

jest.mock("@/application/services/ErrorNotifierService", () => ({
  ErrorNotifierService: {
    getInstance: jest.fn(() => ({
      notifyError: jest.fn(),
    })),
  },
}));

describe.skip("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  const mockNotifyError = jest.fn();

  beforeEach(() => {
    loginUseCase = new LoginUseCase();
    fetchMock.resetMocks();
    (ErrorNotifierService.getInstance as jest.Mock).mockReturnValue({
      notifyError: mockNotifyError,
    });
    jest.clearAllMocks();
  });

  it("should handle a successful login", async () => {
    const mockResponse = {
      token: "fake-jwt-token",
      user: { name: "John Doe" },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const userData = { email: "john@example.com", password: "123456" };

    await loginUseCase.execute(userData);

    expect(fetchMock).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    expect(localStorage.getItem("userName")).toBe(mockResponse.user.name);
    expect(localStorage.getItem("token")).toBe(mockResponse.token);
    expect(setTokenInCookie).toHaveBeenCalledWith(mockResponse.token);
  });

  it("should handle a failed login", async () => {
    fetchMock.mockResponseOnce('', { status: 401 });

    const userData = { email: "john@example.com", password: "wrong-password" };

    await loginUseCase.execute(userData);

    expect(fetchMock).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    expect(mockNotifyError).toHaveBeenCalledWith(new Error("Login failed"));
    expect(localStorage.getItem("userName")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(setTokenInCookie).not.toHaveBeenCalled();
  });
});
