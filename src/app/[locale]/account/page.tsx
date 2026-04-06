import { redirect } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getCustomerSession } from "@/lib/auth/customer";
import { db } from "@/db";
import { customers, orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "./logout-button";
import type { Order, Customer } from "@/db/schema";

async function getAccountData() {
  const session = await getCustomerSession();
  if (!session) return null;

  try {
    const customer = await db.query.customers.findFirst({
      where: eq(customers.id, session.customerId),
    });
    if (!customer) return null;

    const customerOrders = await db.query.orders.findMany({
      where: eq(orders.customerId, session.customerId),
      orderBy: [desc(orders.createdAt)],
    });

    return { customer, orders: customerOrders };
  } catch {
    return null;
  }
}

export default async function AccountPage() {
  const data = await getAccountData();

  if (!data) {
    redirect("/account/login");
  }

  return (
    <AccountPageClient customer={data.customer} orders={data.orders} />
  );
}

function AccountPageClient({
  customer,
  orders: customerOrders,
}: {
  customer: Customer;
  orders: Order[];
}) {
  const t = useTranslations("account");
  const tStatus = useTranslations("account.orderStatus");
  const locale = useLocale();

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500",
    paid: "bg-blue-500/10 text-blue-500",
    shipped: "bg-primary/10 text-primary",
    delivered: "bg-green-500/10 text-green-500",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl tracking-wide text-foreground">
          {t("title")}
        </h1>
        <LogoutButton />
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {customer.firstName} {customer.lastName} &middot; {customer.email}
      </p>

      <h2 className="mt-10 font-heading text-lg tracking-wide text-foreground">
        {t("orders")}
      </h2>

      {customerOrders.length === 0 ? (
        <p className="mt-4 text-muted-foreground">{t("noOrders")}</p>
      ) : (
        <div className="mt-4 space-y-3">
          {customerOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  #{order.id}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString(
                    locale === "fr" ? "fr-FR" : "en-US"
                  )}
                </p>
                {order.trackingNumber && (
                  <p className="mt-1 text-xs text-primary">
                    Tracking: {order.trackingNumber}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(order.total, locale)}
                </p>
                <Badge
                  className={`mt-1 text-xs ${statusColors[order.status] || ""}`}
                >
                  {tStatus(order.status as "pending" | "paid" | "shipped" | "delivered")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
