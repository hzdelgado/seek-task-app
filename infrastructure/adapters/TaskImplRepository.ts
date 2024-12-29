import { Task } from "@/domain/entities/Task";
import { PartialTask, TaskRepository } from "@/domain/ports/TaskRepository";
import { Either } from "@/shared/Either";

const simulatedTasks = require('@/data/tasks.json'); // Carga datos de tareas simuladas desde un archivo JSON

// Implementación concreta del repositorio de tareas, que implementa la interfaz TaskRepository
export class TaskImplRepository implements TaskRepository {
    /**
     * Obtiene una tarea por su ID.
     * @param taskId - El ID de la tarea a obtener.
     * @returns {Promise<Either<Error, Task>>} - Un objeto Either con el resultado, donde la parte derecha es la tarea si existe, o un error en caso contrario.
     */
    getTaskById(taskId: string): Promise<Either<Error, Task>> {
        return Promise.resolve(Either.right(simulatedTasks.data[0]));
    }
    /**
     * Obtiene todas las tareas.
     * @returns {Promise<Either<Error, Task[]>>} - Un objeto Either con el resultado, donde la parte derecha es un arreglo de tareas.
     */
    getAllTasks(): Promise<Either<Error, Task[]>> {
        return Promise.resolve(Either.right(simulatedTasks.data));
    }
    /**
     * Crea una nueva tarea.
     * @param input - Los datos parciales de la tarea a crear.
     * @returns {Promise<Either<Error, Task>>} - Un objeto Either con el resultado, donde la parte derecha es la tarea creada.
     */
    createTask(input: PartialTask): Promise<Either<Error, Task>> {
        return Promise.resolve(Either.right(simulatedTasks.data[0]));
    }
    /**
     * Actualiza una tarea existente.
     * @param input - Los datos parciales de la tarea a actualizar.
     * @returns {Promise<Either<Error, Task>>} - Un objeto Either con el resultado, donde la parte derecha es la tarea actualizada.
     */
    updateTask(input: PartialTask): Promise<Either<Error, Task>> {
        return Promise.resolve(Either.right(simulatedTasks.data[0]));
    }
    /**
     * Elimina una tarea.
     * @param input - Los datos parciales de la tarea a eliminar.
     * @returns {Promise<Either<Error, boolean>>} - Un objeto Either con el resultado, donde la parte derecha es `true` si la tarea fue eliminada correctamente.
     */
    deleteTask(input: PartialTask): Promise<Either<Error, boolean>> {
        return Promise.resolve(Either.right(true));
    }
}