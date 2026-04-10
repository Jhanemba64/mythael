import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing stripe signature or webhook secret");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const collected = session.collected_information as {
        shipping_details?: {
          name?: string;
          address?: {
            line1?: string;
            line2?: string;
            city?: string;
            postal_code?: string;
            country?: string;
          };
        };
      } | null;
      const shipping = collected?.shipping_details;
      const address = shipping?.address;
      const locale = session.metadata?.locale || "fr";
      const customerName =
        session.customer_details?.name || shipping?.name || "";

      // Parse item metadata (format: "id:quantity,id:quantity")
      const itemEntries = (session.metadata?.items || "")
        .split(",")
        .filter(Boolean)
        .map((entry) => {
          const [idStr, qtyStr] = entry.split(":");
          return { productId: parseInt(idStr), quantity: parseInt(qtyStr) || 1 };
        });

      // Use a transaction for order creation + stock update
      await db.transaction(async (tx) => {
        // Create order
        const [order] = await tx
          .insert(orders)
          .values({
            stripePaymentId: session.payment_intent as string,
            email: session.customer_details?.email || "",
            firstName: customerName.split(" ")[0] || "",
            lastName: customerName.split(" ").slice(1).join(" ") || "",
            addressLine1: address?.line1 || "",
            addressLine2: address?.line2 || null,
            city: address?.city || "",
            postalCode: address?.postal_code || "",
            country: address?.country || "",
            total: ((session.amount_total || 0) / 100).toFixed(2),
            status: "paid",
          })
          .returning();

        // Create order items and decrement stock atomically
        for (const entry of itemEntries) {
          // Fetch product for name and price
          const product = await tx.query.products.findFirst({
            where: eq(products.id, entry.productId),
          });

          if (!product) continue;

          await tx.insert(orderItems).values({
            orderId: order.id,
            productId: entry.productId,
            productName:
              locale === "fr" ? product.nameFr : product.nameEn,
            quantity: entry.quantity,
            unitPrice: product.price,
          });

          // Atomic stock decrement — prevents race conditions
          await tx
            .update(products)
            .set({
              stock: sql`GREATEST(${products.stock} - ${entry.quantity}, 0)`,
            })
            .where(eq(products.id, entry.productId));
        }

        // Send confirmation email (outside transaction concern)
        try {
          const resend = getResend();
          const orderTotal = ((session.amount_total || 0) / 100).toFixed(2);
          const customerEmail = session.customer_details?.email;

          if (customerEmail) {
            const isEn = locale === "en";
            await resend.emails.send({
              from: "Mythael <orders@mythael.com>",
              to: customerEmail,
              subject: isEn
                ? `Order Confirmed — #${order.id}`
                : `Commande Confirmee — #${order.id}`,
              html: isEn
                ? `<h2>Thank you for your order!</h2>
                   <p>Your order <strong>#${order.id}</strong> has been confirmed.</p>
                   <p>Total: <strong>${orderTotal} EUR</strong></p>
                   <p>You will receive a tracking email once your order ships.</p>
                   <br/>
                   <p><em>— The Mythael Team</em></p>`
                : `<h2>Merci pour votre commande !</h2>
                   <p>Votre commande <strong>#${order.id}</strong> a ete confirmee.</p>
                   <p>Total : <strong>${orderTotal} EUR</strong></p>
                   <p>Vous recevrez un email de suivi des que votre commande sera expediee.</p>
                   <br/>
                   <p><em>— L'equipe Mythael</em></p>`,
            });
          }
        } catch (emailErr) {
          console.error("Failed to send confirmation email:", emailErr);
          // Don't fail the webhook if email fails
        }
      });
    } catch (err) {
      console.error("Failed to process checkout session:", err);
      // Return 200 to prevent Stripe from retrying endlessly on DB errors
      // The payment succeeded — log the error for manual investigation
      return NextResponse.json({ error: "Processing failed" }, { status: 200 });
    }
  }

  return NextResponse.json({ received: true });
}
