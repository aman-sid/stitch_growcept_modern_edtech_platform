import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Expire the admin session cookie
  response.cookies.set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

