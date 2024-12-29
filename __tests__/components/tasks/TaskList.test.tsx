import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { Task } from "@/domain/entities/Task";
import TaskList from "@/components/tasks/TaskList";

describe("TaskList", () => {
  const tasks: Task[] = [
    { id: "1", title: "Task 1", description: "Description 1" } as Task,
    { id: "2", title: "Task 2", description: "Description 2" } as Task,
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("should render a list of tasks", () => {
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });

  it("should update to edit mode view when the edit button is clicked", async () => {
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    const editButton = (await screen.findAllByText(/Editar/i))[0]; 
    act(() => fireEvent.click(editButton));

    await waitFor(() => {
        expect(screen.getByTestId('title1')).toBeInTheDocument();
        expect(screen.getByTestId('description1')).toBeInTheDocument();
        expect(screen.getByTestId('select-input')).toBeInTheDocument();
    });
  });

  it("should call onDelete when the delete button is clicked", async () => {
    render(<TaskList tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    await waitFor(() => {
        const deleteButton = screen.getAllByText(/Borrar/i)[0]
        act(() => fireEvent.click(deleteButton));
    });
    
    await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledWith(tasks[0].id);
        expect(mockOnDelete).toHaveBeenCalledTimes(1)
    });
  });
});
