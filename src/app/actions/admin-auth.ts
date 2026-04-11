"use server";

import { createAdminSession, deleteAdminSession } from "@/lib/auth/admin";
import { timingSafeEqual } from "crypto";

// Simple in-memory rate limiter for admin login
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function adminLoginAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  // Rate limiting by a fixed key (single admin)
  const key = "admin-login";
  const now = Date.now();
  const attempts = loginAttempts.get(key);

  if (attempts && now < attempts.resetAt && attempts.count >= MAX_ATTEMPTS) {
    return { success: false, error: "Too many attempts. Try again later." };
  }

  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password || !adminPassword) {
    return { success: false, error: "Invalid password" };
  }

  // Timing-safe comparison to prevent timing attacks
  const passwordBuffer = Buffer.from(password);
  const adminBuffer = Buffer.from(adminPassword);
  const isValid =
    passwordBuffer.length === adminBuffer.length &&
    timingSafeEqual(passwordBuffer, adminBuffer);

  if (!isValid) {
    // Track failed attempt
    if (!attempts || now >= attempts.resetAt) {
      loginAttempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      attempts.count++;
    }
    return { success: false, error: "Invalid password" };
  }

  // Reset attempts on success
  loginAttempts.delete(key);

  await createAdminSession();
  return { success: true };
}

export async function adminLogoutAction() {
  await deleteAdminSession();
}
