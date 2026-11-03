# CCN Verify

Suivi des conventions collectives pour la paie, le SIRH et la protection sociale : un IDCC → une fiche
« Maladie – Accident » (maintien de salaire employeur) et « Prévoyance complémentaire » (décès, incapacité,
invalidité), déclinée par statut (cadres / non-cadres, ou statuts propres à la branche), chaque valeur citant
l'article source.

Un produit Katena Solutions, même famille que Terra Verify (géorisques), Sky Verify (météo) et Substance (portefeuille).
Nom de travail : à renommer dans `src/lib/brand.ts`.

## Démarrer

```bash
npm install
npm run dev -- -p 3600
```

Variables dans `.env.local` (voir `.env.example`) : `CCN_AUTH_USER`, `CCN_AUTH_PASSWORD`, `AUTH_SESSION_SECRET`.

- `/` vitrine
- `/login` connexion (cookie de session HMAC, 30 jours)
- `/app` recherche par IDCC ou mots du titre (protégé par `src/middleware.ts`)
- `/app/ccn/1486` fiche d'une convention

## Données

- `src/data/idcc.json` — liste officielle des IDCC (ministère du Travail, octobre 2024, 630 codes), extraite du PDF
  « Liste des conventions collectives et de leur code IDCC ». Régénérable avec `pdftotext -layout` + le script de parsing.
- `src/lib/ccn/types.ts` — modèle d'une fiche : `MaintienSalaire[]` et `PrevoyanceComplementaire[]`, un élément par statut,
  `fiabilite` (`verifie` | `brouillon`), sources.
- `src/lib/ccn/fiches/NNNN.ts` — une fiche par IDCC, enregistrée dans `fiches/index.ts`. Les IDCC sans fiche s'affichent
  « non renseignée » avec les liens Légifrance.

La fiche 1486 (Syntec) est un **brouillon de démonstration** : les valeurs sont à relire sur le texte en vigueur.

## Alimentation des fiches (prochaine étape)

Les textes des conventions et des accords de prévoyance sont publics : base KALI sur Légifrance (API PISTE, gratuite sur
inscription, licence ouverte). La pipeline cible : pour chaque IDCC, récupérer le texte de base et les accords « prévoyance »,
isoler les articles « maladie – accident / indemnisation des absences » et les garanties, puis produire un fichier `NNNN.ts`
à relire. Les bases éditoriales privées (synthèses d'éditeurs juridiques) ne sont pas des sources de l'outil : droits d'auteur
et conditions d'utilisation.

## Notes

- Codes 5100, 9998, 9999 : codes techniques DSN, sans texte conventionnel.
- Aucun déploiement, aucune base de données (V1). Même socle que Terra Verify : Next.js 16, Tailwind 4, Netlify prévu.
