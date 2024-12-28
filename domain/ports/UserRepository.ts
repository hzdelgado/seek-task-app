import { User } from "@/domain/entities/User";
import { Either } from "@/shared/Either";

export interface UserRepository {
    register(user: Partial<User>): Promise<Either<Error, User>>;
    findByEmail(email: string): Promise<Either<Error, User>>;
}