import Cookies from "js-cookie";

export class LogoutUseCase {
  public constructor() {}

  async execute(): Promise<void> {
    await fetch("/api/logout", {
      method: "POST",
    });

    Cookies.remove("auth_token", { path: "/" });
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
  }
}
