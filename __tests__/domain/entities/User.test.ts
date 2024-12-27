import { User } from "@/domain/entities/User";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

describe('User Entity', () => {
    it('should be valid when all fields are correctly filled', async () => {
        const user = new User('1', 'user@example.com', '1234567');
    
        const errors = await validate(user);
        expect(errors.length).toBe(0);
      });
    
      it('should throw error when id is empty', async () => {
        const user = new User('', 'user@example.com', '123456');
        
        const errors = await validate(user);
    
        expect(errors.length).toBeGreaterThan(0); 
        expect(errors[0].property).toBe('id');
      });
    
      it('should transform user correctly', () => {
        const plainObject = {
          id: '1',
          email: 'user@example.com',
          password: '123456'
        };
    
        const board = plainToInstance(User, plainObject);
    
        expect(board instanceof User).toBe(true);
      });
});