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
- `src/lib/ccn/types.ts` — modèle d'une fiche :
  - `populations` : statuts distingués par la branche (ETAM, cadres, ouvriers…), avec libellé propre ;
  - `presentation` : dates de signature et d'extension, avenants qui actualisent le texte, dernière veille ;
  - `champApplication` : textes de référence, territorial, professionnel (groupes de codes NAF), personnels particuliers, fusions ;
  - `rubriques` : 15 thèmes fixes (`THEMES`), chacun avec des dispositions `{ titre, populations, reference, blocs }`.
    Un bloc est un texte, une liste, un tableau ou un comparatif `loi_ccn` (Code du travail / convention) ;
  - `maladieAccident` et `prevoyance` : saisie structurée des deux thèmes paie (paliers, garanties, cotisations),
    affichée en tête de ces thèmes ;
  - `veille` : fil des mises à jour de la fiche ; `fiabilite` (`verifie` | `brouillon`) ; sources.
- `src/lib/ccn/fiches/NNNN.ts` — une fiche par IDCC, enregistrée dans `fiches/index.ts`. Les IDCC sans fiche s'affichent
  « non renseignée » avec les liens Légifrance.
- `src/lib/decryptages.ts` — articles de fond affichés sur l'accueil de l'outil.

## Écrans

Interface classique : fond pastel uni, cartes blanches, un accent marine (`src/app/globals.css`, variables `--bg`, `--accent`…).

- `/app` : recherche (mot-clé, IDCC, numéro de brochure, nom d'usage), favoris, décryptages, chiffres, veille.
- `/app/ccn/NNNN` : en-tête (brochure, IDCC, nationale / étendue), trois onglets dans le hash de l'URL :
  `#presentation`, `#champ`, `#obligations`. L'onglet Obligations a le filtre populations (cases à cocher),
  la matrice thèmes × populations (barres fusionnées quand les dispositions sont identiques, cliquables),
  le sommaire latéral, et les dispositions avec bandes de couleur par population et ligne de référence
  « Article … modifié par … étendu le … applicable à compter du … ». Imprimable.
- Export Excel (`src/lib/ccn/export.ts`, exceljs chargé à la demande) : la fiche complète en cinq onglets
  (Résumé, Maladie-accident, Prévoyance, Dispositions, Champ NAF) et la liste des résultats de recherche.
- `/app/decryptage` : articles de fond.

La fiche 1486 (Syntec) est un **brouillon de démonstration** : les valeurs sont à relire sur le texte en vigueur.

## Alimentation des fiches (prochaine étape)

Les textes des conventions et des accords de prévoyance sont publics : base KALI sur Légifrance (API PISTE, gratuite sur
inscription, licence ouverte). La pipeline cible : pour chaque IDCC, récupérer le texte de base et les accords « prévoyance »,
isoler les articles « maladie – accident / indemnisation des absences » et les garanties, puis produire un fichier `NNNN.ts`
à relire. Les bases éditoriales privées (synthèses d'éditeurs juridiques) ne sont pas des sources de l'outil : droits d'auteur
et conditions d'utilisation.

## Déployer sur Netlify

1. Sur [app.netlify.com](https://app.netlify.com) : « Add new site » → « Import an existing project » → GitHub → dépôt
   `Slashrom08/CCN-Verify`. Choisir la branche à déployer (`main` ou la branche de travail).
2. Netlify détecte Next.js ; `netlify.toml` fixe la commande (`npm run build`) et Node 22. Rien à changer.
3. Avant le premier build, dans « Site configuration » → « Environment variables », ajouter :
   - `CCN_AUTH_USER` : identifiant à donner aux personnes autorisées
   - `CCN_AUTH_PASSWORD` : mot de passe associé
   - `AUTH_SESSION_SECRET` : chaîne aléatoire longue (ex. `openssl rand -hex 32`), sert à signer le cookie de session
4. « Deploy ». Le site est servi sur `https://<nom>.netlify.app` ; le nom se change dans « Site configuration » → « Site details ».

Chaque push sur la branche choisie redéploie automatiquement. Pour partager l'accès, transmettre l'URL et le couple
identifiant / mot de passe.

## Notes

- Codes 5100, 9998, 9999 : codes techniques DSN, sans texte conventionnel.
- Aucune base de données (V1). Même socle que Terra Verify : Next.js 16, Tailwind 4, déploiement Netlify.
