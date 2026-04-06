"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getResend } from "@/lib/resend";
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
        html: `<h2>Your order is on its way!</h2>
               <p>Order <strong>#${orderId}</strong> has been shipped.</p>
               <p>Tracking number: <strong>${trackingNumber}</strong></p>
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
