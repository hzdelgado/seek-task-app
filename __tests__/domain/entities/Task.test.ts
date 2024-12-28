import { Task, TaskStatus } from "@/domain/entities/Task";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

describe('Task Entity', () => {
    it('should be valid when all fields are correctly filled', async () => {
        const task = new Task('1', 'Test Task 1', 'This is a test');
    
        const errors = await validate(task);
        expect(errors.length).toBe(0);
        expect(task.getStatus()).toBe(TaskStatus.TODO)
      });
    
      it('should throw error when description is empty', async () => {
        const task = new Task('1', 'Test Task 1', '');
        
        const errors = await validate(task);
    
        expect(errors.length).toBeGreaterThan(0); 
        expect(errors[0].property).toBe('description');
      });
    
      it('should transform task correctly', () => {
        const plainObject = {
          id: '1',
          title: 'Test Task 1',
          description: 'This is a description'
        };
    
        const task = plainToInstance(Task, plainObject);
    
        expect(task instanceof Task).toBe(true);
      });

      describe("getDescription", () => {
        it("should return the description of the task", () => {
          const task = new Task("1", "Sample Title", "Sample description");
    
          expect(task.getDescription()).toBe("Sample description");
        });
      });
    
      describe("setDescription", () => {
        it("should update the description if valid", () => {
          const task = new Task("1", "Sample Title", "Sample description");
    
          task.setDescription("This is a valid description");
          expect(task.getDescription()).toBe("This is a valid description");
        });
    
        it("should throw an error if the description is empty", () => {
          const task = new Task("1", "Sample Title", "Sample description");
    
          expect(() => task.setDescription(""))
            .toThrow("La descripción no puede estar vacía");
        });
    
        it("should throw an error if the description has less than 3 words", () => {
          const task = new Task("1", "Sample Title", "Sample description");
    
          expect(() => task.setDescription("Too short"))
            .toThrow("La descripción debe tener como mínimo 3 palabras");
        });
      });
    
      describe("getStatus", () => {
        it("should return the current status of the task", () => {
          const task = new Task("1", "Sample Title", "Sample description");
    
          expect(task.getStatus()).toBe(TaskStatus.TODO);
        });
      });
    
      describe("changeStatus", () => {
        it("should update the status of the task if not DONE", () => {
          const task = new Task("1", "Sample Title", "Sample description");
    
          task.changeStatus(TaskStatus.INPROGRESS);
          expect(task.getStatus()).toBe(TaskStatus.INPROGRESS);
        });
    
        it("should throw an error if attempting to change the status of a DONE task", () => {
          const task = new Task("1", "Sample Title", "Sample description");
          task.changeStatus(TaskStatus.DONE);
    
          expect(() => task.changeStatus(TaskStatus.INPROGRESS))
            .toThrow("No se puede cambiar el estado de una tarea completada");
        });
      });
});