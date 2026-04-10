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
        text: "Les produits proposes sont inspires de l'univers fantasy et selectionnes pour leur qualite. Des variations mineures entre les photos et le produit recu peuvent exister et ne constituent pas un defaut.",
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
        heading: "8. Protection des donnees personnelles",
        text: "Les informations collectees sont necessaires au traitement de votre commande. Elles sont traitees conformement au Reglement General sur la Protection des Donnees (RGPD) et a notre politique de confidentialite. Vos donnees de paiement sont gerees par Stripe (certifie PCI DSS niveau 1) et ne sont jamais stockees sur nos serveurs. Vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees. Consultez notre politique de confidentialite pour plus de details.",
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
        text: "The products offered are fantasy-inspired and selected for quality. Minor variations between photos and the received product may occur and do not constitute a defect.",
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
        heading: "8. Personal data protection",
        text: "The information collected is necessary for processing your order. It is processed in accordance with the General Data Protection Regulation (GDPR) and our privacy policy. Your payment data is handled by Stripe (PCI DSS Level 1 certified) and is never stored on our servers. You have the right to access, rectify, and delete your data. See our privacy policy for full details.",
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
