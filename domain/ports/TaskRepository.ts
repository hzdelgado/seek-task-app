// domain/ports/TaskRepository.ts
import { Task } from '@/domain/entities/Task';
import { Either } from "@/shared/Either";

/**
 * Representa un tipo parcial de `Task`, permitiendo que las propiedades
 * sean opcionales. Esto se utiliza en operaciones que solo modifican
 * o crean parcialmente una tarea.
 */
export type PartialTask = Partial<Task>;

/**
 * Interfaz que define el contrato para las operaciones relacionadas con
 * las tareas dentro del sistema. Esta interfaz se encuentra en el dominio
 * de la aplicación y es utilizada por los adaptadores para interactuar con
 * la fuente de datos, ya sea una base de datos, API, o cualquier otro mecanismo
 * de persistencia.
 */
export interface TaskRepository {
  getTaskById(taskId: string): Promise<Either<Error, Task>>;
  getAllTasks(filter: any, limit: number): Promise<Either<Error, Task[]>>;
  createTask(input: PartialTask): Promise<Either<Error, Task>>;
  updateTask(input: PartialTask): Promise<Either<Error, Task>>;
  deleteTask(input: PartialTask): Promise<Either<Error, boolean>>;
}
