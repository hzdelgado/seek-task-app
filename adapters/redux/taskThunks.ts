import { Task } from "@/domain/entities/Task";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";

const simulatedTasks = require('../../data/tasks_data.json');


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (): Promise<Task[]> => {
  return simulatedTasks.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>): Promise<Task> => {
    const newObject = { ...task, id: Math.random().toString() };
    const newTask = plainToInstance(Task, newObject);
    simulatedTasks.push(newTask);
    return newTask;
});