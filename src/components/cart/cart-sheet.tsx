"use client";

import { useCart } from "./cart-provider";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export function CartSheet() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } =
    useCart();
  const t = useTranslations("cart");
  const locale = useLocale();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex w-full flex-col bg-background sm:w-96">
        <SheetHeader>
          <SheetTitle className="font-heading tracking-wide">
            {t("title")}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">{t("empty")}</p>
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="text-sm text-primary hover:underline"
            >
              {t("continueShopping")}
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => {
                  const name =
                    locale === "fr" ? item.nameFr : item.nameEn;
                  return (
                    <div key={item.id} className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border/50 bg-secondary">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-lg text-muted-foreground/30">
                            &#9670;
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium leading-tight text-foreground">
                          {name}
                        </p>
                        <p className="mt-0.5 text-xs text-primary">
                          {formatPrice(item.price, locale)}
                        </p>

                        {/* Quantity controls */}
                        <div className="mt-auto flex items-center gap-2 pt-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="flex h-6 w-6 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                          >
                            <Plus className="h-3 w-3" />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("shipping")}</span>
                <span className="text-primary">{t("freeShipping")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{t("total")}</span>
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(totalPrice, locale)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-md bg-primary py-3 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("checkout")}
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
