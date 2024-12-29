import { LoginUseCase } from "@/application/useCases/LoginUseCase";
import { setTokenInCookie } from "@/application/utils/cookieUtils";

jest.mock("@/application/utils/cookieUtils", () => ({
  setTokenInCookie: jest.fn(),
}));

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;

  beforeEach(() => {
    loginUseCase = new LoginUseCase();
    fetchMock.resetMocks();
    localStorage.clear();

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

    expect(localStorage.getItem("token")).toBe(mockResponse.token);
    expect(setTokenInCookie).toHaveBeenCalledWith(mockResponse.token);
  });

  it("should throw an error if the login response is not ok", async () => {
    const mockErrorResponse = { message: "Invalid credentials" };

    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 401 });

    const userData = { email: "test@example.com", password: "password123" };

    await expect(loginUseCase.execute(userData)).rejects.toThrow("Invalid credentials");

    expect(fetchMock).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  });
});
