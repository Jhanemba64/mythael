import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const maxDuration = 30;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
  maxNetworkRetries: 3,
});

export async function POST(req: NextRequest) {
  try {
    const { items, locale } = await req.json();
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").trim().replace(/\/+$/, "");

    const lineItems = items.map(
      (item: { nameFr: string; nameEn: string; price: string; quantity: number }) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: locale === "fr" ? item.nameFr : item.nameEn,
          },
          unit_amount: Math.round(parseFloat(item.price) * 100),
        },
        quantity: item.quantity,
      })
    );

    console.log("[Checkout API] siteUrl:", siteUrl);
    console.log("[Checkout API] success_url:", `${siteUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: [
          "FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT", "AT",
          "GB", "IE", "US", "CA",
        ],
      },
      success_url: siteUrl + "/" + locale + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: siteUrl + "/" + locale + "/cart",
      metadata: {
        locale,
        itemIds: items.map((i: { id: number }) => i.id).join(","),
      },
    });

    console.log("[Checkout API] session.id:", session.id, "session.url:", session.url);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Checkout API] ERROR:", message);
    return NextResponse.json({ url: null, error: message }, { status: 500 });
  }
}
