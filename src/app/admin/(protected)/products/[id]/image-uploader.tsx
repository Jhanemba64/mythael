"use client";

import { useState } from "react";
import { updateProductImagesAction } from "@/app/actions/products";
import { Upload, X } from "lucide-react";

type Props = {
  productId: number;
  images: string[];
};

export function ImageUploader({ productId, images: initialImages }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        const newImages = [...images, url];
        setImages(newImages);
        await updateProductImagesAction(productId, newImages);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    await updateProductImagesAction(productId, newImages);
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-foreground">Images</h3>
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div
            key={i}
            className="group relative h-24 w-24 overflow-hidden rounded-lg border border-border/50 bg-secondary"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              onClick={() => removeImage(i)}
              className="absolute right-1 top-1 hidden rounded-full bg-background/80 p-1 group-hover:block"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border/50 transition-colors hover:border-primary/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <span className="text-xs text-muted-foreground">...</span>
          ) : (
            <Upload className="h-5 w-5 text-muted-foreground" />
          )}
        </label>
      </div>
    </div>
  );
}
