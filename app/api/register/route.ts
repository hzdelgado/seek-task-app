import { AuthService } from "@/application/services/AuthService";
import { UserImplRepository } from "@/infrastructure/adapters/UserImplRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  try {
    const userRepository = new UserImplRepository();
    const authService = AuthService.getInstance(userRepository);

    const result = await authService.registerUser(email, password, name);
    if (result.isRight()) {
      return NextResponse.json(result.getRight(), { status: 200 });
    } else {
      return NextResponse.json(result.getLeft(), { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error during registration", error },
      { status: 500 }
    );
  }
}
