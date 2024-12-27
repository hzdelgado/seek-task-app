import { User } from "@/domain/entities/User";
import { Either } from "@/shared/Either";

export interface UserRepository {
    login(email: string, password: string): Promise<Either<Error, User>>;
    logout(userId: string):Promise<Either<Error, boolean>>;
}