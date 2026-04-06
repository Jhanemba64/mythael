"use client";

import { useCart } from "@/components/cart/cart-provider";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const t = useTranslations("cart");
  const locale = useLocale();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
        <h1 className="mt-6 font-heading text-2xl tracking-wide text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("empty")}</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-center font-heading text-2xl tracking-wide text-foreground md:text-3xl">
        {t("title")}
      </h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => {
          const name = locale === "fr" ? item.nameFr : item.nameEn;
          return (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border border-border/50 bg-card p-4"
            >
              {/* Image */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl text-muted-foreground/30">
                    &#9670;
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="mt-0.5 text-sm text-primary">
                      {formatPrice(item.price, locale)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Quantity */}
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-[2rem] text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <span className="ml-auto text-sm font-medium text-foreground">
                    {formatPrice(parseFloat(item.price) * item.quantity, locale)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Separator className="my-6" />

      {/* Summary */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("shipping")}</span>
          <span className="text-primary">{t("freeShipping")}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-medium">{t("total")}</span>
          <span className="font-semibold text-primary">
            {formatPrice(totalPrice, locale)}
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex w-full items-center justify-center rounded-md bg-primary py-3 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t("checkout")}
      </Link>
    </div>
  );
}
