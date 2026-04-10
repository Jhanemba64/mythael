"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { useCart } from "@/components/cart/cart-provider";
import { ShoppingBag, Menu, User, LogOut, ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logoutAction } from "@/app/actions/auth";

export function Header() {
  const t = useTranslations("nav");
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [auth, setAuth] = useState<{ authenticated: boolean; firstName?: string }>({
    authenticated: false,
  });

  function refreshAuth() {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(setAuth)
      .catch(() => {});
  }

  useEffect(() => {
    refreshAuth();
    window.addEventListener("auth-change", refreshAuth);
    return () => window.removeEventListener("auth-change", refreshAuth);
  }, []);

  async function handleLogout() {
    await logoutAction();
    setAuth({ authenticated: false });
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  }

  const navLinks = [
    { href: "/shop" as const, label: t("shop") },
    { href: "/our-story" as const, label: t("ourStory") },
    { href: "/faq" as const, label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl tracking-widest text-primary">
          MYTHAEL
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LocaleSwitcher />

          {auth.authenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/account"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ClipboardList className="h-4 w-4" />
                {t("orders")}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                {t("logout")}
              </button>
            </div>
          ) : (
            <Link
              href="/account/login"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              {t("login")}
            </Link>
          )}

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t("cart")}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger className="text-muted-foreground md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading text-lg tracking-wide text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}

                {auth.authenticated ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-lg text-muted-foreground"
                    >
                      <ClipboardList className="h-5 w-5" />
                      {t("orders")}
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 text-lg text-muted-foreground"
                    >
                      <LogOut className="h-5 w-5" />
                      {t("logout")}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/account/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-muted-foreground"
                  >
                    {t("login")}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
