import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { StockBadge } from "@/components/shared/stock-badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import type { Product } from "@/db/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  try {
    return await db.query.products.findFirst({
      where: eq(products.slug, slug),
    });
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

function ProductPageClient({ product }: { product: Product }) {
  const t = useTranslations("product");
  const tShop = useTranslations("shop");
  const locale = useLocale();

  const name = locale === "fr" ? product.nameFr : product.nameEn;
  const description =
    locale === "fr" ? product.descriptionFr : product.descriptionEn;
  const price = formatPrice(product.price, locale);
  const comparePrice = product.compareAtPrice
    ? formatPrice(product.compareAtPrice, locale)
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Back link */}
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {tShop("title")}
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-lg border border-border/50 bg-secondary">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl text-muted-foreground/20">
              &#9670;
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="font-heading text-2xl tracking-wide text-foreground md:text-3xl">
            {name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold text-primary">{price}</span>
            {comparePrice && (
              <span className="text-lg text-muted-foreground line-through">
                {comparePrice}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3">
            <StockBadge stock={product.stock} />
          </div>

          {/* Add to cart */}
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          {/* Handmade notice */}
          <div className="mt-4 flex items-start gap-2 rounded-md border border-border/50 bg-card/50 p-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("handmadeNotice")}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Description */}
          <div>
            <h2 className="mb-3 text-sm font-medium tracking-wide text-foreground">
              {t("description")}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
