import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";
import Cookies from "js-cookie";

jest.mock("js-cookie", () => ({
  remove: jest.fn(),
}));

describe("LogoutUseCase", () => {
  let logoutUseCase: LogoutUseCase;

  beforeEach(() => {
    logoutUseCase = new LogoutUseCase();
    fetchMock.resetMocks();
   
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should return a successful logout", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await logoutUseCase.execute();

    expect(fetchMock).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });

    expect(Cookies.remove).toHaveBeenCalledWith("auth_token", { path: "/" });
    expect(localStorage.getItem("token")).toBeNull();
  });

});
