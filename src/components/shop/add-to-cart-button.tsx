"use client";

import { useCart } from "@/components/cart/cart-provider";
import { useTranslations } from "next-intl";
import type { Product } from "@/db/schema";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const t = useTranslations("product");
  const tShop = useTranslations("shop");

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="w-full rounded-md bg-muted py-3 text-sm font-medium text-muted-foreground"
      >
        {tShop("outOfStock")}
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          slug: product.slug,
          nameFr: product.nameFr,
          nameEn: product.nameEn,
          price: product.price,
          image: product.images[0],
          stock: product.stock,
        })
      }
      className="w-full rounded-md bg-primary py-3 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {t("addToCart")}
    </button>
  );
}
