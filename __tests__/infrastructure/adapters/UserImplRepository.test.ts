import { UserImplRepository } from "@/infrastructure/adapters/UserImplRepository";
import { User } from "@/domain/entities/User";
import { Either } from "@/shared/Either";

describe("UserImplRepository", () => {
  let userRepository: UserImplRepository;

  beforeEach(() => {
    userRepository = new UserImplRepository();
    const mockUser = new User("1", "test@example.com", "password123");
    userRepository["users"].push(mockUser);
  });

  describe("login", () => {
    it("should login successfully with correct credentials", async () => {
      const result = await userRepository.login("test@example.com", "password123");

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toEqual(
        expect.objectContaining({
          id: "1",
          email: "test@example.com",
          password: "password123",
        })
      );
    });

    it("should fail to login with incorrect credentials", async () => {
      const result = await userRepository.login("wrong@example.com", "password123");

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toBeInstanceOf(Error);
      expect(result.getLeft()?.message).toBe("Failed to login");
    });
  });

  describe("logout", () => {
    it("should logout successfully if the user is logged in", async () => {
      // Simula un login previo
      await userRepository.login("test@example.com", "password123");

      const result = await userRepository.logout("1");

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toBe(true);
    });

    it("should fail to logout if the user is not logged in", async () => {
      const result = await userRepository.logout("1");

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toBeInstanceOf(Error);
      expect(result.getLeft()?.message).toBe("Failed to logout");
    });
  });
});
