import { useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";

const values = {
  fr: [
    {
      title: "Selection rigoureuse",
      text: "Chaque produit est choisi pour la qualite de ses finitions, la richesse de ses details et sa capacite a transporter dans un autre monde. Nous ne retenons que les pieces qui nous font vibrer.",
    },
    {
      title: "Univers immersif",
      text: "Des bijoux elfiques aux figurines de gardiens anciens, chaque piece s'inscrit dans un univers coherent. Nous construisons un monde ou chaque objet a sa place et son histoire.",
    },
    {
      title: "Accessibilite",
      text: "La fantasy ne devrait pas etre un luxe. Nous proposons des pieces d'exception a des prix justes, pour que chaque passione puisse s'entourer de magie au quotidien.",
    },
  ],
  en: [
    {
      title: "Rigorous selection",
      text: "Every product is chosen for the quality of its finish, the richness of its details, and its ability to transport you to another world. We only keep the pieces that truly move us.",
    },
    {
      title: "Immersive universe",
      text: "From elven jewelry to ancient guardian figurines, each piece belongs to a coherent universe. We build a world where every object has its place and its story.",
    },
    {
      title: "Accessibility",
      text: "Fantasy shouldn't be a luxury. We offer exceptional pieces at fair prices, so every enthusiast can surround themselves with magic in everyday life.",
    },
  ],
};

const story = {
  fr: {
    title: "Notre Histoire",
    intro:
      "Mythael est ne d'une obsession : trouver des objets qui donnent l'impression que les mondes fantastiques existent vraiment.",
    p1: "Tout a commence par un constat simple. Passionnes de fantasy, de jeux de role et de mythologies depuis toujours, nous cherchions des objets qui portent cette magie — des pieces qui ne soient pas de simples accessoires, mais de veritables fragments d'univers.",
    p2: "Alors nous avons decide de les trouver. De parcourir, comparer, tester, jusqu'a denicher les creations qui meritent d'etre partagees. Des figurines aux details saisissants, des bijoux qui racontent des legendes, des accessoires qui transforment une table de jeu en terrain d'aventure.",
    p3: "Mythael, c'est cette quete : selectionner avec exigence, presenter avec soin, et livrer avec fiabilite. Pour que chaque commande soit une porte ouverte vers l'imaginaire.",
    valuesTitle: "Ce qui nous guide",
  },
  en: {
    title: "Our Story",
    intro:
      "Mythael was born from an obsession: finding objects that make fantastical worlds feel real.",
    p1: "It all started with a simple observation. Lifelong fans of fantasy, tabletop RPGs, and mythology, we were looking for objects that carry that magic — pieces that aren't mere accessories, but true fragments of imagined worlds.",
    p2: "So we decided to find them. To search, compare, test, until we unearthed creations worth sharing. Figurines with striking detail, jewelry that tells legends, accessories that transform a game table into an adventure ground.",
    p3: "Mythael is that quest: selecting with high standards, presenting with care, and delivering with reliability. So that every order opens a door to the imagination.",
    valuesTitle: "What guides us",
  },
};

export default function OurStoryPage() {
  const locale = useLocale() as "fr" | "en";
  const s = story[locale];
  const vals = values[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-center font-heading text-3xl tracking-wide text-foreground md:text-4xl">
        {s.title}
      </h1>

      {/* Intro */}
      <p className="mt-8 text-center text-lg italic text-muted-foreground">
        {s.intro}
      </p>

      <Separator className="mx-auto my-10 max-w-xs" />

      {/* Story paragraphs */}
      <div className="space-y-6 leading-relaxed text-muted-foreground">
        <p>{s.p1}</p>
        <p>{s.p2}</p>
        <p>{s.p3}</p>
      </div>

      <Separator className="mx-auto my-14 max-w-xs" />

      {/* Values */}
      <h2 className="text-center font-heading text-2xl tracking-wide text-foreground">
        {s.valuesTitle}
      </h2>

      <div className="mt-10 space-y-10">
        {vals.map((value) => (
          <div key={value.title} className="rounded-lg border border-border/50 bg-card p-6">
            <h3 className="mb-3 font-heading text-lg tracking-wide text-primary">
              {value.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {value.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
