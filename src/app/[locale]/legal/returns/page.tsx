import { useLocale } from "next-intl";

const content = {
  fr: {
    title: "Politique de Retour",
    sections: [
      {
        heading: "Délai de rétractation",
        text: "Vous disposez de 14 jours calendaires à compter de la réception de votre commande pour nous notifier votre souhait de retourner un article.",
      },
      {
        heading: "Conditions de retour",
        text: "L'article doit être retourné dans son emballage d'origine, non utilisé et en parfait état. Les articles personnalisés ne peuvent pas être retournés sauf en cas de défaut.",
      },
      {
        heading: "Procédure",
        text: "Contactez-nous à contact@mythael.com en indiquant votre numéro de commande et le motif du retour. Nous vous communiquerons les instructions d'envoi. Les frais de retour sont à la charge du client.",
      },
      {
        heading: "Remboursement",
        text: "Le remboursement sera effectué dans un délai de 14 jours après réception et vérification de l'article retourné, via le même moyen de paiement utilisé lors de l'achat.",
      },
      {
        heading: "Articles défectueux",
        text: "Si vous recevez un article endommagé ou défectueux, contactez-nous immédiatement avec des photos. Nous procéderons à un échange ou un remboursement intégral, frais de retour inclus.",
      },
    ],
  },
  en: {
    title: "Return Policy",
    sections: [
      {
        heading: "Withdrawal period",
        text: "You have 14 calendar days from receiving your order to notify us of your wish to return an item.",
      },
      {
        heading: "Return conditions",
        text: "The item must be returned in its original packaging, unused and in perfect condition. Personalized items cannot be returned except for defects.",
      },
      {
        heading: "Procedure",
        text: "Contact us at contact@mythael.com with your order number and the reason for return. We will provide shipping instructions. Return shipping costs are the responsibility of the customer.",
      },
      {
        heading: "Refund",
        text: "The refund will be issued within 14 days after receipt and verification of the returned item, via the same payment method used for the purchase.",
      },
      {
        heading: "Defective items",
        text: "If you receive a damaged or defective item, contact us immediately with photos. We will arrange an exchange or full refund, including return shipping costs.",
      },
    ],
  },
};

export default function ReturnsPage() {
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
