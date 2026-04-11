import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
import { db } from "@/db";
import { orders, orderItems, products, customers } from "@/db/schema";
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

  // ---------- checkout.session.expired ----------
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(
      `Checkout expired for ${session.customer_details?.email || "unknown"}`
    );
  }

  // ---------- charge.refunded ----------
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    // Update order status if we have a matching payment intent
    if (charge.payment_intent) {
      await db
        .update(orders)
        .set({ status: "refunded" })
        .where(eq(orders.stripePaymentId, charge.payment_intent as string));
    }
  }

  // ---------- charge.dispute.created ----------
  if (event.type === "charge.dispute.created") {
    const dispute = event.data.object as Stripe.Dispute;
    console.error(
      `⚠ Dispute created for charge ${dispute.charge} — amount: ${dispute.amount / 100} EUR`
    );
    // Mark order as disputed if we can match the payment intent
    if (dispute.payment_intent) {
      await db
        .update(orders)
        .set({ status: "disputed" })
        .where(eq(orders.stripePaymentId, dispute.payment_intent as string));
    }
  }

  // ---------- payment_intent.payment_failed ----------
  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;
    console.error(
      `Payment failed for ${intent.id}: ${intent.last_payment_error?.message || "unknown error"}`
    );
  }

  // ---------- checkout.session.completed ----------
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

      // Link order to existing customer account if email matches
      const customerEmail = session.customer_details?.email || "";
      let customerId: number | null = null;
      if (customerEmail) {
        const existingCustomer = await db.query.customers.findFirst({
          where: eq(customers.email, customerEmail),
          columns: { id: true },
        });
        if (existingCustomer) {
          customerId = existingCustomer.id;
        }
      }

      // Create order
      const [order] = await db
        .insert(orders)
        .values({
          customerId,
          stripePaymentId: session.payment_intent as string,
          email: customerEmail,
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

      // Create order items and decrement stock
      for (const entry of itemEntries) {
        const product = await db.query.products.findFirst({
          where: eq(products.id, entry.productId),
        });

        if (!product) continue;

        await db.insert(orderItems).values({
          orderId: order.id,
          productId: entry.productId,
          productName: locale === "fr" ? product.nameFr : product.nameEn,
          quantity: entry.quantity,
          unitPrice: product.price,
        });

        // Atomic stock decrement — prevents race conditions
        await db
          .update(products)
          .set({
            stock: sql`GREATEST(${products.stock} - ${entry.quantity}, 0)`,
          })
          .where(eq(products.id, entry.productId));
      }

      // Send confirmation email
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
      }
    } catch (err) {
      console.error("Failed to process checkout session:", err);
      return NextResponse.json({ error: "Processing failed" }, { status: 200 });
    }
  }

  return NextResponse.json({ received: true });
}
