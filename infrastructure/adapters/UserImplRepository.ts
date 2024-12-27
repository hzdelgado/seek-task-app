import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/UserRepository";
import { Either } from "@/shared/Either";

export class UserImplRepository implements UserRepository {
  private users: User[] = [];
  private loggedInUsers: Set<string> = new Set();

  constructor() {}

  async login(email: string, password: string): Promise<Either<Error, User>> {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.loggedInUsers.add(user.id);
      return Either.right(user);
    }

    return Either.left(new Error("Failed to login"));
  }

  async logout(userId: string): Promise<Either<Error, boolean>> {
    if (this.loggedInUsers.has(userId)) {
      this.loggedInUsers.delete(userId);
      return Either.right(true);
    }

    return Either.left(new Error("Failed to logout"));
  }
}
