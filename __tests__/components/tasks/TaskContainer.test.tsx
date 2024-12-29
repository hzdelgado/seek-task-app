import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import TaskContainer from "@/components/tasks/TaskContainer";
import { addTask } from "@/infrastructure/adapters/redux/taskThunks";
import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, TaskState } from '@/infrastructure/adapters/redux/taskSlice';
import { Task } from "@/domain/entities/Task";

jest.mock("@/infrastructure/adapters/redux/taskThunks", () => ({
    addTask: jest.fn(),
    fetchTasks: jest.fn(),
}));

interface MockRootState {
    tasks: TaskState;
}

const renderWithStore = (initialState: MockRootState) => {
    const store = configureStore({
      reducer: {
        tasks: taskReducer,
      },
      preloadedState: initialState,
    });
  
    return render(
      <Provider store={store}>
        <TaskContainer />
      </Provider>
    );
  };

  describe.skip("TaskContainer with modern store mock", () => {
    it("renders tasks and allows adding new tasks", async () => {
      const initialState: MockRootState = {
        tasks: {
          tasks: [
            { id: "1", title: "Task 1", description: "Description 1" } as Task,
          ],
          loading: false,
          error: null,
        },
      };
  
      renderWithStore(initialState);

      await waitFor(() => {
        expect(screen.getByText("Task 1")).toBeInTheDocument();
      });
  
      const titleInput = screen.getByTestId("title");
      const descriptionInput = screen.getByTestId("description");
      const addButton = screen.getByText(/agregar/i);
  
      fireEvent.change(titleInput, { target: { value: "New Task" } });
      fireEvent.change(descriptionInput, { target: { value: "New Description" } });
      fireEvent.click(addButton);
  
      await waitFor(() => {
        expect(addTask).toHaveBeenCalledWith({
          title: "New Task",
          description: "New Description",
        });
      });
    });
  });
