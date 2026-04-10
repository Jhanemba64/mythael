"use server";

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  categoryId: z.coerce.number(),
  slug: z.string().min(1),
  nameFr: z.string().min(1),
  nameEn: z.string().min(1),
  descriptionFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  price: z.string().min(1),
  compareAtPrice: z.string().optional(),
  stock: z.coerce.number().int().min(0),
  supplierUrl: z.string().optional(),
  supplierCost: z.string().optional(),
  featured: z.boolean().default(false),
});

export async function createProductAction(formData: FormData) {
  const parsed = productSchema.safeParse({
    categoryId: formData.get("categoryId"),
    slug: formData.get("slug"),
    nameFr: formData.get("nameFr"),
    nameEn: formData.get("nameEn"),
    descriptionFr: formData.get("descriptionFr"),
    descriptionEn: formData.get("descriptionEn"),
    price: formData.get("price"),
    compareAtPrice: formData.get("compareAtPrice") || undefined,
    stock: formData.get("stock"),
    supplierUrl: formData.get("supplierUrl") || undefined,
    supplierCost: formData.get("supplierCost") || undefined,
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    await db.insert(products).values({
      ...parsed.data,
      supplierUrl: parsed.data.supplierUrl || null,
      supplierCost: parsed.data.supplierCost || null,
      images: [],
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProductAction(id: number, formData: FormData) {
  const parsed = productSchema.safeParse({
    categoryId: formData.get("categoryId"),
    slug: formData.get("slug"),
    nameFr: formData.get("nameFr"),
    nameEn: formData.get("nameEn"),
    descriptionFr: formData.get("descriptionFr"),
    descriptionEn: formData.get("descriptionEn"),
    price: formData.get("price"),
    compareAtPrice: formData.get("compareAtPrice") || undefined,
    stock: formData.get("stock"),
    supplierUrl: formData.get("supplierUrl") || undefined,
    supplierCost: formData.get("supplierCost") || undefined,
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    await db
      .update(products)
      .set({
        ...parsed.data,
        supplierUrl: parsed.data.supplierUrl || null,
        supplierCost: parsed.data.supplierCost || null,
      })
      .where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProductAction(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete product" };
  }
}

export async function updateProductImagesAction(
  id: number,
  images: string[]
) {
  try {
    await db.update(products).set({ images }).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update images" };
  }
}
