import { setTokenInCookie } from "@/application/utils/cookieUtils";
import { ErrorNotifierService } from "@/application/services/ErrorNotifierService";

export class LoginUseCase {
  public constructor() {}

  async execute(userData: any): Promise<void> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      ErrorNotifierService.getInstance().notifyError(new Error("Login failed"));
    }

    const { token, user } = await response.json();
    const { name } = user;

    localStorage.setItem("userName", name);
    localStorage.setItem("token", token);

    setTokenInCookie(token);
  }
}
