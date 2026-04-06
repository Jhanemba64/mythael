"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  createCustomerSession,
  deleteCustomerSession,
} from "@/lib/auth/customer";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  locale: z.enum(["fr", "en"]).default("fr"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function registerAction(
  formData: FormData
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    locale: formData.get("locale") || "fr",
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { email, password, firstName, lastName, locale } = parsed.data;

  try {
    // Check if email already exists
    const existing = await db.query.customers.findFirst({
      where: eq(customers.email, email),
    });

    if (existing) {
      return { success: false, error: "Email already registered" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [customer] = await db
      .insert(customers)
      .values({
        email,
        passwordHash,
        firstName,
        lastName,
        locale,
      })
      .returning();

    await createCustomerSession(customer.id);

    return { success: true };
  } catch {
    return { success: false, error: "Registration failed" };
  }
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { email, password } = parsed.data;

  try {
    const customer = await db.query.customers.findFirst({
      where: eq(customers.email, email),
    });

    if (!customer) {
      return { success: false, error: "Invalid credentials" };
    }

    const valid = await bcrypt.compare(password, customer.passwordHash);
    if (!valid) {
      return { success: false, error: "Invalid credentials" };
    }

    await createCustomerSession(customer.id);

    return { success: true };
  } catch {
    return { success: false, error: "Login failed" };
  }
}

export async function logoutAction(): Promise<void> {
  await deleteCustomerSession();
}
