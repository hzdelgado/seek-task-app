import bcrypt from "bcryptjs";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/UserRepository";
import { generateToken } from "@/application/utils/jwtUtils";
import { Either } from "@/shared/Either";
import { isValidPassword } from "../utils/formValidationUtils";

export class AuthService {
  private static instance: AuthService;

  constructor(private userRepository: UserRepository) {}

  public static getInstance(userRepository: UserRepository): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(userRepository);
    }
    return AuthService.instance;
  }

  async registerUser(
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
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<Either<Error, { token: string; user: User }>> {
    const userResult = await this.userRepository.findByEmail(email);
    if (userResult.isLeft()) {
      return Either.left(new Error("User not found"));
    }

    const user = userResult.getRight();
    const isPasswordValid = isValidPassword(password);
    if (!isPasswordValid) {
      return Either.left(new Error("La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."));
    }

    const token = generateToken({ id: user!.id, email: user!.email });
    return Either.right({ token, user: user! });
  }
}
