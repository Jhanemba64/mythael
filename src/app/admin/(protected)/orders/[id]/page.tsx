import { notFound } from "next/navigation";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShipOrderForm } from "./ship-form";
import { RefundOrderForm } from "./refund-form";

type Props = {
  params: Promise<{ id: string }>;
};

async function getOrder(id: number) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, id),
      with: { items: { with: { product: true } } },
    });
    return order;
  } catch {
    return null;
  }
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  paid: "bg-blue-500/10 text-blue-500",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-green-500/10 text-green-500",
  refunded: "bg-red-500/10 text-red-500",
};

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrder(parseInt(id));

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4">
        <h1 className="font-heading text-2xl tracking-wide text-foreground">
          Order #{order.id}
        </h1>
        <Badge
          className={`capitalize ${statusColors[order.status] || ""}`}
        >
          {order.status}
        </Badge>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <Separator className="my-6" />

      {/* Customer info */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-foreground">Customer</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.firstName} {order.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{order.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Shipping Address
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.addressLine1}
          </p>
          {order.addressLine2 && (
            <p className="text-sm text-muted-foreground">
              {order.addressLine2}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {order.postalCode} {order.city}, {order.country}
          </p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Items */}
      <h3 className="text-sm font-medium text-foreground">Items</h3>
      <div className="mt-3 space-y-2">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="rounded-md border border-border/50 bg-card px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.productName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                {(parseFloat(item.unitPrice) * item.quantity).toFixed(2)} EUR
              </p>
            </div>
            {item.product?.supplierUrl && (
              <div className="mt-2 flex items-center gap-3 border-t border-border/30 pt-2">
                <a
                  href={item.product.supplierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Order on AliExpress &rarr;
                </a>
                {item.product.supplierCost && (
                  <span className="text-xs text-muted-foreground">
                    Cost: {item.product.supplierCost} EUR &middot; Margin: {(parseFloat(item.unitPrice) - parseFloat(item.product.supplierCost)).toFixed(2)} EUR
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <p className="text-lg font-semibold text-primary">
          Total: {order.total} EUR
        </p>
      </div>

      {/* Tracking */}
      {order.trackingNumber && (
        <>
          <Separator className="my-6" />
          <div>
            <h3 className="text-sm font-medium text-foreground">Tracking</h3>
            <p className="mt-1 text-sm text-primary">{order.trackingNumber}</p>
            {order.shippedAt && (
              <p className="text-xs text-muted-foreground">
                Shipped: {new Date(order.shippedAt).toLocaleString()}
              </p>
            )}
          </div>
        </>
      )}

      {/* Ship action */}
      {order.status === "paid" && (
        <>
          <Separator className="my-6" />
          <ShipOrderForm orderId={order.id} />
        </>
      )}

      {/* Refund action — available for paid and shipped orders */}
      {(order.status === "paid" || order.status === "shipped") && (
        <>
          <Separator className="my-6" />
          <RefundOrderForm orderId={order.id} />
        </>
      )}
    </div>
  );
}
