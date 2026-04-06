import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export function StockBadge({ stock }: { stock: number }) {
  const t = useTranslations("shop");

  if (stock === 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        {t("outOfStock")}
      </Badge>
    );
  }

  if (stock <= 5) {
    return (
      <Badge variant="secondary" className="border-primary/30 text-xs text-primary">
        {t("onlyLeft", { count: stock })}
      </Badge>
    );
  }

  return null;
}
