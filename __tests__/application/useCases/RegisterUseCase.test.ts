import { RegisterUseCase } from "@/application/useCases/RegisterUseCase";
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

describe.skip("RegisterUseCase", () => {
  let registerUseCase: RegisterUseCase;
  const mockNotifyError = jest.fn();

  beforeEach(() => {
    registerUseCase = new RegisterUseCase();
    fetchMock.resetMocks();
    (ErrorNotifierService.getInstance as jest.Mock).mockReturnValue({
      notifyError: mockNotifyError,
    });
    jest.clearAllMocks();
  });

  it("should handle a successful registration", async () => {
    const mockResponse = {
      token: "fake-jwt-token",
      user: { name: "Jane Doe" },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const userData = { email: "jane@example.com", password: "123456" };

    await registerUseCase.execute(userData);

    expect(fetchMock).toHaveBeenCalledWith("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    expect(localStorage.getItem("userName")).toBe(mockResponse.user.name);
    expect(localStorage.getItem("token")).toBe(mockResponse.token);
    expect(setTokenInCookie).toHaveBeenCalledWith(mockResponse.token);
  });

  it("should handle a failed registration", async () => {
    fetchMock.mockResponseOnce('{ "token": "fake-token", "user": { "name": "Peter"}}', { status: 400 });

    const userData = { email: "jane@example.com", password: "123456" };

    await registerUseCase.execute(userData);

    expect(fetchMock).toHaveBeenCalledWith("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    expect(mockNotifyError).toHaveBeenCalledWith(new Error("Registration failed"));
    expect(localStorage.getItem("userName")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(setTokenInCookie).not.toHaveBeenCalled();
  });
});
