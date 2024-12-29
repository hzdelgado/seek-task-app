import Cookies from "js-cookie";

/**
 * Caso de uso para manejar el cierre de sesión de un usuario.
 * Esta clase encapsula la lógica necesaria para desconectar al usuario
 * de manera segura, eliminando los datos relacionados con la sesión.
 */
export class LogoutUseCase {
  public constructor() {}

  /**
   * Método principal que ejecuta el flujo de cierre de sesión.
   * Envía una solicitud a la API para cerrar la sesión y elimina
   * los datos relacionados con la sesión del almacenamiento local y las cookies.
   *
   * @returns Una promesa que se resuelve al finalizar el cierre de sesión.
   * 
   * @throws Error - Si ocurre un problema durante la comunicación con la API.
   */
  async execute(): Promise<void> {
    await fetch("/api/logout", {
      method: "POST",
    });

    Cookies.remove("auth_token", { path: "/" });
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
  }
}
