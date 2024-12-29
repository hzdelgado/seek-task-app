import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/domain/entities/Task';
import { addTask, fetchTasks } from './taskThunks';

/**
 * Define el estado del slice de tareas.
 * El estado contiene las tareas, un indicador de carga y un posible mensaje de error.
 */
export interface TaskState {
  tasks: Task[]; // Lista de tareas
  loading: boolean; // Indicador de carga, se usa cuando las tareas están siendo cargadas
  error: string | null; // Mensaje de error si ocurre algún problema durante la operación
}

// Estado inicial de las tareas
const initialState: TaskState = {
  tasks: [], // Comienza con una lista vacía de tareas
  loading: false, // Inicialmente no se está cargando
  error: null, // No hay error inicialmente
};

/**
 * Slice de Redux para manejar el estado de las tareas.
 * Este slice gestiona las operaciones de obtener, agregar, actualizar y eliminar tareas.
 */
const taskSlice = createSlice({
  name: 'tasks', // Nombre del slice, usado en el estado global de Redux
  initialState, // Estado inicial definido anteriormente
  reducers: {
    /**
     * Actualiza una tarea existente en el estado.
     * @param state - El estado actual de las tareas.
     * @param action - Acción que contiene la tarea a actualizar.
     */
    updateTask(state, action: PayloadAction<Task>) {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
  
      if (taskIndex !== -1) {
        const updatedTask = {
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          status: action.payload.status,
        };

        state.tasks[taskIndex] = updatedTask as Task;
      }
    },
    /**
     * Elimina una tarea del estado.
     * @param state - El estado actual de las tareas.
     * @param action - Acción que contiene el id de la tarea a eliminar.
     */
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Caso de carga de tareas (pendiente).
       * Establece el estado de carga a true y borra cualquier error previo.
       */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Caso de tareas cargadas exitosamente (fulfilled).
       * Establece las tareas obtenidas en el estado y cambia el estado de carga a false.
       * @param action - Contiene las tareas obtenidas.
       */
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload ?? [];
      })
      /**
       * Caso de error al cargar tareas (rejected).
       * Establece el estado de carga a false y establece el mensaje de error.
       * @param action - Contiene el mensaje de error.
       */
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching tasks';
      })
      /**
       * Caso de tarea agregada exitosamente (fulfilled).
       * Agrega la tarea al estado de tareas.
       * @param action - Contiene la tarea agregada.
       */
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const taskData = {
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          status: action.payload.status,
        };
        state.tasks.push(taskData as Task);
      })
       /**
       * Caso de error al agregar una tarea (rejected).
       * Establece el mensaje de error en el estado.
       * @param action - Contiene el mensaje de error.
       */
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching tasks';
      });
  },
});
/**
 * Exporta las acciones del slice para su uso en los componentes.
 * Estas acciones permiten actualizar el estado de las tareas.
 */
export const { updateTask, deleteTask } = taskSlice.actions;
/**
 * Exporta el reducer generado por el slice.
 * Este reducer se usa en la configuración de la tienda Redux.
 */
export const taskReducer = taskSlice.reducer;
