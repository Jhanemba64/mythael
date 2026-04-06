"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createProductAction,
  updateProductAction,
} from "@/app/actions/products";
import type { Product, Category } from "@/db/schema";

type Props = {
  categories: Category[];
  product?: Product;
};

export function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = product
      ? await updateProductAction(product.id, formData)
      : await createProductAction(formData);

    if (result.success) {
      router.push("/admin/products");
    } else {
      setError(result.error || "Error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nameFr">Name (FR)</Label>
          <Input
            id="nameFr"
            name="nameFr"
            required
            defaultValue={product?.nameFr}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameEn">Name (EN)</Label>
          <Input
            id="nameEn"
            name="nameEn"
            required
            defaultValue={product?.nameEn}
            className="bg-card"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={product?.slug}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <Select
            name="categoryId"
            defaultValue={product?.categoryId?.toString()}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriptionFr">Description (FR)</Label>
        <Textarea
          id="descriptionFr"
          name="descriptionFr"
          required
          rows={4}
          defaultValue={product?.descriptionFr}
          className="bg-card"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriptionEn">Description (EN)</Label>
        <Textarea
          id="descriptionEn"
          name="descriptionEn"
          required
          rows={4}
          defaultValue={product?.descriptionEn}
          className="bg-card"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (EUR)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={product?.price}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compareAtPrice">Compare Price</Label>
          <Input
            id="compareAtPrice"
            name="compareAtPrice"
            type="number"
            step="0.01"
            defaultValue={product?.compareAtPrice || ""}
            className="bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            required
            defaultValue={product?.stock}
            className="bg-card"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={product?.featured}
          className="h-4 w-4 rounded border-border accent-primary"
        />
        <Label htmlFor="featured">Featured product</Label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
