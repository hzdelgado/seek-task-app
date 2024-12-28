import { generateToken, verifyToken } from "@/application/utils/jwtUtils";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("JWT Utility Functions", () => {
  const mockJwtSign = jwt.sign as jest.Mock;
  const mockJwtVerify = jwt.verify as jest.Mock;
  const payload = { userId: "12345" };
  const token = "mocked.jwt.token";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate a token with the correct payload and options", () => {
      mockJwtSign.mockReturnValue(token);

      const result = generateToken(payload);

      expect(mockJwtSign).toHaveBeenCalledWith(payload, "your_secret_key", { expiresIn: "1h" });
      expect(result).toBe(token);
    });

    it("should throw an error if jwt.sign fails", () => {
      const errorMessage = "Failed to generate token";
      mockJwtSign.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => generateToken(payload)).toThrow(errorMessage);
    });
  });

  describe("verifyToken", () => {
    it("should verify a token and return the decoded payload", () => {
      const decodedPayload = { userId: "12345" };
      mockJwtVerify.mockReturnValue(decodedPayload);

      const result = verifyToken(token);

      expect(mockJwtVerify).toHaveBeenCalledWith(token, "your_secret_key");
      expect(result).toBe(decodedPayload);
    });

    it("should throw an error if jwt.verify fails", () => {
      const errorMessage = "Invalid token";
      mockJwtVerify.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => verifyToken(token)).toThrow(errorMessage);
    });
  });
});