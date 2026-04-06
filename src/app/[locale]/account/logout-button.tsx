"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { logoutAction } from "@/app/actions/auth";

export function LogoutButton() {
  const t = useTranslations("nav");
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {t("logout")}
    </button>
  );
}
