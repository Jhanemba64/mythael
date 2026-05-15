# Mythael — Handcrafted Fantasy Creations

Site e-commerce fantasy avec sytème de paiement via Stripe. Figurines, bijoux et accessoires JDR "artisanaux".

**Production** : https://mythael.vercel.app

---

## Stack technique

| Tech | Usage |
|------|-------|
| Next.js 16 | Framework (App Router) |
| shadcn/ui + Tailwind CSS | Composants UI + styling |
| Neon | Base de donnees PostgreSQL serverless |
| Drizzle ORM | ORM TypeScript |
| Stripe | Paiement (mode hosted checkout) |
| Resend | Emails transactionnels |
| Vercel Blob | Stockage images |
| next-intl | Internationalisation FR/EN |
| jose + bcryptjs | Auth (JWT cookies) |

---

## Installation locale

```bash
# Cloner le repo
git clone https://github.com/Jhanemba64/mythael.git
cd mythael

# Installer les dependances
npm install

# Copier les variables d'environnement
cp .env.local.example .env.local
# Remplir les valeurs dans .env.local (voir section ci-dessous)

# Pousser le schema vers la BDD
npx drizzle-kit push

# Injecter les produits (11 produits + 3 categories)
npx tsx src/db/seed.ts

# Lancer le serveur de dev
npm run dev
```

Le site est accessible sur http://localhost:3000

---

## Variables d'environnement (.env.local)

```env
# Database — Neon PostgreSQL
DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (emails)
RESEND_API_KEY=re_...

# Admin
ADMIN_PASSWORD=mythael-admin-2026
ADMIN_JWT_SECRET=une-chaine-aleatoire-longue

# Vercel Blob (images upload)
BLOB_READ_WRITE_TOKEN=

# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Commandes utiles

```bash
# Dev
npm run dev                    # Lancer le serveur de dev
npm run build                  # Build de production
npm run start                  # Lancer le build en local

# Base de donnees
npx drizzle-kit push           # Appliquer le schema a la BDD
npx drizzle-kit studio         # Ouvrir Drizzle Studio (GUI BDD)
npx tsx src/db/seed.ts         # Re-injecter les donnees (TRUNCATE + seed)

# Git workflow
git checkout dev               # Travailler sur dev
git checkout preprod            # Merger dev -> preprod pour tester
git merge dev
git checkout main               # Merger preprod -> main pour deployer
git merge preprod
git push                        # Vercel deploie automatiquement depuis main
```

---

## Branches

| Branche | Usage |
|---------|-------|
| `dev` | Developpement quotidien |
| `preprod` | Tests avant mise en production |
| `main` | Production — Vercel deploie automatiquement |

---

## Structure du projet

```
src/
├── app/
│   ├── [locale]/          # Pages publiques FR/EN (shop, cart, checkout, account...)
│   ├── admin/             # Panel admin (dashboard, produits, commandes)
│   ├── api/               # Routes API (checkout, webhook Stripe, upload)
│   └── actions/           # Server actions (auth, produits, commandes)
├── components/
│   ├── ui/                # Composants shadcn/ui
│   ├── layout/            # Header, Footer, LocaleSwitcher
│   ├── shop/              # ProductCard, CategoryFilter, AddToCart
│   ├── cart/              # CartProvider, CartSheet
│   └── shared/            # HeroBackground, ForestBackground, AmbientPlayer
├── db/
│   ├── schema.ts          # Schema Drizzle (tables)
│   ├── index.ts           # Connexion BDD
│   └── seed.ts            # Donnees initiales
├── i18n/                  # Config next-intl (routing, navigation)
├── lib/                   # Clients Stripe, Resend, auth
└── messages/              # Traductions FR/EN (JSON)
```

---

## Admin

- URL : `/admin/login`
- Mot de passe : defini dans `ADMIN_PASSWORD`
- Dashboard : stats, revenus, commandes recentes
- Produits : CRUD, upload images
- Commandes : voir details, marquer comme expedie (envoie email tracking)

---

## Paiement test

- Carte : `4242 4242 4242 4242`
- Date : n'importe quelle date future
- CVC : `123`

## Passer en production (vrai argent)

1. Activer le compte Stripe (identite, IBAN)
2. Remplacer les cles `sk_test_`/`pk_test_` par `sk_live_`/`pk_live_`
3. Creer un webhook live sur Stripe avec l'URL `https://mythael.vercel.app/api/webhooks/stripe`
4. Configurer Resend (verifier le domaine, ajouter `RESEND_API_KEY`)
5. Acheter et connecter le domaine mythael.com

---

## Fournisseurs

Les liens d'achat sont dans `src/db/seed.ts` en commentaires a cote de chaque produit. Flux :

1. Client passe commande sur Mythael
2. Tu recois la notification dans `/admin/orders`
3. Tu commandes le produit avec l'adresse du client
4. Ca livre directement chez le client
5. Tu marques la commande comme expediee dans l'admin (email tracking envoye)

---

## Musique

Musique d'ambiance : "Ravi de te revoir" par YannZ — Licence CC-BY 4.0
https://yannz41.itch.io
