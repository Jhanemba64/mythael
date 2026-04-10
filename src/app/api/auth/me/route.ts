import { NextResponse } from "next/server";
import { getCustomerSession } from "@/lib/auth/customer";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const customer = await db.query.customers.findFirst({
      where: eq(customers.id, session.customerId),
      columns: { firstName: true },
    });

    return NextResponse.json({
      authenticated: true,
      firstName: customer?.firstName || "",
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
