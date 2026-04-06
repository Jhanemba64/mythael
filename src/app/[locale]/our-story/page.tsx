import { useTranslations, useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";

const artisans = {
  fr: [
    {
      name: "Elara",
      role: "Sculptrice & Figuriniste",
      bio: "Infirmiere le jour, Elara passe ses soirees a donner forme a des creatures qui n'existent que dans son imagination. Tout a commence avec un dragon en argile offert a sa fille — aujourd'hui, ses figurines en resine sont devenues sa fierte. Elle travaille a la lumiere d'une lampe de bureau, entouree de croquis et de pots de peinture, avec pour seule compagnie la musique de films fantastiques. Chaque sculpture passe entre ses mains pendant des heures avant d'etre jugee digne de quitter l'atelier.",
    },
    {
      name: "Linden",
      role: "Artisan Bois & Createur JDR",
      bio: "Developpeur web en semaine, Linden se transforme en artisan du bois chaque week-end. Dans un petit atelier au fond du jardin, entre les copeaux et l'odeur du noyer, naissent des plateaux a des, des boites grimoire et des supports de personnages. Joueur de jeux de role depuis l'adolescence, Linden connait l'importance d'un bel objet sur la table de jeu. Chaque piece est poncee, huilee et gravee a la main — parce qu'un des merite un ecrin a sa mesure.",
    },
    {
      name: "Sora",
      role: "Creatrice de Bijoux",
      bio: "Professeure d'arts plastiques, Sora a toujours eu les mains dans la matiere. Ses bijoux naissent d'un melange de techniques anciennes et de materiaux contemporains : resine, pierres naturelles, feuilles sechees, fils de metal. Elle s'inspire des forets, des contes et des mythologies pour creer des pieces qui racontent une histoire. Porter un bijou de Sora, c'est porter un fragment de recit — un talisman discret qui rappelle que la magie existe dans les details.",
    },
  ],
  en: [
    {
      name: "Elara",
      role: "Sculptor & Figurine Artist",
      bio: "A nurse by day, Elara spends her evenings giving shape to creatures that exist only in her imagination. It all started with a clay dragon made for her daughter — today, her resin figurines have become her pride. She works by the light of a desk lamp, surrounded by sketches and paint pots, with only fantasy film scores for company. Each sculpture passes through her hands for hours before being deemed worthy of leaving the workshop.",
    },
    {
      name: "Linden",
      role: "Wood Artisan & RPG Creator",
      bio: "A web developer during the week, Linden transforms into a wood artisan every weekend. In a small workshop at the back of the garden, amidst shavings and the scent of walnut, dice trays, grimoire boxes, and character stands are born. A tabletop RPG player since adolescence, Linden understands the importance of a beautiful object on the game table. Each piece is sanded, oiled, and engraved by hand — because a die deserves a worthy home.",
    },
    {
      name: "Sora",
      role: "Jewelry Creator",
      bio: "An art teacher by profession, Sora has always had her hands in materials. Her jewelry is born from a blend of ancient techniques and contemporary materials: resin, natural stones, dried leaves, metal wire. She draws inspiration from forests, tales, and mythologies to create pieces that tell a story. Wearing Sora's jewelry is wearing a fragment of narrative — a discreet talisman reminding you that magic lives in the details.",
    },
  ],
};

const story = {
  fr: {
    title: "Notre Histoire",
    intro:
      "Mythael n'est pas ne dans un bureau. Il est ne dans un atelier mal eclaire, entre deux pots de resine, un samedi soir ou le reste du monde regardait la television.",
    p1: "Nous sommes trois. Trois personnes ordinaires avec des metiers ordinaires — et une passion demesuree pour les mondes qui n'existent pas encore. Le soir, quand la journee de travail s'acheve, nos mains retrouvent la matiere. La resine, le bois, le metal, la pierre. Et quelque chose se passe : le quotidien s'efface, et ce qui emerge sous nos doigts porte en lui un fragment d'un monde plus grand.",
    p2: "Pendant des annees, nous avons cree pour nous-memes, pour nos proches, pour le plaisir pur de donner forme a l'imaginaire. Puis un jour, quelqu'un a dit : \"Vous devriez vendre ca.\" Alors nous avons cree Mythael.",
    p3: "Chaque piece que vous trouverez ici est le fruit de soirees passees a sculpter, poncer, peindre, recommencer. Nous ne sommes pas une usine. Nous sommes des mains, des yeux, et une passion qui refuse de rester dans l'ombre. Merci de nous permettre d'en vivre.",
    artisansTitle: "Les Mains derriere Mythael",
  },
  en: {
    title: "Our Story",
    intro:
      "Mythael wasn't born in an office. It was born in a dimly lit workshop, between two pots of resin, on a Saturday evening when the rest of the world was watching television.",
    p1: "There are three of us. Three ordinary people with ordinary jobs — and an extraordinary passion for worlds that don't exist yet. In the evening, when the workday ends, our hands return to materials. Resin, wood, metal, stone. And something happens: the everyday fades, and what emerges under our fingers carries a fragment of a larger world.",
    p2: "For years, we created for ourselves, for our loved ones, for the pure joy of giving shape to imagination. Then one day, someone said: \"You should sell this.\" So we created Mythael.",
    p3: "Every piece you'll find here is the fruit of evenings spent sculpting, sanding, painting, starting over. We are not a factory. We are hands, eyes, and a passion that refuses to stay in the shadows. Thank you for letting us make a living from it.",
    artisansTitle: "The Hands Behind Mythael",
  },
};

export default function OurStoryPage() {
  const locale = useLocale() as "fr" | "en";
  const s = story[locale];
  const team = artisans[locale];

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

      {/* Artisans */}
      <h2 className="text-center font-heading text-2xl tracking-wide text-foreground">
        {s.artisansTitle}
      </h2>

      <div className="mt-10 space-y-10">
        {team.map((artisan) => (
          <div key={artisan.name} className="rounded-lg border border-border/50 bg-card p-6">
            <div className="mb-3">
              <h3 className="font-heading text-lg tracking-wide text-primary">
                {artisan.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {artisan.role}
              </p>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {artisan.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
