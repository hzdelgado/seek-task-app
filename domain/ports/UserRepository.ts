import { User } from "@/domain/entities/User";
import { Either } from "@/shared/Either";

/**
 * Interfaz que define el contrato para las operaciones relacionadas con
 * los usuarios dentro del sistema. Esta interfaz se utiliza para interactuar
 * con las fuentes de datos que gestionan la persistencia de los usuarios.
 */
export interface UserRepository {
    //register(user: Partial<User>): Promise<Either<Error, User>>;
    findByEmail(email: string): Promise<Either<Error, User>>;
}