import { Task } from "@/domain/entities/Task";
import { PartialTask, TaskRepository } from "@/domain/ports/TaskRepository";
import { Either } from "@/shared/Either";

const simulatedTasks = require('../../data/tasks_data.json');

export class TaskImplRepository implements TaskRepository {
    getTaskById(taskId: string): Promise<Either<Error, Task>> {
        return Promise.resolve(Either.right(simulatedTasks.data[0]));
    }
    getAllTasks(): Promise<Either<Error, Task[]>> {
        return Promise.resolve(Either.right(simulatedTasks.data));
    }
    createTask(input: PartialTask): Promise<Either<Error, Task>> {
        return Promise.resolve(Either.right(simulatedTasks.data[0]));
    }
    updateTask(input: PartialTask): Promise<Either<Error, Task>> {
        return Promise.resolve(Either.right(simulatedTasks.data[0]));
    }
    deleteTask(input: PartialTask): Promise<Either<Error, boolean>> {
        return Promise.resolve(Either.right(true));
    }
}