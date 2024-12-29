import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada" }, { status: 200 });
  response.cookies.set("auth_token", "", {
    maxAge: -1,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return response;
}
