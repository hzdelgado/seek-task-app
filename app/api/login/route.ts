import { AuthService } from "@/application/services/AuthService";
import { UserImplRepository } from "@/infrastructure/adapters/UserImplRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

    try {
      const userRepository = new UserImplRepository();
      const authService = AuthService.getInstance(userRepository);
      const result = await authService.loginUser(email, password);
      
      if (result.isRight()) {
        return NextResponse.json(result.getRight(), { status: 200 });
      } else {
        const errorResponse = { message: result.getLeft()?.message };
        return NextResponse.json(errorResponse, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ message: "Error during login", error }, { status: 500 });
    }
}
