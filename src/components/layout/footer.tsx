import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <p className="font-heading text-lg tracking-widest text-primary">
            MYTHAEL
          </p>

          {/* Tagline */}
          <p className="max-w-sm text-sm italic text-muted-foreground">
            {t("tagline")}
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/our-story" className="transition-colors hover:text-foreground">
              {useTranslations("nav")("ourStory")}
            </Link>
            <Link href="/faq" className="transition-colors hover:text-foreground">
              {useTranslations("nav")("faq")}
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-foreground">
              {t("terms")}
            </Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-foreground">
              {t("privacy")}
            </Link>
            <Link href="/legal/returns" className="transition-colors hover:text-foreground">
              {t("returns")}
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Mythael. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
