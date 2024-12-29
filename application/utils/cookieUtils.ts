import Cookies from 'js-cookie';

/**
 * Establece el token de autenticación en una cookie.
 * Esta función configura una cookie segura y con restricciones adecuadas para almacenar el token.
 *
 * @param token - El token de autenticación que se desea guardar en la cookie.
 *
 * Configuración de la cookie:
 * - `expires`: Define la duración de la cookie, en este caso, 1 día.
 * - `path`: Especifica el alcance de la cookie dentro del dominio, aquí está disponible para toda la aplicación.
 * - `sameSite`: Limita el uso de la cookie en solicitudes de mismo origen para evitar vulnerabilidades CSRF.
 * - `secure`: Requiere una conexión HTTPS para enviar la cookie.
 */
export const setTokenInCookie = (token: string) => {
  Cookies.set('auth_token', token, {
    expires: 1, 
    path: '/',   
    sameSite: 'Strict',
    secure: true,
  });
};

/**
 * Elimina la cookie que almacena el token de autenticación.
 * Esta función asegura que el token de autenticación ya no esté disponible en el cliente.
 *
 * Configuración:
 * - `path`: Debe coincidir con el alcance definido al configurar la cookie.
 */
export const removeAuthTokenCookie = () => {
  Cookies.remove('auth_token', {
    path: '/', 
  });
};