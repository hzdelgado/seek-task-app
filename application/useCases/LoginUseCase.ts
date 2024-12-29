import { setTokenInCookie } from "@/application/utils/cookieUtils";

/**
 * Caso de uso para manejar el inicio de sesión de un usuario.
 * Esta clase encapsula la lógica relacionada con la autenticación
 * y el almacenamiento de datos relevantes tras un inicio de sesión exitoso.
 */
export class LoginUseCase {
  public constructor() {}

  /**
   * Método principal que ejecuta el flujo de inicio de sesión.
   * Realiza una llamada a la API para autenticar al usuario con las credenciales
   * proporcionadas. Si el inicio de sesión es exitoso, guarda el token y
   * la información del usuario en el almacenamiento local y las cookies.
   *
   * @param userData - Objeto que contiene las credenciales del usuario 
   *                   (por ejemplo, email y contraseña).
   * @returns Una promesa que se resuelve si el inicio de sesión es exitoso
   *          o lanza un error si ocurre un problema durante la autenticación.
   * 
   * @throws Error - Si la respuesta de la API indica un error, se lanza un mensaje descriptivo.
   */
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
