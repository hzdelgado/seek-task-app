import { IsString, IsNotEmpty, Length, IsEmail, IsOptional } from "class-validator";

// Esta entidad representa a un usuario dentro del dominio de la aplicación.
// Contiene los campos necesarios para autenticar y gestionar a los usuarios.
export class User {
  // Propiedad que representa el identificador único del usuario.
    // Se asegura de que sea una cadena no vacía.
    @IsString()
    @IsNotEmpty()
    public id: string;
    // Propiedad opcional que representa el nombre del usuario.
    // Si está presente, debe ser una cadena.
    @IsString()
    @IsOptional()
    public name?: string;
    // Propiedad que representa el correo electrónico del usuario.
    // Se asegura de que sea un correo válido y no esté vacío.
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    // Propiedad que representa la contraseña del usuario.
    // Se asegura de que sea una cadena de entre 6 y 20 caracteres.
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    public password: string;
  
    // Constructor para inicializar la entidad con los valores necesarios.
    // @param id - Identificador único del usuario.
    // @param email - Correo electrónico del usuario.
    // @param password - Contraseña del usuario.
    constructor(id: string, email: string, password: string) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  }
  