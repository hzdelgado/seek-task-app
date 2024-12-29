import { setTokenInCookie } from "@/application/utils/cookieUtils";
import { Either } from "@/shared/Either";

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
      const errorData = await response.json();
      throw new Error(errorData.message || "Error during login");
    }

    const { token, user } = await response.json();
    const { name } = user;

    localStorage.setItem("userName", name);
    localStorage.setItem("token", token);

    setTokenInCookie(token);  
  }
}
