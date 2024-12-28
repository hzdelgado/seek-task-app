import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/UserRepository";
import { Either } from "@/shared/Either";

export class UserImplRepository implements UserRepository {
  private users: User[] = [];

  constructor() {}

  async findByEmail(email: string): Promise<Either<Error, User>> {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return Either.left(new Error("User not found"));
    }
    return Either.right(user);
  }
  
  async register(user: User): Promise<Either<Error, User>> {
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      return Either.left(new Error("User already exists"));
    }
    this.users.push(user);
    return Either.right(user);
  }

  
}
