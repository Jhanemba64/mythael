"use server";

import { getStripe } from "@/lib/stripe";

type CartItem = {
  id: number;
  nameFr: string;
  nameEn: string;
  price: string;
  quantity: number;
};

export async function createCheckoutSession(
  items: CartItem[],
  locale: string
): Promise<{ url: string | null; error?: string }> {
  try {
    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: locale === "fr" ? item.nameFr : item.nameEn,
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    console.log("[Checkout] Creating session with", lineItems.length, "items");
    console.log("[Checkout] Return URL:", `${siteUrl}/${locale}/checkout/success`);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: [
          "FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT", "AT",
          "GB", "IE", "US", "CA",
        ],
      },
      success_url: `${siteUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${locale}/cart`,
      metadata: {
        locale,
        itemIds: items.map((i) => i.id).join(","),
      },
    });

    console.log("[Checkout] Session created:", session.id);
    return { url: session.url };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Checkout] ERROR:", message);
    return { url: null, error: message };
  }
}
