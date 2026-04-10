"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout.success");
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "verified" | "failed">(
    sessionId ? "loading" : "failed"
  );

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setStatus("verified");
          clearCart();
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [sessionId, clearCart]);

  if (status === "loading") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h1 className="mt-6 font-heading text-2xl tracking-wide text-foreground md:text-3xl">
          {t("errorTitle")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("errorMessage")}</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("backToShop")}
        </Link>
      </div>
    );
  }

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
