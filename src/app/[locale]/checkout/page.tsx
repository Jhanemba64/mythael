"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart/cart-provider";
import { StripeCheckoutForm } from "@/components/checkout/stripe-checkout";
import { Link } from "@/i18n/navigation";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const { items } = useCart();

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

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-center font-heading text-2xl tracking-wide text-foreground">
        {t("title")}
      </h1>
      <StripeCheckoutForm />
    </div>
  );
}
