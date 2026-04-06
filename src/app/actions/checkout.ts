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
) {
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

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded_page",
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: [
        "FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT", "AT",
        "GB", "IE", "US", "CA",
      ],
    },
    return_url: `${siteUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      locale,
      itemIds: items.map((i) => i.id).join(","),
    },
  });

  return { clientSecret: session.client_secret };
}
