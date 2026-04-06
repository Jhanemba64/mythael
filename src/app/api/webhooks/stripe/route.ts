import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
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
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Get line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

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
      const customerName = session.customer_details?.name || shipping?.name || "";

      // Create order
      const [order] = await db
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

      // Create order items
      const itemIds = (session.metadata?.itemIds || "").split(",");
      for (let i = 0; i < lineItems.data.length; i++) {
        const li = lineItems.data[i];
        const productId = itemIds[i] ? parseInt(itemIds[i]) : null;

        await db.insert(orderItems).values({
          orderId: order.id,
          productId: productId || undefined,
          productName: li.description || "Product",
          quantity: li.quantity || 1,
          unitPrice: ((li.amount_total || 0) / 100 / (li.quantity || 1)).toFixed(
            2
          ),
        });

        // Decrement stock
        if (productId) {
          const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
          });
          if (product && product.stock > 0) {
            await db
              .update(products)
              .set({ stock: product.stock - (li.quantity || 1) })
              .where(eq(products.id, productId));
          }
        }
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
        // Don't fail the webhook if email fails
      }
    } catch (err) {
      console.error("Failed to process checkout session:", err);
      return NextResponse.json(
        { error: "Processing failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
