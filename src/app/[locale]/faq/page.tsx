import { useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";

const faq = {
  fr: {
    title: "Questions Frequentes",
    items: [
      {
        q: "Vos creations sont-elles vraiment faites main ?",
        a: "Oui. Chaque piece est concue, sculptee, assemblee ou peinte a la main par l'un de nos trois artisans. C'est pourquoi de legeres variations peuvent exister entre deux exemplaires — c'est ce qui rend chaque objet unique.",
      },
      {
        q: "Quels sont les delais de livraison ?",
        a: "Nos pieces etant preparees avec soin, comptez 2 a 4 semaines pour la livraison. Certains articles en stock peuvent etre expedies sous 5 a 7 jours. Vous recevrez un email avec un numero de suivi des l'expedition.",
      },
      {
        q: "Livrez-vous a l'international ?",
        a: "Oui, nous livrons dans toute l'Europe et a l'international. La livraison est offerte pour toutes les commandes.",
      },
      {
        q: "Puis-je retourner un article ?",
        a: "Vous disposez de 14 jours apres reception pour nous retourner un article dans son emballage d'origine. Consultez notre politique de retour pour plus de details.",
      },
      {
        q: "Acceptez-vous les commandes personnalisees ?",
        a: "Nous acceptons certaines demandes de personnalisation selon la disponibilite de nos artisans. Contactez-nous par email pour en discuter.",
      },
      {
        q: "Comment entretenez-vous les figurines en resine ?",
        a: "Un simple depoussierage avec un chiffon doux suffit. Evitez l'exposition directe au soleil prolongee et les sources de chaleur intense pour preserver les couleurs.",
      },
      {
        q: "Le paiement est-il securise ?",
        a: "Absolument. Nous utilisons Stripe, un leader mondial du paiement en ligne. Vos donnees bancaires ne transitent jamais par nos serveurs.",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Are your creations truly handmade?",
        a: "Yes. Each piece is designed, sculpted, assembled, or painted by hand by one of our three artisans. That's why slight variations may exist between two copies — it's what makes each object unique.",
      },
      {
        q: "What are the delivery times?",
        a: "Since our pieces are carefully prepared, allow 2 to 4 weeks for delivery. Some items in stock can be shipped within 5 to 7 days. You'll receive an email with a tracking number as soon as it ships.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship throughout Europe and internationally. Shipping is free for all orders.",
      },
      {
        q: "Can I return an item?",
        a: "You have 14 days after receipt to return an item in its original packaging. Please check our return policy for more details.",
      },
      {
        q: "Do you accept custom orders?",
        a: "We accept certain customization requests depending on our artisans' availability. Contact us by email to discuss.",
      },
      {
        q: "How do you care for resin figurines?",
        a: "Simple dusting with a soft cloth is enough. Avoid prolonged direct sunlight and intense heat sources to preserve the colors.",
      },
      {
        q: "Is the payment secure?",
        a: "Absolutely. We use Stripe, a world leader in online payments. Your banking data never passes through our servers.",
      },
    ],
  },
};

export default function FaqPage() {
  const locale = useLocale() as "fr" | "en";
  const f = faq[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-center font-heading text-3xl tracking-wide text-foreground md:text-4xl">
        {f.title}
      </h1>

      <div className="mt-12 space-y-0">
        {f.items.map((item, i) => (
          <div key={i}>
            <div className="py-6">
              <h3 className="text-sm font-medium text-foreground">{item.q}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
            {i < f.items.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}
