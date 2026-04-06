"use client";

import { useRouter } from "next/navigation";
import { deleteProductAction } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    await deleteProductAction(id);
    router.push("/admin/products");
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}
