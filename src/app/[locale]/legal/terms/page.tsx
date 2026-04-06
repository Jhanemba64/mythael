import { useLocale } from "next-intl";

const content = {
  fr: {
    title: "Conditions Generales de Vente",
    sections: [
      {
        heading: "1. Objet",
        text: "Les presentes conditions generales de vente regissent les ventes de produits effectuees sur le site mythael.com. Toute commande implique l'acceptation sans reserve de ces conditions.",
      },
      {
        heading: "2. Produits",
        text: "Les produits proposes sont des creations artisanales. Des variations mineures entre les photos et le produit recu sont inherentes au caractere fait-main de nos creations et ne constituent pas un defaut.",
      },
      {
        heading: "3. Prix",
        text: "Les prix sont indiques en euros toutes taxes comprises. Mythael se reserve le droit de modifier ses prix a tout moment. Les produits sont factures au prix en vigueur au moment de la validation de la commande.",
      },
      {
        heading: "4. Commande",
        text: "La validation de la commande vaut acceptation des prix et description des produits. La confirmation de commande entraine la formation du contrat de vente.",
      },
      {
        heading: "5. Paiement",
        text: "Le paiement s'effectue en ligne par carte bancaire via la plateforme securisee Stripe. Le debit est effectue au moment de la validation de la commande.",
      },
      {
        heading: "6. Livraison",
        text: "Les delais de livraison sont donnes a titre indicatif (2 a 4 semaines). La livraison est offerte pour toutes les commandes. Un numero de suivi est communique par email.",
      },
      {
        heading: "7. Droit de retractation",
        text: "Conformement a la legislation en vigueur, vous disposez d'un delai de 14 jours a compter de la reception de votre commande pour exercer votre droit de retractation. Les produits doivent etre retournes dans leur emballage d'origine, en parfait etat.",
      },
      {
        heading: "8. Donnees personnelles",
        text: "Les informations collectees sont necessaires au traitement de votre commande. Elles sont traitees conformement a notre politique de confidentialite.",
      },
    ],
  },
  en: {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "1. Purpose",
        text: "These general terms and conditions govern the sale of products on mythael.com. Any order implies unreserved acceptance of these conditions.",
      },
      {
        heading: "2. Products",
        text: "The products offered are handcrafted creations. Minor variations between photos and the received product are inherent to the handmade nature of our creations and do not constitute a defect.",
      },
      {
        heading: "3. Prices",
        text: "Prices are indicated in euros, all taxes included. Mythael reserves the right to modify its prices at any time. Products are invoiced at the price in effect at the time of order validation.",
      },
      {
        heading: "4. Orders",
        text: "Validating an order constitutes acceptance of the prices and product descriptions. Order confirmation creates the sales contract.",
      },
      {
        heading: "5. Payment",
        text: "Payment is made online by credit card through the secure Stripe platform. The charge is made at the time of order validation.",
      },
      {
        heading: "6. Delivery",
        text: "Delivery times are provided as an indication (2 to 4 weeks). Shipping is free for all orders. A tracking number is sent by email.",
      },
      {
        heading: "7. Right of withdrawal",
        text: "In accordance with current legislation, you have 14 days from receiving your order to exercise your right of withdrawal. Products must be returned in their original packaging, in perfect condition.",
      },
      {
        heading: "8. Personal data",
        text: "The information collected is necessary for processing your order. It is processed in accordance with our privacy policy.",
      },
    ],
  },
};

export default function TermsPage() {
  const locale = useLocale() as "fr" | "en";
  const c = content[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-center font-heading text-3xl tracking-wide text-foreground">
        {c.title}
      </h1>
      <div className="mt-10 space-y-8">
        {c.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-sm font-semibold text-foreground">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
