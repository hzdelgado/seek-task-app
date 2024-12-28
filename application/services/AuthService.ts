import bcrypt from "bcryptjs";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/UserRepository";
import { generateToken } from "@/application/utils/jwtUtils";
import { Either } from "@/shared/Either";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

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
      return Either.left(new Error("Invalid email or password"));
    }

    const user = userResult.getRight();
    const isPasswordValid = await bcrypt.compare(password, user!.password);
    if (!isPasswordValid) {
      return Either.left(new Error("Invalid email or password"));
    }

    const token = generateToken({ id: user!.id, email: user!.email });
    return Either.right({ token, user: user! });
  }
}
