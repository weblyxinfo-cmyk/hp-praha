import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) {
    throw new Error("JWT_SECRET is not set. Configure it in .env (see .env.example).");
  }
  return s;
}

export interface AdminSession {
  id: string;
  email: string;
}

export function signToken(payload: AdminSession): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, getJwtSecret()) as AdminSession;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
