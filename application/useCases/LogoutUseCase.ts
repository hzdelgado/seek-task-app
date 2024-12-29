import Cookies from "js-cookie";
import { ErrorNotifierService } from "@/application/services/ErrorNotifierService";

export class LogoutUseCase {
  public constructor() {}

  async execute(): Promise<void> {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (!response.ok) {
      ErrorNotifierService.getInstance().notifyError(new Error("Logout failed"));
    }

    Cookies.remove("auth_token", { path: "/" });
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
  }
}
