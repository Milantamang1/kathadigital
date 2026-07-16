import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = await verifyAdminToken(token);

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginRoute && !session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
