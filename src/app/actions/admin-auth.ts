"use server";

import { createAdminSession, deleteAdminSession } from "@/lib/auth/admin";

export async function adminLoginAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const password = formData.get("password") as string;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "Invalid password" };
  }

  await createAdminSession();
  return { success: true };
}

export async function adminLogoutAction() {
  await deleteAdminSession();
}
