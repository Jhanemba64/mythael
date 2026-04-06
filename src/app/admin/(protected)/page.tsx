import { db } from "@/db";
import { products, orders, customers } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

async function getStats() {
  try {
    const [productCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(products);
    const [orderCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(orders);
    const [customerCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(customers);
    const [revenue] = await db
      .select({ total: sql<string>`coalesce(sum(total::numeric), 0)` })
      .from(orders)
      .where(eq(orders.status, "paid"));

    const recentOrders = await db.query.orders.findMany({
      orderBy: [desc(orders.createdAt)],
      limit: 5,
    });

    return {
      products: Number(productCount.count),
      orders: Number(orderCount.count),
      customers: Number(customerCount.count),
      revenue: parseFloat(revenue.total || "0"),
      recentOrders,
    };
  } catch {
    return {
      products: 0,
      orders: 0,
      customers: 0,
      revenue: 0,
      recentOrders: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      title: "Revenue",
      value: `${stats.revenue.toFixed(2)} EUR`,
      icon: DollarSign,
    },
    { title: "Orders", value: stats.orders, icon: ShoppingCart },
    { title: "Products", value: stats.products, icon: Package },
    { title: "Customers", value: stats.customers, icon: Users },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-wide text-foreground">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon }) => (
          <Card key={title} className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="mt-10 text-lg font-medium text-foreground">
        Recent Orders
      </h2>
      {stats.recentOrders.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="mt-4 space-y-2">
          {stats.recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  #{order.id} — {order.firstName} {order.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{order.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">
                  {order.total} EUR
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
