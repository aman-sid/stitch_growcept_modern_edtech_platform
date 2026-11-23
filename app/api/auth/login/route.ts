import { NextRequest, NextResponse } from "next/server";
import { signToken, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    let authenticated = false;
    let userEmail = cleanEmail;

    // 1. Check primary environment / default admin credentials
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
    const configuredAdminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    if (
      cleanEmail === configuredAdminEmail &&
      cleanPassword === configuredAdminPassword
    ) {
      authenticated = true;
      userEmail = configuredAdminEmail;
    } else {
      // 2. Try Supabase Auth if credentials are configured
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { data: supaData, error: supaErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (!supaErr && supaData?.user) {
          authenticated = true;
          userEmail = supaData.user.email || cleanEmail;
        }
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // Sign JWT session token
    const token = await signToken({
      email: userEmail,
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email: userEmail,
        role: "admin",
      },
      message: "Authentication successful.",
    });

    // Set secure HTTP-only cookie
    const isProduction = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error("[Auth API Error] /api/auth/login:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred during authentication." },
      { status: 500 }
    );
  }
}

