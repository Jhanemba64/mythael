import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  paid: "bg-blue-500/10 text-blue-500",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-green-500/10 text-green-500",
};

async function getOrders() {
  try {
    return await db.query.orders.findMany({
      orderBy: [desc(orders.createdAt)],
    });
  } catch {
    return [];
  }
}

export default async function AdminOrdersPage() {
  const allOrders = await getOrders();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-wide text-foreground">
        Orders
      </h1>

      <div className="mt-6 rounded-lg border border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    #{order.id}
                  </Link>
                </TableCell>
                <TableCell className="text-sm">
                  {order.firstName} {order.lastName}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {order.email}
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {order.total} EUR
                </TableCell>
                <TableCell>
                  <Badge
                    className={`text-xs capitalize ${statusColors[order.status] || ""}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
            {allOrders.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  No orders yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
