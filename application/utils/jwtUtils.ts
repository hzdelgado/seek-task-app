import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Clave secreta utilizada para firmar y verificar los tokens.
const JWT_EXPIRES_IN = "1h"; // Tiempo de expiración del token.

/**
 * Genera un token JWT firmado utilizando el payload proporcionado.
 *
 * @param payload - Un objeto que contiene los datos que se incluirán en el token.
 * @returns El token JWT generado como una cadena de texto.
*/
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifica un token JWT y devuelve su contenido si es válido.
 *
 * @param token - El token JWT que se desea verificar.
 * @returns El contenido del token si es válido. Puede ser un objeto decodificado o una cadena.
 * @throws Lanza un error si el token no es válido o ha expirado.
 */
export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};
