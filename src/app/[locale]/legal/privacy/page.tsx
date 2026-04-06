import { useLocale } from "next-intl";

const content = {
  fr: {
    title: "Politique de Confidentialite",
    sections: [
      {
        heading: "Donnees collectees",
        text: "Nous collectons uniquement les donnees necessaires au traitement de vos commandes : nom, prenom, adresse email, adresse de livraison et informations de paiement (traitees directement par Stripe — nous n'y avons pas acces).",
      },
      {
        heading: "Utilisation des donnees",
        text: "Vos donnees sont utilisees exclusivement pour : traiter vos commandes, vous envoyer les emails de confirmation et de suivi, et ameliorer votre experience sur notre site. Nous ne vendons ni ne partageons vos donnees avec des tiers a des fins commerciales.",
      },
      {
        heading: "Securite",
        text: "Votre securite est notre priorite. Les transactions sont chiffrees via SSL. Les paiements sont geres par Stripe, certifie PCI DSS niveau 1. Les mots de passe sont hashes et ne sont jamais stockes en clair.",
      },
      {
        heading: "Cookies",
        text: "Nous utilisons des cookies essentiels au fonctionnement du site (session, panier, preference de langue). Aucun cookie de tracking ou publicitaire n'est utilise.",
      },
      {
        heading: "Vos droits",
        text: "Conformement au RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees personnelles. Contactez-nous a contact@mythael.com pour toute demande.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Data collected",
        text: "We only collect data necessary for processing your orders: name, email address, shipping address, and payment information (processed directly by Stripe — we do not have access to it).",
      },
      {
        heading: "Use of data",
        text: "Your data is used exclusively to: process your orders, send you confirmation and tracking emails, and improve your experience on our site. We do not sell or share your data with third parties for commercial purposes.",
      },
      {
        heading: "Security",
        text: "Your security is our priority. Transactions are encrypted via SSL. Payments are handled by Stripe, PCI DSS Level 1 certified. Passwords are hashed and never stored in plain text.",
      },
      {
        heading: "Cookies",
        text: "We use essential cookies for site functionality (session, cart, language preference). No tracking or advertising cookies are used.",
      },
      {
        heading: "Your rights",
        text: "In accordance with GDPR, you have the right to access, rectify, and delete your personal data. Contact us at contact@mythael.com for any requests.",
      },
    ],
  },
};

export default function PrivacyPage() {
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
