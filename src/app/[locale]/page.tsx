import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { Shield, Sparkles, Gem, Truck } from "lucide-react";
import { HeroBackground } from "@/components/shared/hero-background";
import { AmbientPlayer } from "@/components/shared/ambient-player";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

// This will be a static page in dev mode without DB,
// and dynamic in production once DB is connected.
// For now, we use a fallback for when DB is not available.
async function getFeaturedProducts() {
  try {
    return await db.query.products.findMany({
      where: eq(products.featured, true),
      limit: 4,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return <HomePageClient featuredProducts={featuredProducts} />;
}

function HomePageClient({
  featuredProducts,
}: {
  featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>>;
}) {
  const t = useTranslations("home");
  const tTrust = useTranslations("trust");
  const locale = useLocale();

  const categories = [
    {
      slug: "jewelry",
      label: t("categories.jewelry"),
      icon: "&#10022;",
    },
    {
      slug: "figurines",
      label: t("categories.figurines"),
      icon: "&#9816;",
    },
    {
      slug: "tabletop",
      label: t("categories.tabletop"),
      icon: "&#9858;",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Ambient music toggle */}
      <AmbientPlayer />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        {/* Animated embers + mist */}
        <HeroBackground />

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight tracking-wide text-foreground md:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("hero.subtitle")}
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            {t("hero.cta")}
          </Link>
        </div>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Trust Badges ──────────────────────────────────── */}
      <section className="border-y border-border/30 bg-card/50">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {[
            { icon: Shield, label: tTrust("securePayment") },
            { icon: Sparkles, label: tTrust("handmade") },
            { icon: Gem, label: tTrust("uniquePieces") },
            { icon: Truck, label: tTrust("freeShipping") },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs tracking-wider text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center font-heading text-2xl tracking-wide text-foreground md:text-3xl">
          {t("categories.title")}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-4 rounded-lg border border-border/50 bg-card px-6 py-10 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <span
                className="text-4xl text-primary transition-transform group-hover:scale-110"
                dangerouslySetInnerHTML={{ __html: cat.icon }}
              />
              <span className="font-heading text-lg tracking-wide text-foreground">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="text-center">
            <h2 className="font-heading text-2xl tracking-wide text-foreground md:text-3xl">
              {t("featured.title")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("featured.subtitle")}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Story Teaser ──────────────────────────────────── */}
      <section className="border-t border-border/30 bg-card/30">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
          <h2 className="font-heading text-2xl tracking-wide text-foreground md:text-3xl">
            {t("story.title")}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {t("story.text")}
          </p>
          <Link
            href="/our-story"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            {t("story.cta")} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
