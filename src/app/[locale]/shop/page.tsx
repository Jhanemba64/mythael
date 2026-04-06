import { useTranslations, useLocale } from "next-intl";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductCard } from "@/components/shop/product-card";
import { CategoryFilter } from "@/components/shop/category-filter";
import type { Product, Category } from "@/db/schema";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

async function getProducts(categorySlug?: string) {
  try {
    const allCategories = await db.query.categories.findMany();
    let productList: Product[];

    if (categorySlug) {
      const cat = allCategories.find((c) => c.slug === categorySlug);
      if (cat) {
        productList = await db.query.products.findMany({
          where: eq(products.categoryId, cat.id),
        });
      } else {
        productList = await db.query.products.findMany();
      }
    } else {
      productList = await db.query.products.findMany();
    }

    return { categories: allCategories, products: productList };
  } catch {
    return { categories: [] as Category[], products: [] as Product[] };
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const data = await getProducts(category);

  return <ShopPageClient data={data} activeCategory={category} />;
}

function ShopPageClient({
  data,
  activeCategory,
}: {
  data: { categories: Category[]; products: Product[] };
  activeCategory?: string;
}) {
  const t = useTranslations("shop");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-center font-heading text-3xl tracking-wide text-foreground md:text-4xl">
        {t("title")}
      </h1>

      {/* Filters */}
      <div className="mt-8 flex justify-center">
        <CategoryFilter
          categories={data.categories}
          activeSlug={activeCategory}
        />
      </div>

      {/* Products grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data.products.length === 0 && (
        <p className="mt-20 text-center text-muted-foreground">
          {t("allCategories")}
        </p>
      )}
    </div>
  );
}
