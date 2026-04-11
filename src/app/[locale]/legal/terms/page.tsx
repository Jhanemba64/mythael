import { useLocale } from "next-intl";

const content = {
  fr: {
    title: "Conditions Générales de Vente",
    sections: [
      {
        heading: "1. Objet",
        text: "Les présentes conditions générales de vente régissent les ventes de produits effectuées sur le site mythael.com. Toute commande implique l'acceptation sans réserve de ces conditions.",
      },
      {
        heading: "2. Produits",
        text: "Les produits proposés sont inspirés de l'univers fantasy et sélectionnés pour leur qualité. Des variations mineures entre les photos et le produit reçu peuvent exister et ne constituent pas un défaut.",
      },
      {
        heading: "3. Prix",
        text: "Les prix sont indiqués en euros toutes taxes comprises. Mythael se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au prix en vigueur au moment de la validation de la commande.",
      },
      {
        heading: "4. Commande",
        text: "La validation de la commande vaut acceptation des prix et description des produits. La confirmation de commande entraîne la formation du contrat de vente.",
      },
      {
        heading: "5. Paiement",
        text: "Le paiement s'effectue en ligne par carte bancaire via la plateforme sécurisée Stripe. Le débit est effectué au moment de la validation de la commande.",
      },
      {
        heading: "6. Livraison",
        text: "Les délais de livraison sont donnés à titre indicatif (3 à 7 jours ouvrés). La livraison est offerte pour toutes les commandes. Un numéro de suivi est communiqué par email.",
      },
      {
        heading: "7. Droit de rétractation",
        text: "Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation. Les produits doivent être retournés dans leur emballage d'origine, en parfait état.",
      },
      {
        heading: "8. Protection des données personnelles",
        text: "Les informations collectées sont nécessaires au traitement de votre commande. Elles sont traitées conformément au Règlement Général sur la Protection des Données (RGPD) et à notre politique de confidentialité. Vos données de paiement sont gérées par Stripe (certifié PCI DSS niveau 1) et ne sont jamais stockées sur nos serveurs. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Consultez notre politique de confidentialité pour plus de détails.",
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
        text: "Delivery times are provided as an indication (3 to 7 business days). Shipping is free for all orders. A tracking number is sent by email.",
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
