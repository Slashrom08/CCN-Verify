# CCN Verify

Plateforme de vérification des données conventionnelles pour les professionnels : un IDCC → une fiche
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

### Texte intégral (Légifrance, base KALI)

`npm run kali` (lancé automatiquement avant `npm run build` via `prebuild`) télécharge l'extraction
`@socialgouv/kali-data` depuis le registre npm (dump de l'API Légifrance réalisé par la fabrique numérique des
ministères sociaux, licence Apache 2.0, données DILA en Licence Ouverte), puis écrit :

- `public/kali/NNNN.json` — un fichier par IDCC (texte de base, textes attachés, textes salaires ; sections,
  articles en HTML, état, liens d'extension / modification). Non versionné, ~105 Mo pour 50 conventions.
- `src/data/kali-index.json` — index : IDCC → identifiant KALI, titre, nombre d'articles. Versionné.

La version de l'extraction est fixée dans `scripts/import-kali.mjs` (`KALI_DATA_VERSION` pour la surcharger).
L'extraction ne couvre que les conventions suivies par le Code du travail numérique (50 à ce jour) ; pour les
autres, il faudra l'API PISTE ou le dépôt complet de la DILA.

## Écrans

Interface classique : fond pastel uni, cartes blanches, un accent marine (`src/app/globals.css`, variables `--bg`, `--accent`…).

- `/app` : recherche (mot-clé, IDCC, numéro de brochure, nom d'usage), favoris, décryptages, chiffres, veille.
- `/app/ccn/NNNN` : en-tête (brochure, IDCC, nationale / étendue), trois onglets dans le hash de l'URL :
  `#presentation`, `#champ`, `#obligations`. L'onglet Obligations a le filtre populations (cases à cocher),
  la matrice thèmes × populations (barres fusionnées quand les dispositions sont identiques, cliquables),
  le sommaire latéral, et les dispositions avec bandes de couleur par population et ligne de référence
  « Article … modifié par … étendu le … applicable à compter du … ». Imprimable.
- Onglet « Texte intégral » (`src/components/ccn/TexteIntegral.tsx`) sur toute convention présente dans
  l'index KALI, avec ou sans fiche structurée : sommaire dépliable, état de chaque article, recherche par mots,
  lien Légifrance par article.
- Export Excel (`src/lib/ccn/export.ts`, exceljs chargé à la demande) : la fiche complète en cinq onglets
  (Résumé, Maladie-accident, Prévoyance, Dispositions, Champ NAF) et la liste des résultats de recherche.
- `/app/decryptage` : articles de fond.

La fiche 1486 (Syntec) est saisie sur le texte consolidé de Légifrance (avenant n° 46, accord prévoyance du 27 mars 1997, accord durée du travail du 22 juin 1999) ; chaque disposition renvoie à l'article.

## Alimentation des fiches (prochaine étape)

Le texte intégral est disponible pour 50 conventions (voir ci-dessus). La pipeline cible pour les fiches structurées :
pour chaque IDCC, isoler dans le texte KALI les articles « maladie – accident / indemnisation des absences », les
garanties de prévoyance et les thèmes suivis, puis produire un fichier `NNNN.ts` à relire. Pour couvrir les autres
conventions : API Légifrance via PISTE (gratuite sur inscription) ou dépôt complet de la DILA. Les bases éditoriales privées (synthèses d'éditeurs juridiques) ne sont pas des sources de l'outil : droits d'auteur
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
