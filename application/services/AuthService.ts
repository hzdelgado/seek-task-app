import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/UserRepository";
import { generateToken } from "@/application/utils/jwtUtils";
import { Either } from "@/shared/Either";
import { isValidPassword } from "../utils/formValidationUtils";

/**
 * Clase que maneja la lógica de autenticación del usuario.
 * Implementa patrones como el Singleton para garantizar que solo haya
 * una instancia de esta clase en toda la aplicación.
 */
export class AuthService {
  private static instance: AuthService;
 /**
   * Constructor privado para evitar la creación directa de instancias de la clase.
   * Utiliza el repositorio de usuarios para interactuar con la persistencia de datos.
   *
   * @param userRepository - El repositorio de usuarios utilizado para acceder a los datos de los usuarios.
  */
  constructor(private userRepository: UserRepository) {}

  /**
   * Método estático para obtener una instancia única de la clase `AuthService` 
   * (patrón Singleton). Si la instancia no ha sido creada, la crea. Si ya existe, la retorna.
   *
   * @param userRepository - El repositorio de usuarios utilizado para interactuar con la persistencia de datos.
   * @returns La instancia única de `AuthService`.
   */
  public static getInstance(userRepository: UserRepository): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(userRepository);
    }
    return AuthService.instance;
  }

/*async registerUser(
    email: string,
    password: string,
    name?: string
  ): Promise<Either<Error, { token: string; user: User }>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(Math.random().toString(), email, hashedPassword);
    user.name = name;

    const registrationResult = await this.userRepository.register(user);
    if (registrationResult.isLeft()) {
      return Either.left(registrationResult.getLeft()!);
    }

    const token = generateToken({ id: user.id, email: user.email });
    return Either.right({ token, user });
  }*/

    /**
   * Método que maneja el inicio de sesión de un usuario.
   * 
   * Primero busca al usuario por su correo electrónico. Si el usuario existe,
   * valida que la contraseña cumpla con ciertos requisitos. Si la contraseña
   * es válida, se genera un token de acceso y se retorna junto con el usuario.
   * 
   * @param email - El correo electrónico del usuario que intenta iniciar sesión.
   * @param password - La contraseña proporcionada por el usuario.
   * @returns Una promesa que resuelve un `Either` que contiene un `Error` si ocurre un fallo,
   *          o un objeto con el `token` y el `user` si el inicio de sesión es exitoso.
   */
  async loginUser(
    email: string,
    password: string
  ): Promise<Either<Error, { token: string; user: User }>> {
    const userResult = await this.userRepository.findByEmail(email);

    const user = userResult.getRight();
    const isPasswordValid = isValidPassword(password);
    if (!isPasswordValid) {
      return Either.left(new Error("La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."));
    }

    const token = generateToken({ id: user!.id, email: user!.email });
    return Either.right({ token, user: user! });
  }
}
