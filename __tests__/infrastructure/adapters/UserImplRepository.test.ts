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

  });

});
