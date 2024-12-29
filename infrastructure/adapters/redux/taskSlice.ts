import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '@/domain/entities/Task';
import { addTask, fetchTasks } from './taskThunks';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        
        if (task) {
          (task as Task).changeStatus(action.payload.status);
        }
      },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload ?? [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Omit<Task, 'id'>>) => {
        let newTask = action.payload as Task;
        state.tasks.push(newTask);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching tasks';
      });
  },
});

export const { updateTask, deleteTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
