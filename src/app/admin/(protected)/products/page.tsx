import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteProductButton } from "./[id]/delete-button";

async function getProducts() {
  try {
    return await db.query.products.findMany({
      with: { category: true },
      orderBy: [desc(products.createdAt)],
    });
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const allProducts = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl tracking-wide text-foreground">
          Products
        </h1>
        <Link href="/admin/products/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="mt-6 rounded-lg border border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {product.nameEn}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {product.slug}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {product.category?.nameEn || "—"}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {product.price} EUR
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={product.stock <= 3 ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm">
                  {product.featured ? "Yes" : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <DeleteProductButton id={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {allProducts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No products yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
