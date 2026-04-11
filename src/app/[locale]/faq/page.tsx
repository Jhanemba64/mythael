import { useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";

const faq = {
  fr: {
    title: "Questions Fréquentes",
    items: [
      {
        q: "Comment sélectionnez-vous vos produits ?",
        a: "Chaque pièce est choisie avec soin pour sa qualité, ses détails et son inspiration fantasy. Nous recherchons des créations qui racontent une histoire et transportent dans un autre univers. De légères variations peuvent exister entre deux exemplaires — c'est ce qui rend chaque objet unique.",
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "Nos pièces sont expédiées depuis nos entrepôts européens. Comptez 3 à 7 jours ouvrés pour la livraison en France et en Europe. Vous recevrez un email avec un numéro de suivi dès l'expédition.",
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, nous livrons dans toute l'Europe et à l'international. La livraison est offerte pour toutes les commandes.",
      },
      {
        q: "Puis-je retourner un article ?",
        a: "Vous disposez de 14 jours après réception pour nous retourner un article dans son emballage d'origine. Consultez notre politique de retour pour plus de détails.",
      },
      {
        q: "Puis-je faire une demande spéciale ?",
        a: "Nous sommes à l'écoute de vos envies. Contactez-nous par email à contact@mythael.com pour discuter de votre demande — nous ferons notre possible pour y répondre.",
      },
      {
        q: "Comment entretenez-vous les figurines en résine ?",
        a: "Un simple dépoussiérage avec un chiffon doux suffit. Évitez l'exposition directe au soleil prolongée et les sources de chaleur intense pour préserver les couleurs.",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Absolument. Nous utilisons Stripe, un leader mondial du paiement en ligne. Vos données bancaires ne transitent jamais par nos serveurs.",
      },
      {
        q: "Comment protégez-vous mes données personnelles ?",
        a: "Votre vie privée est une priorité. Nous sommes conformes au RGPD (Règlement Général sur la Protection des Données). Nous ne collectons que les informations strictement nécessaires à vos commandes, nous ne vendons jamais vos données, et vos paiements sont sécurisés par Stripe (certifié PCI DSS niveau 1). Vous pouvez à tout moment accéder, modifier ou supprimer vos données en nous contactant. Consultez notre politique de confidentialité pour tous les détails.",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How do you select your products?",
        a: "Each piece is carefully chosen for its quality, detail, and fantasy inspiration. We seek out creations that tell a story and transport you to another world. Slight variations may exist between two copies — it's what makes each object unique.",
      },
      {
        q: "What are the delivery times?",
        a: "Our pieces are shipped from our European warehouses. Allow 3 to 7 business days for delivery in France and Europe. You'll receive an email with a tracking number as soon as it ships.",
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
        q: "Can I make a special request?",
        a: "We're always happy to hear your ideas. Contact us by email at contact@mythael.com to discuss your request — we'll do our best to accommodate it.",
      },
      {
        q: "How do you care for resin figurines?",
        a: "Simple dusting with a soft cloth is enough. Avoid prolonged direct sunlight and intense heat sources to preserve the colors.",
      },
      {
        q: "Is the payment secure?",
        a: "Absolutely. We use Stripe, a world leader in online payments. Your banking data never passes through our servers.",
      },
      {
        q: "How do you protect my personal data?",
        a: "Your privacy is a priority. We are fully GDPR compliant (General Data Protection Regulation). We only collect information strictly necessary for your orders, we never sell your data, and your payments are secured by Stripe (PCI DSS Level 1 certified). You can access, modify, or delete your data at any time by contacting us. See our privacy policy for full details.",
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
