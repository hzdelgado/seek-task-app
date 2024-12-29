import { AuthService } from "@/application/services/AuthService";
import { UserImplRepository } from "@/infrastructure/adapters/UserImplRepository";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    try {
      const userRepository = new UserImplRepository();
      const authService = AuthService.getInstance(userRepository);

      const result = await authService.registerUser(email, password, name);
      if (result.isRight()) {
        res.status(201).json(result.getRight());
      } else {
        res.status(401).json(result.getLeft());
      }
    } catch (error) {
      res.status(500).json({ message: "Error during registration", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
