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
});