import { UserImplRepository } from "@/infrastructure/adapters/UserImplRepository";
import { User } from "@/domain/entities/User";
import { plainToInstance } from "class-transformer";

describe("UserImplRepository", () => {
  let userRepository: UserImplRepository;

  beforeEach(() => {
    userRepository = new UserImplRepository();
    const mockUser = new User("1", "test@example.com", "password123");
    userRepository["users"].push(mockUser);
  });

  describe("findByEmail", () => {
    it("should findByEmail successfully with correct credentials", async () => {
      const result = await userRepository.findByEmail("test@example.com");

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual(
        expect.objectContaining({
          id: "1",
          email: "test@example.com",
          password: "password123"
        })
      );
    });

    it("should fail to findByEmail with incorrect credentials", async () => {
      const result = await userRepository.findByEmail("wrong@example.com");

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toBeInstanceOf(Error);
      expect(result.getLeft()?.message).toBe("User not found");
    });
  });

  describe("register", () => {
    it("should register user successfully", async () => {

      const result = await userRepository.register({
        email: "test2@example.com",
        password: "password123"
      } as User);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual({
        id: '2',
        email: "test2@example.com",
        password: "password123"
      } as User);
    });

    it("should fail to register if the user already exists", async () => {
      const result = await userRepository.register({
        email: "test@example.com",
        password: "password123"
      } as User);

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toBeInstanceOf(Error);
      expect(result.getLeft()?.message).toBe("User already exists");
    });
  });
});
