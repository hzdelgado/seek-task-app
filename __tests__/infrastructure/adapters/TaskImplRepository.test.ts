import { TaskImplRepository } from "@/infrastructure/adapters/TaskImplRepository";
import simulatedTasks from "@/data/tasks.json";
import { Task } from "@/domain/entities/Task";
import { plainToInstance } from "class-transformer";

describe("TaskImplRepository", () => {
  let repository: TaskImplRepository;

  beforeEach(() => {
    repository = new TaskImplRepository();
  });

  describe("getTaskById", () => {
    it("should return the task with the given ID", async () => {
      const taskId = simulatedTasks.data[0].id;
      const result = await repository.getTaskById(taskId);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual(simulatedTasks.data[0]);
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks", async () => {
      const result = await repository.getAllTasks();

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual(simulatedTasks.data);
    });
  });

  describe("createTask", () => {
    it("should create a new task and return it", async () => {
      const newTask = plainToInstance(Task, { title: "New Task", description: "Description of new task" });
      const result = await repository.createTask(newTask);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual(simulatedTasks.data[0]);
    });
  });

  describe("updateTask", () => {
    it("should update the task and return the updated task", async () => {
      const updatedTask = { id: simulatedTasks.data[0].id, title: "Updated Title" };
      const result = await repository.updateTask(updatedTask);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual(simulatedTasks.data[0]);
    });
  });

  describe("deleteTask", () => {
    it("should delete the task and return true", async () => {
      const taskToDelete = { id: simulatedTasks.data[0].id };
      const result = await repository.deleteTask(taskToDelete);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toBe(true);
    });
  });
});
