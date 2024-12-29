import { Task, TaskStatus } from "@/domain/entities/Task";
import { TaskImplRepository } from "@/infrastructure/adapters/TaskImplRepository";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";

// Crea una instancia del repositorio de tareas para interactuar con los datos de las tareas
const taskRepository = new TaskImplRepository();

/**
 * `fetchTasks` es un thunk asíncrono que obtiene todas las tareas.
 * Se utiliza para cargar las tareas desde el repositorio en el estado de Redux.
 * @returns {Promise<Task[]>} - Una lista de tareas.
 */
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }): Promise<Task[]> => {
  try {
    const response = await taskRepository.getAllTasks();
    return response.getRight() ?? [];
  } catch(error: any) {
    throw rejectWithValue(error.message);
  }
});

/**
 * `addTask` es un thunk asíncrono que agrega una nueva tarea.
 * Se utiliza para agregar una tarea al repositorio y devolverla en el estado de Redux.
 * @param task - La tarea a agregar, sin el campo `id` (lo genera en el thunk).
 * @returns {Promise<Task>} - La nueva tarea agregada con un `id` generado aleatoriamente y el estado `TODO`.
 */
export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>, { rejectWithValue }): Promise<Task> => {
  try { 
    const newObject = { ...task, id: Math.random().toString(), status: TaskStatus.TODO };
    const newTask = plainToInstance(Task, newObject);
    return newTask;
  } catch(error: any) {
    throw rejectWithValue(error.message);
  }
});