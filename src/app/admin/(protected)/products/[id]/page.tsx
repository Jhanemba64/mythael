import { notFound } from "next/navigation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductForm } from "../product-form";
import { DeleteProductButton } from "./delete-button";
import { ImageUploader } from "./image-uploader";

type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: number) {
  try {
    return await db.query.products.findFirst({
      where: eq(products.id, id),
    });
  } catch {
    return null;
  }
}

async function getCategories() {
  try {
    return await db.query.categories.findMany();
  } catch {
    return [];
  }
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id);
  const [product, categories] = await Promise.all([
    getProduct(productId),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl tracking-wide text-foreground">
          Edit: {product.nameEn}
        </h1>
        <DeleteProductButton id={product.id} />
      </div>

      {/* Image uploader */}
      <div className="mt-6">
        <ImageUploader productId={product.id} images={product.images} />
      </div>

      <div className="mt-8">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
