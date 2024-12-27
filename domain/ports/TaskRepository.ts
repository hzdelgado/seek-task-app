// domain/ports/TaskRepository.ts
import { Task } from '@/domain/entities/Task';
import { Either } from "@/shared/Either";

export type PartialTask = Partial<Task>;

export interface TaskRepository {
  getTaskById(taskId: string): Promise<Either<Error, Task>>;
  getAllTasks(filter: any, limit: number): Promise<Either<Error, Task[]>>;
  createTask(input: PartialTask): Promise<Either<Error, Task>>;
  updateTask(input: PartialTask): Promise<Either<Error, Task>>;
  deleteTask(input: PartialTask): Promise<Either<Error, boolean>>;
}
