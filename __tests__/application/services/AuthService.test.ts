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

  describe("getInstance", () => {
    it("should return a new instance of AuthService when called for the first time", () => {
      const instance = AuthService.getInstance(userRepository);
      expect(instance).toBeInstanceOf(AuthService);
    });
  
    it("should return the same instance when called multiple times", () => {
      const firstInstance = AuthService.getInstance(userRepository);
      const secondInstance = AuthService.getInstance(userRepository);
  
      expect(firstInstance).toBe(secondInstance);
      expect(firstInstance).toBeInstanceOf(AuthService);
    });
  
    it("should not create a new instance if one already exists", () => {
      const firstInstance = AuthService.getInstance(userRepository);
  
      const newMockUserRepository = {
        register: jest.fn(),
        findByEmail: jest.fn(),
      } as jest.Mocked<UserRepository>;
      const secondInstance = AuthService.getInstance(newMockUserRepository);
  
      expect(firstInstance).toBe(secondInstance);
      expect(secondInstance).toBeInstanceOf(AuthService);
    });
  });

  describe("loginUser", () => {
    it("should successfully log in a user and return a token", async () => {
      const email = "test@example.com";
      const password = "password123aAA@";
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

    it("should return an error if the password is not valid", async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = new User("1", email, password);

      userRepository.findByEmail.mockResolvedValue(Either.right(user));

      const result = await authService.loginUser(email, password);

      expect(result.isLeft()).toBe(true);
      expect(result.getLeft()).toEqual(new Error("La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."));
    });

  });
});
