import bcrypt from "bcryptjs";
import { AuthService } from "@/application/services/AuthService";
import { User } from "@/domain/entities/User";
import { Either } from "@/shared/Either";
import { generateToken } from "@/application/utils/jwtUtils";
import { UserRepository } from "@/domain/ports/UserRepository";

jest.mock("@/domain/ports/UserRepository");
jest.mock("@/application/utils/jwtUtils");

describe("AuthService", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let authService: AuthService;

  beforeEach(() => {
    userRepository = {
        register: jest.fn(),
        findByEmail: jest.fn(),
      } as unknown as jest.Mocked<UserRepository>;
    authService = new AuthService(userRepository);
  });

  describe("registerUser", () => {
    it("should successfully register a user and return a token", async () => {
      const email = "test@example.com";
      const password = "password123";
      const name = "Test User";

      userRepository.register.mockResolvedValue(Either.right(new User("1", email, password)));

      (generateToken as jest.Mock).mockReturnValue("fake-jwt-token");

      const result = await authService.registerUser(email, password, name);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toHaveProperty("token", "fake-jwt-token");
      expect(result.getRight()).toHaveProperty("user");
      expect(result.getRight()?.user.email).toBe(email);
      expect(result.getRight()?.user.password).not.toBe(password); // Verifica que la contraseña esté hasheada
    });

    it("should return an error if registration fails", async () => {
      const email = "test@example.com";
      const password = "password123";
      const name = "Test User";

      userRepository.register.mockResolvedValue(Either.left(new Error("Registration failed")));

      const result = await authService.registerUser(email, password, name);

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toEqual(new Error("Registration failed"));
    });
  });

  describe("loginUser", () => {
    it("should successfully log in a user and return a token", async () => {
      const email = "test@example.com";
      const password = "password123";
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User("1", email, hashedPassword);

      userRepository.findByEmail.mockResolvedValue(Either.right(user));

      (generateToken as jest.Mock).mockReturnValue("fake-jwt-token");

      const result = await authService.loginUser(email, password);

      expect(result.isRight()).toBe(true);
      expect(result.getRight()).toHaveProperty("token", "fake-jwt-token");
      expect(result.getRight()).toHaveProperty("user");
      expect(result.getRight()?.user.email).toBe(email);
    });

    it("should return an error if the email is not found", async () => {
      const email = "test@example.com";
      const password = "password123";

      userRepository.findByEmail.mockResolvedValue(Either.left(new Error("User not found")));

      const result = await authService.loginUser(email, password);

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toEqual(new Error("Invalid email or password"));
    });

    it("should return an error if the password is incorrect", async () => {
      const email = "test@example.com";
      const password = "password123";
      const hashedPassword = await bcrypt.hash("wrongpassword", 10);
      const user = new User("1", email, hashedPassword);

      userRepository.findByEmail.mockResolvedValue(Either.right(user));

      const result = await authService.loginUser(email, password);

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toEqual(new Error("Invalid email or password"));
    });
  });
});
