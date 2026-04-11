import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "mythael-session";
const jwtSecret = process.env.ADMIN_JWT_SECRET;
if (!jwtSecret) {
  throw new Error("ADMIN_JWT_SECRET environment variable is required");
}
const secret = new TextEncoder().encode(jwtSecret);

export async function createCustomerSession(customerId: number) {
  const token = await new SignJWT({ customerId, role: "customer" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function getCustomerSession(): Promise<{
  customerId: number;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return { customerId: payload.customerId as number };
  } catch {
    return null;
  }
}

export async function deleteCustomerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
