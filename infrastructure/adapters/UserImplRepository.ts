import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/UserRepository";
import { Either } from "@/shared/Either";

export class UserImplRepository implements UserRepository {
  private users: User[] = [];

  constructor() {}

  async findByEmail(email: string): Promise<Either<Error, User>> {
   let newUser = new User('1', email, 'password123');
    return Either.right(newUser);
  }
  
  
  /*async register(user: User): Promise<Either<Error, User>> {
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      return Either.left(new Error("User already exists"));
    }
    user.id = (this.users.length + 1).toString();
    this.users.push(user);
    return Either.right(user);
  }*/
  
}
