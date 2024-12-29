import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import TaskCard from "@/components/tasks/TaskCard"; // Ajusta la ruta según tu estructura de proyecto.
import { Task } from "@/domain/entities/Task";

describe("TaskCard Component", () => {
  const mockTask = new Task(
     "1",
    "Task Title",
    "Task Description"
  );

  const onDeleteMock = jest.fn();
  const onEditMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the task details correctly", async () => {
    render(
      <TaskCard task={mockTask} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    waitFor(() => {
        expect(screen.getByText(mockTask.title)).toBeInTheDocument();
        expect(screen.getByText(mockTask.description)).toBeInTheDocument();
        expect(screen.getByText("POR HACER")).toBeInTheDocument();
    });
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TaskCard task={mockTask} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    const deleteButton = screen.getByText("Borrar");
    act(() =>
    fireEvent.click(deleteButton));

    expect(onDeleteMock).toHaveBeenCalledWith(mockTask.id);
  });

  it("enters edit mode when edit button is clicked", () => {
    render(
      <TaskCard task={mockTask} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    const editButton = screen.getByText("Editar");
    act(() => fireEvent.click(editButton));

    expect(screen.getByPlaceholderText("Edita el titulo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Edita la descripción")).toBeInTheDocument();
    expect(screen.getByTestId("select-input")).toBeInTheDocument();
  });

  it("updates the task and exits edit mode on save", async () => {
    render(
      <TaskCard task={mockTask} onDelete={onDeleteMock} onEdit={onEditMock} />
    );
    act(() => fireEvent.click(screen.getByText("Editar")));

    await waitFor(() => {
        const titleInput = screen.getByTestId("title1");
        const descriptionInput = screen.getByTestId("description1");
        const statusSelect = screen.getByTestId("select-input");
        const saveButton = screen.getByText("Guardar");
    
        act(() => {
            fireEvent.change(titleInput, { target: { value: "Updated Title" } });
            fireEvent.change(descriptionInput, { target: { value: "Updated Description" } });
            fireEvent.change(statusSelect, { target: { value: "inProgress" } });
            fireEvent.click(saveButton);
        });
    });
    await waitFor(() => {
      expect(onEditMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Updated Title",
          description: "Updated Description",
          status: "inProgress",
        })
      );
      
    expect(screen.getByDisplayValue("Updated Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Updated Description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("EN PROGRESO")).toBeInTheDocument();
    });
});

  

  it("exits edit mode without saving on cancel", async () => {
    render(
      <TaskCard task={mockTask} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    await waitFor(() => {
        act(() => fireEvent.click(screen.getByText("Editar")));
    });

    act(() => 
        fireEvent.click(screen.getByText("Cancelar")));

    expect(screen.queryByPlaceholderText("Edita el titulo")).not.toBeInTheDocument();
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
  });
});
