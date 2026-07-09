import { jwtVerify, SignJWT } from "jose";

export const AUTH_COOKIE_NAME = "katha_admin_session";

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET or JWT_SECRET is required for admin authentication.");
  }

  return encoder.encode(secret);
}

export type AdminSession = {
  id: string;
  email: string;
  role: string;
};

export async function createAdminToken(session: AdminSession) {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token?: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());

    if (
      typeof payload.id !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
