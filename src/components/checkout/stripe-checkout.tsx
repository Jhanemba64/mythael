"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCart } from "@/components/cart/cart-provider";
import { useLocale } from "next-intl";
import { createCheckoutSession } from "@/app/actions/checkout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function StripeCheckoutForm() {
  const { items } = useCart();
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const cartItems = items.map((item) => ({
        id: item.id,
        nameFr: item.nameFr,
        nameEn: item.nameEn,
        price: item.price,
        quantity: item.quantity,
      }));

      const result = await createCheckoutSession(cartItems, locale);
      if (!result.clientSecret) {
        throw new Error("No client secret returned");
      }
      return result.clientSecret;
    } catch (err) {
      setError("Payment initialization failed. Please try again.");
      throw err;
    }
  }, [items, locale]);

  if (items.length === 0) {
    return null;
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret }}
    >
      <EmbeddedCheckout className="rounded-lg" />
    </EmbeddedCheckoutProvider>
  );
}
