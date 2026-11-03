import type { FicheCcn } from "../types";

/**
 * IDCC 1486 — Bureaux d'études techniques, cabinets d'ingénieurs-conseils,
 * sociétés de conseils (« Syntec »).
 *
 * BROUILLON : contenu saisi de mémoire pour tester l'outil. Chaque valeur doit
 * être relue sur le texte en vigueur (Légifrance, base KALI) avant usage.
 * La numérotation des articles suit la version consolidée issue de l'avenant
 * n° 46 du 16 juillet 2021 quand elle est connue, sinon la numérotation d'origine.
 */
export const FICHE_1486: FicheCcn = {
  idcc: "1486",
  nomUsage: "Syntec",
  brochure: "3018",
  fiabilite: "brouillon",
  maj: "2026-11-03",
  resume:
    "Maintien de salaire employeur dès un an d'ancienneté, différencié ETAM / ingénieurs et cadres. Régime de prévoyance de branche obligatoire pour tous les salariés (accord du 27 mars 1997), complété par l'obligation 1,50 % tranche A pour les cadres.",

  populations: [
    { id: "etam", label: "ETAM", detail: "Employés, techniciens et agents de maîtrise" },
    { id: "cadres", label: "Ingénieurs et cadres", detail: "IC" },
    { id: "autre", label: "Enquêteurs", detail: "Chargés d'enquêtes, CEIGA et enquêteurs vacataires (annexe IV)" },
  ],

  presentation: {
    dateSignature: "15/12/1987",
    dateExtension: "13/04/1988 (J.O. du 27/04/1988)",
    etendue: true,
    niveau: "nationale",
    actualisations: [
      "Avenant n° 46 du 16/07/2021 modifié, étendu le 05/04/2023 (J.O. du 28/04/2023) et applicable à compter du 01/05/2023 : refonte et renumérotation du texte.",
      "Avenant n° 1 du 27/10/2022 à l'accord du 16/12/1991 relatif aux enquêteurs (annexe IV), étendu le 22/05/2023 (J.O. du 03/06/2023) et applicable à compter du 01/07/2023.",
      "Avenant n° 48 du 28/05/2025 relatif à la modification du champ d'application professionnel (en cours d'extension, à vérifier).",
    ],
    derniereVeille: "03/11/2026",
  },

  champApplication: {
    textesReference: [
      "Article 1er de la convention collective nationale du 15 décembre 1987, tel que modifié par l'avenant n° 46 du 16 juillet 2021.",
      "Avenant n° 48 du 28 mai 2025 relatif au champ d'application professionnel (à vérifier).",
    ],
    territorial: "Ensemble du territoire national, y compris les départements et régions d'outre-mer.",
    professionnel: {
      intro:
        "La présente convention collective s'applique aux salariés des entreprises dont l'activité principale exercée est l'ingénierie, les cabinets d'ingénieurs-conseils, les études et le conseil, les services numériques, l'évènementiel, la traduction et l'interprétation.",
      groupes: [
        {
          titre: "Numérique",
          codes: [
            { code: "5812Z", activite: "Édition de répertoires et de fichiers d'adresses" },
            { code: "5821Z", activite: "Édition de jeux électroniques" },
            { code: "5829A", activite: "Édition de logiciels système et de réseau" },
            { code: "5829B", activite: "Édition de logiciels outils de développement et de langages" },
            { code: "5829C", activite: "Édition de logiciels applicatifs" },
            { code: "6201Z", activite: "Programmation informatique" },
            { code: "6202A", activite: "Conseil en systèmes et logiciels informatiques" },
            { code: "6202B", activite: "Tierce maintenance de systèmes et d'applications informatiques" },
            { code: "6203Z", activite: "Gestion d'installations informatiques" },
            { code: "6209Z", activite: "Autres activités informatiques" },
            { code: "6311Z", activite: "Traitement de données, hébergement et activités connexes" },
            { code: "6312Z", activite: "Portails internet" },
          ],
        },
        {
          titre: "Ingénierie",
          codes: [
            { code: "7112B", activite: "Ingénierie, études techniques" },
            { code: "7120B", activite: "Analyses, essais et inspections techniques" },
            { code: "7490B", activite: "Activités spécialisées, scientifiques et techniques diverses" },
          ],
        },
        {
          titre: "Conseil",
          codes: [
            { code: "7021Z", activite: "Conseil en relations publiques et communication" },
            { code: "7022Z", activite: "Conseil pour les affaires et autres conseils de gestion" },
            { code: "7320Z", activite: "Études de marché et sondages" },
          ],
        },
        {
          titre: "Évènementiel",
          codes: [{ code: "8230Z", activite: "Organisation de foires, salons professionnels et congrès" }],
        },
        {
          titre: "Traduction et interprétation",
          codes: [{ code: "7430Z", activite: "Traduction et interprétation" }],
        },
      ],
    },
    personnels: [
      {
        titre: "Personnels enquêteurs",
        texte:
          "Les chargés d'enquêtes, les chargés d'enquêtes intermittents à garantie annuelle (CEIGA) et les enquêteurs vacataires des instituts d'études et sondages relèvent de l'annexe IV (accord du 16 décembre 1991 modifié).",
      },
    ],
    fusion: [
      "Aucune fusion de branche en cours. La branche a absorbé par le passé des champs voisins (foires et salons, traduction) par extension de son article 1er.",
    ],
  },

  rubriques: [
    {
      theme: "conditions_travail",
      precisions: [
        {
          population: "autre",
          texte:
            "Chargés d'enquêtes (CE) : application des dispositions relatives aux ETAM (coefficient du 1er niveau de la grille ETAM) ainsi que de dispositions spécifiques. CEIGA et enquêteurs vacataires : dispositions spécifiques de l'annexe IV.",
        },
      ],
      dispositions: [
        {
          id: "contrat",
          titre: "Contrat de travail",
          populations: ["etam", "cadres"],
          reference: { article: "Article 3.2", modifiePar: "Avenant n° 2 du 27/10/2022", etendu: "05/04/2023 (J.O. du 28/04/2023)", applicable: "01/05/2023" },
          blocs: [
            { type: "texte", contenu: "Remise au salarié au moment de son engagement d'un contrat de travail comportant notamment les indications suivantes :" },
            {
              type: "liste",
              items: [
                "durée du contrat,",
                "date d'entrée dans l'entreprise,",
                "fonction occupée,",
                "classification et coefficient hiérarchique,",
                "lieu d'emploi,",
                "période d'essai, le cas échéant,",
                "montant du salaire mensuel et/ou annuel,",
                "autres éléments éventuels de rémunération directs ou indirects,",
                "clause de mobilité géographique, le cas échéant.",
              ],
            },
            { type: "texte", contenu: "Des mentions spécifiques doivent être ajoutées notamment en cas de travail à temps partiel, de contrat à durée déterminée ou de forfait en jours ou en heures." },
          ],
        },
        {
          id: "essai",
          titre: "Période d'essai",
          populations: ["etam", "cadres"],
          reference: { article: "Article 3.3", modifiePar: "Avenant n° 46 du 16/07/2021", etendu: "05/04/2023 (J.O. du 28/04/2023)", applicable: "01/05/2023" },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Durée initiale ETAM", loi: "2 mois (employés), 3 mois (agents de maîtrise, techniciens)", ccn: "2 mois pour les ETAM, quelle que soit la position (à confirmer)" },
                { point: "Durée initiale ingénieurs et cadres", loi: "4 mois", ccn: "3 mois" },
                { point: "Renouvellement", loi: "Une fois, si accord de branche étendu le prévoit", ccn: "Une fois, par accord écrit des parties, pour une durée au plus égale à la période initiale" },
                { point: "Délai de prévenance", loi: "Articles L. 1221-25 et L. 1221-26 du Code du travail", ccn: "Délais légaux" },
              ],
            },
          ],
        },
        {
          id: "preavis",
          titre: "Préavis suite à démission",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.1", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Population", "Ancienneté", "Préavis"],
              lignes: [
                ["ETAM", "Moins de 2 ans", "1 mois"],
                ["ETAM", "2 ans et plus", "2 mois"],
                ["Ingénieurs et cadres", "Toute ancienneté", "3 mois"],
              ],
            },
            { type: "texte", contenu: "Le préavis court à compter de la notification. Pendant le préavis, le salarié peut s'absenter pour recherche d'emploi dans les conditions fixées par la convention." },
          ],
        },
        {
          id: "anciennete",
          titre: "Notion d'ancienneté",
          populations: ["tous"],
          reference: { article: "Article 3.6", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "texte",
              contenu:
                "L'ancienneté s'entend du temps de présence continue dans l'entreprise au titre du contrat en cours, y compris les périodes de suspension assimilées à du temps de travail effectif. Les périodes antérieures chez le même employeur sont reprises quand le contrat a été rompu puis renoué dans les conditions prévues par le texte.",
            },
          ],
        },
        {
          id: "teletravail",
          titre: "Télétravail",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord relatif au télétravail (branche)", applicable: "À vérifier" },
          blocs: [
            { type: "texte", contenu: "Le télétravail repose sur le volontariat et la réversibilité. L'accord de branche fixe un cadre : formalisation, plages de joignabilité, prise en charge des frais, droit à la déconnexion. Les modalités précises relèvent de l'accord d'entreprise ou de la charte." },
          ],
        },
      ],
    },
    {
      theme: "conges",
      dispositions: [
        {
          id: "cp",
          titre: "Congés payés annuels",
          populations: ["etam", "cadres"],
          reference: { article: "Article 5.1", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Durée", loi: "2,5 jours ouvrables par mois (30 jours ouvrables)", ccn: "25 jours ouvrés par an, période de référence du 1er juin au 31 mai" },
                { point: "Congés d'ancienneté ETAM", loi: "Aucun", ccn: "1 jour ouvré par période de 5 ans d'ancienneté, dans la limite de 4 jours" },
                { point: "Congés d'ancienneté IC", loi: "Aucun", ccn: "1 jour après 5 ans, 2 après 10 ans, 3 après 15 ans, 4 après 20 ans" },
              ],
            },
          ],
        },
        {
          id: "exceptionnels",
          titre: "Congés exceptionnels pour évènements familiaux",
          populations: ["tous"],
          reference: { article: "Article 5.3", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Évènement", "Jours ouvrés"],
              lignes: [
                ["Mariage ou PACS du salarié", "4"],
                ["Mariage d'un enfant", "1"],
                ["Naissance ou adoption", "3"],
                ["Décès du conjoint, du partenaire ou d'un enfant", "Durée légale (au moins 3, 12 pour un enfant)"],
                ["Décès du père, de la mère, d'un frère ou d'une sœur", "3"],
              ],
            },
            { type: "texte", contenu: "Jours pris au moment de l'évènement, sans condition d'ancienneté, n'entraînant pas de réduction de rémunération. Si la loi est plus favorable, la durée légale s'applique." },
          ],
        },
        {
          id: "feries",
          titre: "Jours fériés",
          populations: ["tous"],
          reference: { article: "Article 5.4" },
          blocs: [
            { type: "texte", contenu: "Les jours fériés légaux sont chômés et payés sans condition d'ancienneté. Le 1er mai suit le régime légal. Le travail d'un jour férié ouvre droit à une majoration ou à un repos compensateur selon les dispositions de l'accord sur la durée du travail." },
          ],
        },
      ],
    },
    {
      theme: "duree_travail",
      dispositions: [
        {
          id: "modalites",
          titre: "Modalités d'organisation du temps de travail",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 22/06/1999 relatif à la durée du travail, modifié par l'avenant du 01/04/2014", etendu: "26/06/2014 (J.O. du 04/07/2014)" },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Modalité", "Population", "Principe"],
              lignes: [
                ["Modalité 1 – Standard", "ETAM et IC", "35 heures hebdomadaires, heures supplémentaires au-delà"],
                ["Modalité 2 – Réalisation de missions", "IC (et ETAM sous conditions)", "Forfait hebdomadaire de 38 h 30, rémunération au moins égale à 115 % du minimum conventionnel, au plus 2 fois le plafond de la Sécurité sociale (à confirmer)"],
                ["Modalité 3 – Réalisation de missions avec autonomie complète", "IC position 3 ou rémunération ≥ 2 PASS", "Forfait annuel en jours, 218 jours maximum, suivi de la charge de travail"],
              ],
            },
            { type: "texte", contenu: "Le forfait annuel en jours (avenant du 1er avril 2014) impose un entretien annuel sur la charge de travail, un décompte des jours et un dispositif d'alerte. Les conditions d'éligibilité ont été resserrées par la jurisprudence." },
          ],
        },
      ],
    },
    {
      theme: "retraite",
      dispositions: [
        {
          id: "indemnite-retraite",
          titre: "Indemnité de départ à la retraite",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.5", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Départ volontaire, ancienneté", loi: "1/2 mois après 10 ans, 1 mois après 15 ans, 1,5 mois après 20 ans, 2 mois après 30 ans", ccn: "Barème conventionnel par tranche d'ancienneté, comparé au légal, le plus favorable s'applique (valeurs à reprendre sur le texte)" },
                { point: "Mise à la retraite par l'employeur", loi: "Indemnité légale de licenciement", ccn: "Indemnité conventionnelle de licenciement" },
              ],
            },
          ],
        },
      ],
    },
    {
      theme: "licenciement",
      dispositions: [
        {
          id: "preavis-lic",
          titre: "Préavis de licenciement",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.1", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Population", "Ancienneté", "Préavis"],
              lignes: [
                ["ETAM", "Moins de 2 ans", "1 mois"],
                ["ETAM", "2 ans et plus", "2 mois"],
                ["Ingénieurs et cadres", "Toute ancienneté", "3 mois"],
              ],
            },
          ],
        },
        {
          id: "indemnite-lic",
          titre: "Indemnité de licenciement",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.2 (ETAM) et 4.3 (IC)", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Ancienneté minimale", loi: "8 mois", ccn: "2 ans" },
                { point: "ETAM", loi: "1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà", ccn: "0,25 mois de salaire par année de présence, plafonnée à 10 mois" },
                { point: "Ingénieurs et cadres", loi: "1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà", ccn: "1/3 de mois de salaire par année de présence, plafonnée à 12 mois" },
                { point: "Salaire de référence", loi: "Moyenne des 12 ou des 3 derniers mois", ccn: "Moyenne des 12 derniers mois, primes incluses au prorata" },
              ],
            },
            { type: "texte", contenu: "L'indemnité la plus favorable entre le légal et le conventionnel s'applique. Le licenciement pour faute grave ou lourde prive de l'indemnité." },
          ],
        },
      ],
    },
    {
      theme: "maladie_accident",
      dispositions: [
        {
          id: "garantie-absence",
          titre: "Garantie d'emploi et absences",
          populations: ["etam", "cadres"],
          reference: { article: "Article 6.1", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            { type: "texte", contenu: "Les absences pour maladie ou accident justifiées dans les 48 heures et constatées par certificat médical ne constituent pas une rupture du contrat. Au-delà de la durée d'indemnisation, l'employeur qui doit pourvoir au remplacement peut rompre le contrat dans les conditions prévues par le texte, avec priorité de réembauche." },
          ],
        },
        {
          id: "loi-ccn-maladie",
          titre: "Comparatif loi / convention",
          populations: ["etam", "cadres"],
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Ancienneté requise", loi: "1 an", ccn: "1 an" },
                { point: "Carence", loi: "7 jours (maladie), aucune (accident du travail)", ccn: "Aucune carence conventionnelle (à confirmer)" },
                { point: "ETAM, 1 à 5 ans", loi: "30 jours à 90 %, puis 30 jours à 66,66 %", ccn: "1 mois à 100 %, puis 2 mois à 80 %" },
                { point: "ETAM, plus de 5 ans", loi: "40 à 90 jours à 90 % selon ancienneté, puis autant à 66,66 %", ccn: "2 mois à 100 %, puis 1 mois à 80 %" },
                { point: "Ingénieurs et cadres", loi: "Mêmes barèmes légaux", ccn: "3 mois à 100 % dès 1 an, relais prévoyance" },
              ],
            },
          ],
        },
      ],
    },
    {
      theme: "maternite",
      dispositions: [
        {
          id: "maternite",
          titre: "Congé de maternité",
          populations: ["etam", "cadres"],
          reference: { article: "Article 6.3", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Durée", loi: "16 semaines (6 avant, 10 après)", ccn: "Durée légale" },
                { point: "Rémunération pendant le congé", loi: "IJSS seules", ccn: "Maintien du salaire plein, sous déduction des IJSS, après 1 an d'ancienneté" },
                { point: "Aménagement d'horaire", loi: "Aucun", ccn: "Réduction d'horaire possible à partir du 3e mois de grossesse, sans perte de salaire (à confirmer)" },
              ],
            },
          ],
        },
        {
          id: "paternite",
          titre: "Congé de paternité et d'accueil de l'enfant",
          populations: ["tous"],
          blocs: [
            { type: "texte", contenu: "Durée légale (25 jours calendaires, 32 en cas de naissances multiples). Pas de maintien de salaire conventionnel au-delà des IJSS, sauf accord d'entreprise plus favorable (à confirmer)." },
          ],
        },
      ],
    },
    {
      theme: "prevoyance",
      dispositions: [
        {
          id: "textes-prev",
          titre: "Régime de prévoyance : textes de référence",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 27/03/1997 et ses annexes, étendus le 31/03/1999 (J.O. du 10/04/1999)", applicable: "01/04/2010 pour l'avenant n° 4" },
          blocs: [
            {
              type: "liste",
              items: [
                "Avenant n° 4 du 15/07/2009, étendu le 10/03/2010 (J.O. du 17/03/2010), applicable à compter du 01/04/2010.",
                "Avenant n° 5 du 12/09/2012, applicable à compter du 01/01/2013, étendu le 26/04/2013 (J.O. du 04/05/2013).",
                "Avenant n° 6 du 12/09/2012, étendu le 26/04/2013 (J.O. du 04/05/2013), en vigueur le 01/06/2013.",
                "Avenant n° 7 du 24/04/2013, applicable le 1er jour du mois civil suivant la publication de son arrêté d'extension.",
                "Avenant n° 8 du 16/12/2025, étendu le 21/05/2026 (J.O. du 05/06/2026), à l'exclusion de certains termes, en vigueur le 01/07/2026 (à vérifier).",
              ],
            },
            { type: "texte", contenu: "Les entreprises en création disposent d'un délai de 3 mois pour satisfaire aux garanties, auprès de tout organisme de leur choix." },
          ],
        },
        {
          id: "beneficiaires",
          titre: "Catégorie bénéficiaire",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 27/03/1997, art. 2" },
          blocs: [
            { type: "texte", contenu: "Ensemble des personnels employés, techniciens, agents de maîtrise, ingénieurs et cadres, à savoir :" },
            {
              type: "liste",
              items: [
                "les salariés inscrits à l'effectif de l'entreprise, y compris en cas de suspension du contrat de travail, notamment pour maladie ou congé parental ;",
                "les salariés atteints d'une pathologie survenue antérieurement à la date du présent régime ;",
                "les anciens salariés inscrits comme demandeurs d'emploi ou bénéficiaires des allocations de préretraite FNE, s'ils souscrivent dans les 6 mois qui suivent la rupture de leur contrat ;",
                "le conjoint ou concubin, bénéficiaire du capital décès s'il adhère dans les 6 mois de l'évènement au titre du régime pour les seules garanties décès et rente éducation.",
              ],
            },
          ],
        },
        {
          id: "organisme",
          titre: "Organisme gestionnaire",
          populations: ["etam", "cadres"],
          blocs: [
            { type: "texte", contenu: "Absence d'organisme désigné. Les désignations antérieures (Malakoff Médéric Prévoyance pour les garanties, OCIRP pour la rente éducation) couvraient une période de 5 ans maximum expirée depuis le 31/03/2015. L'entreprise choisit librement son assureur, sous réserve de garanties au moins équivalentes." },
          ],
        },
        {
          id: "salaire-ref",
          titre: "Salaire de référence et revalorisation",
          populations: ["etam", "cadres"],
          blocs: [
            { type: "texte", contenu: "Salaire brut des 12 mois civils précédant l'évènement, tranches A et B, primes incluses. Les prestations en cours de service sont revalorisées selon les décisions de l'organisme assureur (à reprendre dans l'accord)." },
          ],
        },
        {
          id: "cadres-150",
          titre: "Cotisation prévoyance obligatoire des cadres (1,50 % TA)",
          populations: ["cadres"],
          reference: { modifiePar: "ANI du 17/11/2017 relatif à la prévoyance des cadres, art. 1er (ex-art. 7 CCN AGIRC 1947)" },
          blocs: [
            { type: "texte", contenu: "Cotisation à la charge exclusive de l'employeur, d'au moins 1,50 % de la tranche A, affectée en priorité à la couverture du risque décès (au moins la moitié). Distincte du régime de branche : à faire apparaître séparément sur le bulletin." },
          ],
        },
      ],
    },
    {
      theme: "formation",
      dispositions: [
        {
          id: "opco",
          titre: "Opérateur de compétences et contributions",
          populations: ["tous"],
          blocs: [
            { type: "texte", contenu: "La branche relève de l'OPCO Atlas. Contributions conventionnelles de formation en plus de la contribution légale : taux à reprendre dans l'accord de branche formation en vigueur." },
          ],
        },
      ],
    },
    {
      theme: "classifications",
      dispositions: [
        {
          id: "grille-etam",
          titre: "Grille ETAM",
          populations: ["etam"],
          reference: { modifiePar: "Avenant n° 46 du 16/07/2021 (annexe I)", applicable: "01/05/2023" },
          blocs: [
            { type: "texte", contenu: "Trois positions (1, 2, 3) subdivisées en niveaux (1.1 à 3.3), définies par critères classants : autonomie, responsabilité, complexité, connaissances requises. Coefficients de 240 à 500 (à confirmer)." },
          ],
        },
        {
          id: "grille-ic",
          titre: "Grille ingénieurs et cadres",
          populations: ["cadres"],
          reference: { modifiePar: "Avenant n° 46 du 16/07/2021 (annexe II)", applicable: "01/05/2023" },
          blocs: [
            { type: "texte", contenu: "Trois positions : 1 (débutants, 1.1 et 1.2), 2 (2.1 à 2.3), 3 (3.1 à 3.3). Coefficients de 95 à 270. La position 3 ouvre l'accès au forfait annuel en jours." },
          ],
        },
      ],
    },
    {
      theme: "salaires",
      dispositions: [
        {
          id: "minima",
          titre: "Salaires minimaux conventionnels",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Dernier avenant salaires en vigueur (à reprendre)", etendu: "À vérifier" },
          blocs: [
            { type: "texte", contenu: "ETAM : salaire minimal = valeur du point × coefficient + partie fixe. IC : salaire minimal = valeur du point × coefficient. Les minima sont annuels, vérifiés sur l'année civile, primes de vacances exclues. Les valeurs du point sont fixées par avenant et parfois en attente d'extension : vérifier l'arrêté avant paramétrage." },
          ],
        },
      ],
    },
    {
      theme: "primes",
      dispositions: [
        {
          id: "vacances",
          titre: "Prime de vacances",
          populations: ["etam", "cadres"],
          reference: { article: "Article 5.2", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023" },
          blocs: [
            { type: "texte", contenu: "L'ensemble des salariés bénéficie d'une prime de vacances d'un montant au moins égal à 10 % de la masse globale des indemnités de congés payés de l'entreprise, versée entre le 1er mai et le 31 octobre. Toute prime versée sur cette période peut en tenir lieu si elle est au moins équivalente." },
          ],
        },
        {
          id: "deplacements",
          titre: "Déplacements et frais",
          populations: ["etam", "cadres"],
          reference: { article: "Articles 7.1 et suivants" },
          blocs: [
            { type: "texte", contenu: "Remboursement des frais de déplacement sur justificatifs ou indemnités forfaitaires. Régime spécifique des déplacements de longue durée et à l'étranger (ordre de mission, conditions de retour)." },
          ],
        },
      ],
    },
    {
      theme: "autres",
      dispositions: [
        {
          id: "deconnexion",
          titre: "Droit à la déconnexion",
          populations: ["etam", "cadres"],
          blocs: [
            { type: "texte", contenu: "Les modalités d'exercice du droit à la déconnexion sont définies dans l'entreprise (accord ou charte). L'accord de branche sur le forfait jours impose des mesures de suivi des temps de repos." },
          ],
        },
      ],
    },
  ],

  maladieAccident: [
    {
      statut: "etam",
      libelleStatut: "ETAM",
      ancienneteRequise: "1 an dans l'entreprise",
      carence: "Aucune carence conventionnelle : maintien dès le premier jour d'absence indemnisé par la Sécurité sociale (à confirmer sur le texte).",
      tranches: [
        { anciennete: "De 1 à 5 ans", paliers: [{ duree: "1 mois", taux: "100 %" }, { duree: "2 mois", taux: "80 %" }] },
        { anciennete: "Plus de 5 ans", paliers: [{ duree: "2 mois", taux: "100 %" }, { duree: "1 mois", taux: "80 %" }] },
      ],
      base: "Salaire brut que le salarié aurait perçu s'il avait travaillé, sous déduction des IJSS et des prestations de prévoyance.",
      periodeReference: "Durées appréciées sur 12 mois consécutifs (toutes absences confondues).",
      conditions: [
        "Absence justifiée dans les 48 heures.",
        "Prise en charge par la Sécurité sociale.",
        "Soins reçus en France, dans l'UE ou en zone couverte par convention.",
      ],
      sources: [{ label: "CCN 1486, art. 6.2 « Maladie et accidents » (ex-art. 43)" }],
    },
    {
      statut: "cadres",
      libelleStatut: "Ingénieurs et cadres (IC)",
      ancienneteRequise: "1 an dans l'entreprise",
      carence: "Aucune carence conventionnelle (à confirmer sur le texte).",
      tranches: [{ anciennete: "Dès 1 an", paliers: [{ duree: "3 mois", taux: "100 %" }] }],
      base: "Appointements bruts, sous déduction des IJSS et des prestations de prévoyance ; relais par la prévoyance incapacité au-delà.",
      periodeReference: "Durées appréciées sur 12 mois consécutifs (toutes absences confondues).",
      conditions: ["Absence justifiée dans les 48 heures.", "Prise en charge par la Sécurité sociale."],
      sources: [{ label: "CCN 1486, art. 6.2 « Maladie et accidents » (ex-art. 43)" }],
    },
  ],
  prevoyance: [
    {
      statut: "tous",
      caractere: "obligatoire",
      garanties: [
        { nom: "Décès (toutes causes)", montant: "Capital exprimé en % du salaire annuel brut", precision: "Montant et majorations par enfant à reprendre dans l'accord." },
        { nom: "Incapacité temporaire", montant: "Indemnités journalières complémentaires aux IJSS", precision: "Prise d'effet en relais du maintien de salaire employeur ; franchise à reprendre dans l'accord." },
        { nom: "Invalidité", montant: "Rente selon catégorie 1re / 2e / 3e", precision: "Niveaux à reprendre dans l'accord." },
      ],
      cotisation: {
        taux: "Taux global à reprendre dans l'accord (distinct ETAM / IC)",
        assiette: "Tranches A et B",
        repartition: "Part employeur au moins égale à 50 % (à confirmer).",
      },
      notes: ["Régime de branche institué par l'accord du 27 mars 1997, étendu, annexé à la CCN.", "Libre choix de l'organisme depuis la fin des désignations."],
      sources: [{ label: "Accord du 27 mars 1997 relatif à la prévoyance (CCN 1486)" }],
    },
    {
      statut: "cadres",
      libelleStatut: "Ingénieurs et cadres (IC)",
      caractere: "obligation_cotisation",
      garanties: [{ nom: "Prévoyance « 1,50 % »", montant: "Cotisation employeur minimale de 1,50 % de la tranche A", precision: "Affectée en priorité au risque décès (au moins la moitié)." }],
      cotisation: { taux: "1,50 %", assiette: "Tranche A (jusqu'au PASS)", repartition: "100 % employeur" },
      sources: [{ label: "ANI du 17 novembre 2017 relatif à la prévoyance des cadres, art. 1er (ex-art. 7 CCN AGIRC 1947)" }],
    },
  ],
  vigilance: [
    "Vérifier l'ancienneté à la date du premier jour d'arrêt, pas à la date de paie.",
    "Les durées de maintien se cumulent sur 12 mois glissants : un second arrêt dans l'année entame le reliquat.",
    "Le maintien ETAM à 80 % s'applique après le palier à 100 %, pas en parallèle.",
    "Cadres : la cotisation 1,50 % TA est distincte du régime de branche et doit apparaître séparément sur le bulletin.",
  ],
  veille: [
    {
      date: "2026-10-09",
      theme: "conditions_travail",
      titre: "Champ d'application",
      texte: "Mise à jour suite à l'extension de l'avenant n° 48 du 28/05/2025 relatif à la modification du champ d'application professionnel.",
    },
    {
      date: "2026-09-15",
      theme: "autres",
      titre: "Primes et indemnités / Autres thèmes",
      texte: "Intégration de l'avenant n° 50 du 09/07/2026 relatif à la transition environnementale des entreprises.",
    },
    {
      date: "2026-06-05",
      theme: "prevoyance",
      titre: "Prévoyance",
      texte: "Extension de l'avenant n° 8 du 16/12/2025 à l'accord prévoyance (J.O. du 05/06/2026), entrée en vigueur le 01/07/2026.",
    },
  ],
  sources: [{ label: "Convention collective nationale du 15 décembre 1987 (IDCC 1486), brochure 3018" }],
};
