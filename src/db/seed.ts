/**
 * Seed script — run with: npx tsx src/db/seed.ts
 * Populates categories and 11 products for Mythael.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, products } from "./schema";
import { sql } from "drizzle-orm";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle({ client });

async function seed() {
  console.log("Cleaning existing data...");
  await db.execute(sql`TRUNCATE products, categories RESTART IDENTITY CASCADE`);

  console.log("Seeding database...");

  // ─── Categories ──────────────────────────────────────────
  const [jewelry, figurines, tabletop] = await db
    .insert(categories)
    .values([
      {
        slug: "jewelry",
        nameFr: "Bijoux",
        nameEn: "Jewelry",
        descriptionFr:
          "Pendentifs elfiques, bracelets runiques et boucles feeriques — chaque bijou porte en lui un fragment de legende.",
        descriptionEn:
          "Elven pendants, runic bracelets, and fairy earrings — each jewel carries a fragment of legend.",
      },
      {
        slug: "figurines",
        nameFr: "Figurines",
        nameEn: "Figurines",
        descriptionFr:
          "Creatures mythiques et gardiens anciens en resine detaillee, selectionnes pour la richesse de leurs finitions.",
        descriptionEn:
          "Mythical creatures and ancient guardians in detailed resin, selected for the richness of their finish.",
      },
      {
        slug: "tabletop",
        nameFr: "Accessoires JDR",
        nameEn: "Tabletop Accessories",
        descriptionFr:
          "Coffres a des, bourses en cuir et rangements graves — pour des parties dignes des plus grandes quetes.",
        descriptionEn:
          "Dice chests, leather pouches, and engraved storage — for game sessions worthy of the greatest quests.",
      },
    ])
    .returning();

  // ─── Products ────────────────────────────────────────────
  await db.insert(products).values([
    // ── BIJOUX (5) ────────────────────────────────────────
    {
      categoryId: jewelry.id,
      slug: "elven-leaf-pendant",
      nameFr: "Pendentif Feuille Elfique",
      nameEn: "Elven Leaf Pendant",
      descriptionFr:
        "Inspire des forets eternelles, ce pendentif capture la grace des feuilles elfiques dans un alliage argente. Chaque nervure est finement detaillee, rappelant les canopees sous lesquelles les anciens elfes tenaient conseil. Porte-le comme un talisman de sagesse et de connexion a la nature.",
      descriptionEn:
        "Inspired by eternal forests, this pendant captures the grace of elven leaves in a silver alloy. Each vein is finely detailed, evoking the canopies under which ancient elves held council. Wear it as a talisman of wisdom and connection to nature.",
      price: "22.90",
      compareAtPrice: "34.90",
      stock: 8,
      images: ["/images/products/elven-leaf-pendant.png"],
      featured: true,
      // AliExpress: https://it.aliexpress.com/item/1005009777816802.html
    },
    {
      categoryId: jewelry.id,
      slug: "moonstone-crescent-necklace",
      nameFr: "Collier Croissant de Lune",
      nameEn: "Moonstone Crescent Necklace",
      descriptionFr:
        "Une pierre de lune captive dans un croissant d'argent vieilli. Ce collier evoque les nuits claires ou la magie est la plus forte. La pierre change subtilement de reflets selon la lumiere — comme la lune elle-meme.",
      descriptionEn:
        "A moonstone captured in an aged silver crescent. This necklace evokes clear nights when magic is at its strongest. The stone subtly shifts its reflections with the light — just like the moon itself.",
      price: "27.90",
      compareAtPrice: "39.90",
      stock: 5,
      images: ["/images/products/moonstone-crescent-necklace.png"],
      featured: true,
      // AliExpress: https://it.aliexpress.com/item/1005004105273185.html
    },
    {
      categoryId: jewelry.id,
      slug: "runic-dragon-bracelet",
      nameFr: "Bracelet Runique Dragon",
      nameEn: "Runic Dragon Bracelet",
      descriptionFr:
        "Grave de runes anciennes et orne de tetes de dragons, ce bracelet en cuir et metal est forge pour ceux qui portent le feu interieur. Chaque rune raconte une promesse de force et de courage.",
      descriptionEn:
        "Engraved with ancient runes and adorned with dragon heads, this leather and metal bracelet is forged for those who carry the inner fire. Each rune tells a promise of strength and courage.",
      price: "24.90",
      compareAtPrice: "36.90",
      stock: 7,
      images: ["/images/products/runic-dragon-bracelet.png"],
      featured: false,
      // AliExpress: https://it.aliexpress.com/item/1005004026897150.html
    },
    {
      categoryId: jewelry.id,
      slug: "fairy-wing-earrings",
      nameFr: "Boucles d'Oreilles Ailes de Fee",
      nameEn: "Fairy Wing Earrings",
      descriptionFr:
        "Delicates et etherees, ces boucles d'oreilles reproduisent les ailes irisees des fees des bois. Les cristaux incrustes captent la lumiere et creent des eclats feeriques a chaque mouvement.",
      descriptionEn:
        "Delicate and ethereal, these earrings reproduce the iridescent wings of woodland fairies. The embedded crystals catch the light and create fairy-like sparkles with every movement.",
      price: "19.90",
      compareAtPrice: "29.90",
      stock: 12,
      images: ["/images/products/fairy-wing-earrings.png"],
      featured: false,
      // AliExpress: https://it.aliexpress.com/item/1005008630346352.html
    },
    {
      categoryId: jewelry.id,
      slug: "tree-of-life-bracelet",
      nameFr: "Bracelet Arbre de Vie",
      nameEn: "Tree of Life Bracelet",
      descriptionFr:
        "Tresse a la main avec des fils de cuir et orne d'un medaillon Arbre de Vie en bronze ancien. Ce bracelet symbolise l'enracinement et la croissance — un rappel que nos racines nourrissent nos reves les plus hauts.",
      descriptionEn:
        "Hand-braided with leather threads and adorned with an ancient bronze Tree of Life medallion. This bracelet symbolizes grounding and growth — a reminder that our roots nourish our highest dreams.",
      price: "21.90",
      compareAtPrice: "32.90",
      stock: 9,
      images: ["/images/products/tree-of-life-bracelet.png"],
      featured: false,
      // AliExpress: https://it.aliexpress.com/item/1005007159389227.html
    },

    // ── FIGURINES (4) ─────────────────────────────────────
    {
      categoryId: figurines.id,
      slug: "forest-spirit-elder",
      nameFr: "Esprit de la Foret — L'Ancien",
      nameEn: "Forest Spirit — The Elder",
      descriptionFr:
        "Mi-arbre, mi-creature, cet esprit de la foret incarne la sagesse de la nature. Ses racines s'etendent comme des doigts noueux, et sa silhouette imposante veille sur les bois anciens. Une piece meditative pour les amoureux de la nature.",
      descriptionEn:
        "Half-tree, half-creature, this forest spirit embodies the wisdom of nature. Its roots extend like gnarled fingers, and its imposing silhouette watches over ancient woods. A meditative piece for nature lovers.",
      price: "38.90",
      compareAtPrice: "54.90",
      stock: 3,
      images: ["/images/products/forest-spirit-1.png"],
      featured: true,
      // AliExpress: https://it.aliexpress.com/item/1005007205419412.html (variant 1)
    },
    {
      categoryId: figurines.id,
      slug: "forest-spirit-guardian",
      nameFr: "Esprit de la Foret — Le Gardien",
      nameEn: "Forest Spirit — The Guardian",
      descriptionFr:
        "Dresse comme une sentinelle, ce gardien de la foret protege les secrets enfouis sous la mousse et les racines. Son regard de resine translucide semble percevoir au-dela du visible. Chaque detail est sculpte avec une precision obsedante.",
      descriptionEn:
        "Standing like a sentinel, this forest guardian protects the secrets buried beneath moss and roots. Its translucent resin gaze seems to perceive beyond the visible. Every detail is sculpted with obsessive precision.",
      price: "38.90",
      compareAtPrice: "54.90",
      stock: 3,
      images: ["/images/products/forest-spirit-2.png"],
      featured: true,
      // AliExpress: https://it.aliexpress.com/item/1005007205419412.html (variant 2)
    },
    {
      categoryId: figurines.id,
      slug: "forest-spirit-wanderer",
      nameFr: "Esprit de la Foret — Le Vagabond",
      nameEn: "Forest Spirit — The Wanderer",
      descriptionFr:
        "Cet esprit errant parcourt les sentiers oublies, portant avec lui les murmures des arbres centenaires. Sa posture fluide et ses traits paisibles en font une piece d'une serenite rare.",
      descriptionEn:
        "This wandering spirit roams forgotten paths, carrying with it the whispers of ancient trees. Its fluid posture and peaceful features make it a piece of rare serenity.",
      price: "38.90",
      compareAtPrice: "54.90",
      stock: 3,
      images: ["/images/products/forest-spirit-3.png"],
      featured: false,
      // AliExpress: https://it.aliexpress.com/item/1005007205419412.html (variant 3)
    },
    {
      categoryId: figurines.id,
      slug: "stone-sentinel",
      nameFr: "Sentinelle de Pierre",
      nameEn: "Stone Sentinel",
      descriptionFr:
        "Ce gardien de pierre, entre gargouille et golem, monte une garde eternelle. Ses yeux de resine translucide semblent luire dans l'ombre. Une piece imposante qui apporte une presence mysterieuse a tout espace.",
      descriptionEn:
        "This stone guardian, between gargoyle and golem, stands eternal watch. Its translucent resin eyes seem to glow in the shadow. An imposing piece that brings a mysterious presence to any space.",
      price: "39.90",
      compareAtPrice: "56.90",
      stock: 2,
      images: ["/images/products/stone-sentinel.png"],
      featured: false,
      // AliExpress: https://it.aliexpress.com/item/1005007288469039.html
    },

    // ── ACCESSOIRES JDR (2) ───────────────────────────────
    {
      categoryId: tabletop.id,
      slug: "grimoire-dice-box",
      nameFr: "Coffre a Des Monstre",
      nameEn: "Monster Dice Chest",
      descriptionFr:
        "Ce coffre en forme de creature devorera vos des les plus precieux pour mieux les proteger. Sculpte en resine avec des details saisissants, il se ferme solidement et contient jusqu'a 3 sets complets. Un tresor pour tout maitre du jeu.",
      descriptionEn:
        "This creature-shaped chest will devour your most precious dice to better protect them. Sculpted in resin with striking details, it closes firmly and holds up to 3 complete sets. A treasure for any game master.",
      price: "32.90",
      compareAtPrice: "47.90",
      stock: 4,
      images: ["/images/products/grimoire-dice-box.png"],
      featured: true,
      // AliExpress: https://it.aliexpress.com/item/1005011901532190.html
    },
    {
      categoryId: tabletop.id,
      slug: "dice-pouch",
      nameFr: "Bourse a Des en Cuir",
      nameEn: "Leather Dice Pouch",
      descriptionFr:
        "Cette bourse en cuir souple, fermee par un cordon, est le compagnon ideal de l'aventurier. Assez grande pour contenir plusieurs sets de des, elle se glisse dans un sac ou se porte a la ceinture. Le cuir se patine avec le temps, rendant chaque bourse unique.",
      descriptionEn:
        "This soft leather pouch, closed with a drawstring, is the ideal adventurer's companion. Large enough to hold multiple dice sets, it slips into a bag or hangs from a belt. The leather develops a patina over time, making each pouch unique.",
      price: "24.90",
      compareAtPrice: "37.90",
      stock: 6,
      images: ["/images/products/dice-pouch.png"],
      featured: true,
      // AliExpress: https://it.aliexpress.com/item/1005010572852071.html
    },
  ]);

  console.log("Seeded 3 categories and 11 products.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
