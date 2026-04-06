import { db } from "@/db";
import { ProductForm } from "../product-form";

async function getCategories() {
  try {
    return await db.query.categories.findMany();
  } catch {
    return [];
  }
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-wide text-foreground">
        New Product
      </h1>
      <div className="mt-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
