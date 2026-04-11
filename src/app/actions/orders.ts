"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getResend } from "@/lib/resend";
import { getStripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export async function markShippedAction(
  orderId: number,
  trackingNumber: string
) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    await db
      .update(orders)
      .set({
        status: "shipped",
        trackingNumber,
        shippedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    // Send tracking email
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Mythael <orders@mythael.com>",
        to: order.email,
        subject: `Your order #${orderId} has shipped!`,
        html: `<h2>Votre commande est en route ! / Your order is on its way!</h2>
               <p>Commande <strong>#${orderId}</strong> expédiée. / Order <strong>#${orderId}</strong> has been shipped.</p>
               <p>Suivez votre colis / Track your package:<br/>
               <a href="https://t.17track.net/fr#nums=${trackingNumber}" style="color:#D4AF37;font-weight:bold;">${trackingNumber} — Suivre mon colis / Track my order &rarr;</a></p>
               <br/>
               <p><em>— The Mythael Team</em></p>`,
      });
    } catch (emailErr) {
      console.error("Failed to send shipping email:", emailErr);
    }

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update order" };
  }
}

export async function refundOrderAction(orderId: number) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    if (!order.stripePaymentId) {
      return { success: false, error: "No Stripe payment found for this order" };
    }

    if (order.status === "refunded") {
      return { success: false, error: "Order already refunded" };
    }

    // Full refund via Stripe
    const stripe = getStripe();
    await stripe.refunds.create({
      payment_intent: order.stripePaymentId,
    });

    // Update order status
    await db
      .update(orders)
      .set({ status: "refunded" })
      .where(eq(orders.id, orderId));

    // Notify customer
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Mythael <orders@mythael.com>",
        to: order.email,
        subject: `Remboursement commande #${orderId} / Refund order #${orderId}`,
        html: `<h2>Votre commande a ete remboursee / Your order has been refunded</h2>
               <p>La commande <strong>#${orderId}</strong> a ete remboursee integralement.
               Le montant de <strong>${order.total} EUR</strong> sera recredite sous 5 a 10 jours ouvrables.</p>
               <hr/>
               <p>Order <strong>#${orderId}</strong> has been fully refunded.
               The amount of <strong>${order.total} EUR</strong> will be credited back within 5 to 10 business days.</p>
               <br/>
               <p><em>— The Mythael Team</em></p>`,
      });
    } catch (emailErr) {
      console.error("Failed to send refund email:", emailErr);
    }

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Refund failed";
    console.error("Refund error:", message);
    return { success: false, error: message };
  }
}
