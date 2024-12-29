import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './taskSlice';

/**
 * Configura la tienda de Redux utilizando `@reduxjs/toolkit` para gestionar el estado de la aplicación.
 * La tienda contiene un `reducer` que maneja el estado de las tareas y aplica middleware 
 * para la comprobación de la serialización de los datos.
 * 
 * @see [Redux Toolkit Docs](https://redux-toolkit.js.org/) para más detalles.
 */
export const store = configureStore({
  /**
   * Reducer que maneja el estado global de las tareas.
   * Aquí, el reducer para las tareas es proporcionado desde `taskSlice`.
   */
  reducer: {
    tasks: taskReducer,
  },
   /**
   * Middleware predeterminado con configuración para desactivar la verificación de serialización.
   * Esto puede ser útil si estamos manejando datos que no son completamente serializables.
   * 
   * @param getDefaultMiddleware - Middleware por defecto de Redux Toolkit.
   * @returns La configuración de middleware modificada.
   */
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

/**
 * El tipo `RootState` es inferido a partir del estado de la tienda.
 * Se utiliza para acceder al estado global de la aplicación en los componentes de Redux.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * El tipo `AppDispatch` es el tipo de la función `dispatch` proporcionada por Redux.
 * Se usa para enviar acciones a la tienda de Redux.
 */
export type AppDispatch = typeof store.dispatch;