"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout.success");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <CheckCircle className="h-16 w-16 text-primary" />
      <h1 className="mt-6 font-heading text-2xl tracking-wide text-foreground md:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("message")}</p>
      <Link
        href="/shop"
        className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t("backToShop")}
      </Link>
    </div>
  );
}
