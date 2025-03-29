import { COOKIE_KEY_ACCESS_TOKEN } from "@/constants/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/solo",
    "/study-goal",
    "/leaderboard",
    "/room",
    "/room/:roomCode",
  ];
  const currentPath = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`)
  );
  if (isProtected) {
    const token = cookies().get(COOKIE_KEY_ACCESS_TOKEN)?.value;
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.nextUrl.origin).toString()
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/solo",
    "/study-goal",
    "/leaderboard",
    "/room",
    "/room/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/privacy-policy",
    "/terms-and-conditions",
  ],
};
