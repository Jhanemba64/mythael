import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/db/schema";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const locale = useLocale();
  const t = useTranslations("shop");

  const name = locale === "fr" ? product.nameFr : product.nameEn;
  const price = formatPrice(product.price, locale);
  const comparePrice = product.compareAtPrice
    ? formatPrice(product.compareAtPrice, locale)
    : null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-muted-foreground/30">
            &#9670;
          </div>
        )}

        {/* Stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge
            variant="secondary"
            className="absolute bottom-2 left-2 bg-background/80 text-xs backdrop-blur-sm"
          >
            {t("onlyLeft", { count: product.stock })}
          </Badge>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <span className="text-sm font-medium text-muted-foreground">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-medium leading-tight text-foreground">
          {name}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-sm font-semibold text-primary">{price}</span>
          {comparePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {comparePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
