import { Task } from "@/domain/entities/Task";
import { PartialTask, TaskRepository } from "@/domain/ports/TaskRepository";
import { Either } from "@/shared/Either";

export class TaskImplRepository implements TaskRepository {
    getTaskById(taskId: string): Promise<Either<Error, Task>> {
        throw new Error("Method not implemented.");
    }
    getAllTasks(): Promise<Either<Error, Task[]>> {
        throw new Error("Method not implemented.");
    }
    createTask(input: PartialTask): Promise<Either<Error, Task>> {
        throw new Error("Method not implemented.");
    }
    updateTask(input: PartialTask): Promise<Either<Error, Task>> {
        throw new Error("Method not implemented.");
    }
    deleteTask(input: PartialTask): Promise<Either<Error, boolean>> {
        throw new Error("Method not implemented.");
    }
}