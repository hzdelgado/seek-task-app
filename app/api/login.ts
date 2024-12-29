import { AuthService } from "@/application/services/AuthService";
import { UserImplRepository } from "@/infrastructure/adapters/UserImplRepository";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userRepository = new UserImplRepository();
      const authService = AuthService.getInstance(userRepository);
      const result = await authService.loginUser(email, password);
      
      if (result.isRight()) {
        res.status(200).json(result.getRight());
      } else {
        res.status(401).json(result.getLeft());
      }
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
