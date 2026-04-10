import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/db";
import { products } from "@/db/schema";
import { inArray } from "drizzle-orm";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { items, locale } = await req.json();

    // Validate input shape
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ url: null, error: "Invalid cart" }, { status: 400 });
    }

    // Extract IDs and quantities from the client — NEVER trust prices
    const cartEntries: { id: number; quantity: number }[] = [];
    for (const item of items) {
      const id = Number(item.id);
      const quantity = Number(item.quantity);
      if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json({ url: null, error: "Invalid item data" }, { status: 400 });
      }
      cartEntries.push({ id, quantity });
    }

    // Fetch real product data from database
    const productIds = cartEntries.map((e) => e.id);
    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    // Verify all products exist
    if (dbProducts.length !== productIds.length) {
      return NextResponse.json({ url: null, error: "Some products not found" }, { status: 400 });
    }

    // Build line items with DB prices and check stock
    const productMap = new Map(dbProducts.map((p) => [p.id, p]));
    const lineItems = [];

    for (const entry of cartEntries) {
      const product = productMap.get(entry.id)!;

      // Check stock
      if (product.stock < entry.quantity) {
        const name = locale === "fr" ? product.nameFr : product.nameEn;
        return NextResponse.json(
          { url: null, error: `Stock insuffisant pour "${name}"` },
          { status: 400 }
        );
      }

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: locale === "fr" ? product.nameFr : product.nameEn,
          },
          // Price from database, NOT from client
          unit_amount: Math.round(parseFloat(product.price) * 100),
        },
        quantity: entry.quantity,
      });
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
      .trim()
      .replace(/\/+$/, "");

    const stripe = getStripe();
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
        // Store id:quantity pairs for the webhook
        items: cartEntries.map((e) => `${e.id}:${e.quantity}`).join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Checkout API] ERROR:", message);
    return NextResponse.json({ url: null, error: message }, { status: 500 });
  }
}
