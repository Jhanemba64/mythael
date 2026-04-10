import { useLocale } from "next-intl";

const content = {
  fr: {
    title: "Politique de Confidentialite",
    lastUpdated: "Derniere mise a jour : 10 avril 2026",
    sections: [
      {
        heading: "1. Responsable du traitement",
        text: "Le responsable du traitement de vos donnees personnelles est Mythael, joignable a l'adresse contact@mythael.com. Pour toute question relative a la protection de vos donnees, vous pouvez nous contacter a cette adresse.",
      },
      {
        heading: "2. Donnees collectees",
        text: "Nous collectons uniquement les donnees strictement necessaires au traitement de vos commandes et a la gestion de votre compte : nom, prenom, adresse email, adresse de livraison, preference de langue et historique de commandes. Les donnees de paiement (numero de carte, etc.) sont traitees exclusivement par Stripe et ne transitent jamais par nos serveurs.",
      },
      {
        heading: "3. Base legale du traitement",
        text: "Le traitement de vos donnees repose sur : (a) l'execution du contrat de vente pour les donnees liees a vos commandes, (b) votre consentement pour la creation de votre compte client, et (c) notre interet legitime pour l'amelioration de nos services et la prevention de la fraude.",
      },
      {
        heading: "4. Finalites du traitement",
        text: "Vos donnees sont utilisees pour : traiter et suivre vos commandes, gerer votre compte client, vous envoyer les emails transactionnels (confirmation de commande, notification d'expedition), repondre a vos demandes de support, et ameliorer la qualite de nos services. Nous ne vendons, ne louons et ne partageons jamais vos donnees a des fins publicitaires ou commerciales.",
      },
      {
        heading: "5. Sous-traitants et transferts",
        text: "Pour assurer nos services, nous faisons appel aux sous-traitants suivants : Stripe (paiement securise, certifie PCI DSS niveau 1), Resend (envoi d'emails transactionnels), Vercel (hebergement du site), et Neon (base de donnees). Ces prestataires sont situes dans l'UE et/ou aux Etats-Unis et offrent des garanties conformes au RGPD (clauses contractuelles types, Data Privacy Framework). Aucun transfert de donnees n'est effectue vers des pays ne disposant pas d'un niveau de protection adequat sans garanties appropriees.",
      },
      {
        heading: "6. Duree de conservation",
        text: "Les donnees liees a votre compte sont conservees tant que votre compte est actif. Les donnees de commandes sont conservees pendant la duree legale obligatoire (10 ans a des fins comptables). En cas de suppression de votre compte, vos donnees personnelles sont effacees sous 30 jours, a l'exception des donnees que nous sommes legalement tenus de conserver.",
      },
      {
        heading: "7. Securite des donnees",
        text: "Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees : chiffrement SSL/TLS de toutes les communications, hashage des mots de passe (bcrypt), paiements geres par Stripe (certifie PCI DSS niveau 1), acces restreint aux donnees personnelles, hebergement securise sur infrastructure Vercel. Vos donnees bancaires ne sont jamais stockees sur nos serveurs.",
      },
      {
        heading: "8. Cookies",
        text: "Nous utilisons exclusivement des cookies essentiels au fonctionnement du site : session d'authentification, contenu du panier (stocke localement dans votre navigateur) et preference de langue. Aucun cookie de tracking, d'analyse ou de publicite n'est utilise. Aucun consentement supplementaire n'est donc requis pour ces cookies strictement necessaires, conformement a la directive ePrivacy.",
      },
      {
        heading: "9. Vos droits (RGPD)",
        text: "Conformement au Reglement General sur la Protection des Donnees (UE 2016/679), vous disposez des droits suivants : droit d'acces a vos donnees personnelles, droit de rectification des donnees inexactes, droit a l'effacement (« droit a l'oubli »), droit a la limitation du traitement, droit a la portabilite de vos donnees, droit d'opposition au traitement. Pour exercer ces droits, contactez-nous a contact@mythael.com. Nous repondrons dans un delai maximum de 30 jours. Vous avez egalement le droit d'introduire une reclamation aupres de l'autorite de controle competente (CNIL en France : www.cnil.fr).",
      },
      {
        heading: "10. Mineurs",
        text: "Notre site ne s'adresse pas aux personnes de moins de 16 ans. Nous ne collectons pas sciemment de donnees personnelles de mineurs. Si vous etes parent ou tuteur et pensez que votre enfant nous a fourni des donnees personnelles, contactez-nous pour que nous les supprimions.",
      },
      {
        heading: "11. Modifications",
        text: "Nous nous reservons le droit de modifier cette politique de confidentialite a tout moment. Toute modification sera publiee sur cette page avec une date de mise a jour. Nous vous encourageons a consulter cette page regulierement.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 10, 2026",
    sections: [
      {
        heading: "1. Data controller",
        text: "The data controller for your personal data is Mythael, reachable at contact@mythael.com. For any questions regarding the protection of your data, you can contact us at this address.",
      },
      {
        heading: "2. Data collected",
        text: "We only collect data strictly necessary for processing your orders and managing your account: name, email address, shipping address, language preference, and order history. Payment data (card number, etc.) is processed exclusively by Stripe and never passes through our servers.",
      },
      {
        heading: "3. Legal basis for processing",
        text: "The processing of your data is based on: (a) the performance of the sales contract for order-related data, (b) your consent for the creation of your customer account, and (c) our legitimate interest in improving our services and preventing fraud.",
      },
      {
        heading: "4. Purposes of processing",
        text: "Your data is used to: process and track your orders, manage your customer account, send transactional emails (order confirmation, shipping notification), respond to your support requests, and improve the quality of our services. We never sell, rent, or share your data for advertising or commercial purposes.",
      },
      {
        heading: "5. Sub-processors and transfers",
        text: "To provide our services, we use the following sub-processors: Stripe (secure payment, PCI DSS Level 1 certified), Resend (transactional email delivery), Vercel (website hosting), and Neon (database). These providers are located in the EU and/or the United States and provide GDPR-compliant guarantees (Standard Contractual Clauses, Data Privacy Framework). No data transfer is made to countries without adequate protection levels without appropriate safeguards.",
      },
      {
        heading: "6. Data retention",
        text: "Account-related data is retained as long as your account is active. Order data is retained for the legally required period (10 years for accounting purposes). Upon account deletion, your personal data is erased within 30 days, except for data we are legally required to retain.",
      },
      {
        heading: "7. Data security",
        text: "We implement appropriate technical and organizational measures to protect your data: SSL/TLS encryption of all communications, password hashing (bcrypt), payments handled by Stripe (PCI DSS Level 1 certified), restricted access to personal data, secure hosting on Vercel infrastructure. Your banking data is never stored on our servers.",
      },
      {
        heading: "8. Cookies",
        text: "We exclusively use essential cookies for site functionality: authentication session, cart contents (stored locally in your browser), and language preference. No tracking, analytics, or advertising cookies are used. No additional consent is therefore required for these strictly necessary cookies, in accordance with the ePrivacy Directive.",
      },
      {
        heading: "9. Your rights (GDPR)",
        text: "In accordance with the General Data Protection Regulation (EU 2016/679), you have the following rights: right of access to your personal data, right to rectification of inaccurate data, right to erasure ('right to be forgotten'), right to restriction of processing, right to data portability, right to object to processing. To exercise these rights, contact us at contact@mythael.com. We will respond within a maximum of 30 days. You also have the right to lodge a complaint with the competent supervisory authority (CNIL in France: www.cnil.fr).",
      },
      {
        heading: "10. Minors",
        text: "Our site is not intended for persons under 16 years of age. We do not knowingly collect personal data from minors. If you are a parent or guardian and believe your child has provided us with personal data, contact us so we can delete it.",
      },
      {
        heading: "11. Changes",
        text: "We reserve the right to modify this privacy policy at any time. Any changes will be published on this page with an updated date. We encourage you to review this page regularly.",
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
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {c.lastUpdated}
      </p>
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
