"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/db/schema";

type Props = {
  categories: Category[];
  activeSlug?: string;
};

export function CategoryFilter({ categories, activeSlug }: Props) {
  const t = useTranslations("shop");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale");

  function setCategory(slug?: string) {
    if (slug) {
      router.push(`${pathname}?category=${slug}`);
    } else {
      router.push(pathname);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategory(undefined)}
        className={cn(
          "rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors",
          !activeSlug
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
        )}
      >
        {t("allCategories")}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => setCategory(cat.slug)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors",
            activeSlug === cat.slug
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          {locale === "en" ? cat.nameEn : cat.nameFr}
        </button>
      ))}
    </div>
  );
}
