import { Task, TaskStatus } from "@/domain/entities/Task";
import { TaskImplRepository } from "@/infrastructure/adapters/TaskImplRepository";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";

const taskRepository = new TaskImplRepository();

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }): Promise<Task[]> => {
  try {
    const response = await taskRepository.getAllTasks();
    return response.getRight() ?? [];
  } catch(error: any) {
    throw rejectWithValue(error.message);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>, { rejectWithValue }): Promise<Task> => {
  try { 
    const newObject = { ...task, id: Math.random().toString(), status: TaskStatus.TODO };
    const newTask = plainToInstance(Task, newObject);
    return newTask;
  } catch(error: any) {
    throw rejectWithValue(error.message);
  }
});