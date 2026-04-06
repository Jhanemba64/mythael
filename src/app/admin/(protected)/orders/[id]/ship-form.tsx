"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markShippedAction } from "@/app/actions/orders";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export function ShipOrderForm({ orderId }: { orderId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const trackingNumber = formData.get("trackingNumber") as string;

    const result = await markShippedAction(orderId, trackingNumber);

    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || "Error");
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">Mark as Shipped</h3>
      <form onSubmit={handleSubmit} className="mt-3 flex items-end gap-3">
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <div className="flex-1 space-y-2">
          <Label htmlFor="trackingNumber">Tracking Number</Label>
          <Input
            id="trackingNumber"
            name="trackingNumber"
            required
            placeholder="e.g. LP123456789CN"
            className="bg-card"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Truck className="mr-2 h-4 w-4" />
          {loading ? "..." : "Ship"}
        </Button>
      </form>
    </div>
  );
}
