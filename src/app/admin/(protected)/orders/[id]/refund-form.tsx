"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { refundOrderAction } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function RefundOrderForm({ orderId }: { orderId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);

  async function handleRefund() {
    setLoading(true);
    setError("");

    const result = await refundOrderAction(orderId);

    if (result.success) {
      setConfirming(false);
      router.refresh();
    } else {
      setError(result.error || "Refund failed");
      setLoading(false);
    }
  }

  if (!confirming) {
    return (
      <div>
        <h3 className="text-sm font-medium text-foreground">Refund</h3>
        <Button
          onClick={() => setConfirming(true)}
          variant="outline"
          className="mt-3 border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Refund this order
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">Refund</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        This will issue a full refund via Stripe and notify the customer by email. This action cannot be undone.
      </p>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
      <div className="mt-3 flex gap-3">
        <Button
          onClick={handleRefund}
          disabled={loading}
          variant="destructive"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          {loading ? "Processing..." : "Confirm refund"}
        </Button>
        <Button
          onClick={() => setConfirming(false)}
          disabled={loading}
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
