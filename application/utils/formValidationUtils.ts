/**
 * Verifica si una contraseña cumple con los requisitos de seguridad establecidos.
 * La contraseña debe tener al menos:
 * - Una letra minúscula.
 * - Una letra mayúscula.
 * - Un número.
 * - Un carácter especial (por ejemplo, @$!%*?&).
 * - Una longitud mínima de 6 caracteres.
 *
 * @param password - La contraseña que se desea validar.
 * @returns `true` si la contraseña es válida, de lo contrario `false`.
 */
  export const isValidPassword = (password: string): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };
  
  /**
   * Verifica si un correo electrónico tiene un formato válido.
   * Un correo válido debe:
   * - No contener espacios en blanco.
   * - Tener un formato con un "@" y un dominio válido, por ejemplo, usuario@dominio.com.
   *
   * @param email - El correo electrónico que se desea validar.
   * @returns `true` si el correo tiene un formato válido, de lo contrario `false`.
 */
  export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };