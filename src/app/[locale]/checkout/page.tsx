"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCart } from "@/components/cart/cart-provider";
import { createCheckoutSession } from "@/app/actions/checkout";
import { Link } from "@/i18n/navigation";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const { items, totalPrice } = useCart();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4 text-muted-foreground">{tCart("empty")}</p>
        <Link
          href="/shop"
          className="mt-4 text-sm text-primary hover:underline"
        >
          {tCart("continueShopping")}
        </Link>
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const cartItems = items.map((item) => ({
        id: item.id,
        nameFr: item.nameFr,
        nameEn: item.nameEn,
        price: item.price,
        quantity: item.quantity,
      }));

      const result = await createCheckoutSession(cartItems, locale);

      if (result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error || "Payment initialization failed.");
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment initialization failed.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-8 text-center font-heading text-2xl tracking-wide text-foreground">
        {t("title")}
      </h1>

      {/* Order summary */}
      <div className="space-y-3 rounded-lg border border-border/50 bg-card p-6">
        {items.map((item) => {
          const name = locale === "fr" ? item.nameFr : item.nameEn;
          return (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {name} x{item.quantity}
              </span>
              <span className="text-foreground">
                {formatPrice(parseFloat(item.price) * item.quantity, locale)}
              </span>
            </div>
          );
        })}
        <div className="border-t border-border/50 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{tCart("shipping")}</span>
            <span className="text-primary">{tCart("freeShipping")}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">{tCart("total")}</span>
            <span className="text-lg font-semibold text-primary">
              {formatPrice(totalPrice, locale)}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "..." : tCart("checkout")}
      </button>
    </div>
  );
}
