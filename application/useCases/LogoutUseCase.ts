import Cookies from "js-cookie";

export class LogoutUseCase {
  public constructor() {}

  async execute(): Promise<void> {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error during logout");
    }

    Cookies.remove("auth_token", { path: "/" });
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
  }
}
