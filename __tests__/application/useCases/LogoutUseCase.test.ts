import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";
import { ErrorNotifierService } from "@/application/services/ErrorNotifierService";
import Cookies from "js-cookie";

jest.mock("js-cookie", () => ({
  remove: jest.fn(),
}));

jest.mock("@/application/services/ErrorNotifierService", () => ({
  ErrorNotifierService: {
    getInstance: jest.fn(() => ({
      notifyError: jest.fn(),
    })),
  },
}));

describe.skip("LogoutUseCase", () => {
  let logoutUseCase: LogoutUseCase;
  const mockNotifyError = jest.fn();

  beforeEach(() => {
    logoutUseCase = new LogoutUseCase();
    fetchMock.resetMocks();
    (ErrorNotifierService.getInstance as jest.Mock).mockReturnValue({
      notifyError: mockNotifyError,
    });
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should handle a successful logout", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await logoutUseCase.execute();

    expect(fetchMock).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });

    expect(Cookies.remove).toHaveBeenCalledWith("auth_token", { path: "/" });
    expect(localStorage.getItem("userName")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNotifyError).not.toHaveBeenCalled();
  });

  it("should handle a failed logout", async () => {
    fetchMock.mockResponseOnce('', { status: 400 });

    await logoutUseCase.execute();

    expect(fetchMock).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });

    expect(Cookies.remove).not.toHaveBeenCalled();
    expect(localStorage.getItem("userName")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNotifyError).toHaveBeenCalledWith(new Error("Logout failed"));
  });
});
