import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import { ApiError } from "./api";

export async function requireAdminSession() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  const session = await verifyAdminToken(token);

  if (!session) {
    throw new ApiError(401, "UNAUTHORIZED", "Admin authentication is required.");
  }

  if (session.role !== "admin") {
    throw new ApiError(403, "FORBIDDEN", "Admin authorization is required.");
  }

  return session;
}

export async function authorizeCmsWrite() {
  return requireAdminSession();
}
