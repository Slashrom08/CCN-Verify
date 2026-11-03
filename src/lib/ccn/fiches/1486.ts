import type { FicheCcn } from "../types";

const LF = (id: string) => `https://www.legifrance.gouv.fr/conv_coll/id/${id}`;

/**
 * IDCC 1486 — Bureaux d'études techniques, cabinets d'ingénieurs-conseils,
 * sociétés de conseils (« Syntec »).
 *
 * Saisie effectuée sur le texte consolidé publié sur Légifrance (base KALI,
 * extraction du 02/11/2026) : annexe 1 de l'avenant n° 46 du 16 juillet 2021
 * (articles 1.1 à 13.6), accord du 27 mars 1997 relatif à la prévoyance et son
 * annexe, accord du 22 juin 1999 relatif à la durée du travail. Chaque
 * disposition cite l'article et renvoie vers Légifrance.
 */
export const FICHE_1486: FicheCcn = {
  idcc: "1486",
  nomUsage: "Syntec",
  brochure: "3018",
  fiabilite: "verifie",
  maj: "2026-11-03",
  resume:
    "Convention refondue par l'avenant n° 46 du 16 juillet 2021 (étendu le 5 avril 2023, applicable au 1er mai 2023). Maintien de salaire employeur après un an d'ancienneté : 90 jours au total sur 12 mois (ETAM : 30 ou 60 jours à 100 % puis 80 % ; ingénieurs et cadres : 90 jours à 100 %), relais par le régime de prévoyance de branche (accord du 27 mars 1997) après 90 jours consécutifs.",

  populations: [
    { id: "etam", label: "ETAM", detail: "Employés, techniciens et agents de maîtrise (art. 1.2)" },
    { id: "cadres", label: "Ingénieurs et cadres", detail: "IC (art. 1.2)" },
    { id: "autre", label: "Enquêteurs", detail: "Chargés d'enquête, CEIGA et enquêteurs vacataires, annexe IV (accord du 16 décembre 1991)" },
  ],

  presentation: {
    dateSignature: "15/12/1987",
    dateExtension: "13/04/1988 (J.O. du 27/04/1988)",
    etendue: true,
    niveau: "nationale",
    actualisations: [
      "Avenant n° 46 du 16/07/2021 (révision complète : les articles 1.1 à 13.6 de son annexe 1 se substituent aux articles 1 à 84 du texte de 1987), étendu par arrêté du 05/04/2023 (J.O. du 28/04/2023), applicable à compter du 01/05/2023.",
      "Avenant n° 1 du 31/03/2022, avenant n° 2 du 27/10/2022 et avenant n° 3 du 13/12/2022 à l'avenant n° 46 (corrections et mises à jour).",
      "Avenant n° 1 du 27/10/2022 à l'accord du 16/12/1991 relatif aux enquêteurs (annexe IV).",
      "Avenant n° 48 du 28/05/2025 relatif au champ d'application professionnel au 1er janvier 2026 (codes NAF 2025), étendu par arrêté du 28/09/2026.",
      "Avenant n° 49 du 22/10/2025 relatif à la parentalité et aux évènements familiaux.",
      "Avenant n° 8 du 16/12/2025 à l'accord du 27/03/1997 relatif à la prévoyance lourde.",
    ],
    derniereVeille: "02/11/2026",
  },

  champApplication: {
    textesReference: [
      "Article 1.1 de la convention (annexe 1 de l'avenant n° 46), dans sa rédaction issue de l'avenant n° 48 du 28 mai 2025 (arrêté d'extension du 28 septembre 2026).",
      "Article 2 de l'avenant n° 46 du 16 juillet 2021 : champ territorial.",
      "Annexe V : liste des activités selon la nomenclature NAF 2025.",
    ],
    territorial: "Ensemble du territoire national (art. 2 de l'avenant n° 46 du 16 juillet 2021).",
    professionnel: {
      intro:
        "La convention s'applique aux entreprises dont l'activité principale exercée (APE) relève des secteurs du numérique, de l'ingénierie, du conseil et de l'évènementiel. L'activité principale est celle qui génère le chiffre d'affaires le plus important. Codes NAF 2025 visés par l'article 1.1 :",
      groupes: [
        {
          titre: "Édition de logiciels et jeux vidéo",
          codes: [
            { code: "58.21Y", activite: "Édition de jeux vidéo" },
            { code: "58.29Y", activite: "Édition d'autres logiciels" },
          ],
        },
        {
          titre: "Gestion des systèmes informatiques",
          codes: [
            { code: "62.10Y", activite: "Activités de programmation informatique" },
            { code: "62.20G", activite: "Conseil en systèmes et logiciels informatiques" },
            { code: "62.20H", activite: "Gestion d'installations informatiques et maintenance de systèmes et d'applications informatiques" },
            { code: "62.90Y", activite: "Autres activités de service informatique" },
            { code: "63.10Y", activite: "Infrastructure informatique, traitement de données, hébergement et activités connexes" },
            { code: "63.91Y", activite: "Activités de portail de recherche sur le web" },
          ],
        },
        {
          titre: "Conseil pour les affaires et de gestion",
          codes: [{ code: "70.20Y", activite: "Activités de conseil pour les affaires et autre conseil de gestion" }],
        },
        {
          titre: "Conseil technique et ingénierie spécialisée",
          codes: [
            { code: "71.12Y", activite: "Activités d'ingénierie et de conseil technique connexe" },
            { code: "71.20H", activite: "Analyses, essais et inspections techniques" },
          ],
        },
        {
          titre: "Conseil en études de marché et communication",
          codes: [
            { code: "73.20Y", activite: "Études de marché et sondages" },
            { code: "73.30Y", activite: "Activités de relations publiques et de communication" },
          ],
        },
        {
          titre: "Services spécialisés, scientifiques et techniques",
          codes: [
            { code: "74.30Y", activite: "Activités de traduction et d'interprétation" },
            { code: "74.99Y", activite: "Toutes les autres activités spécialisées, scientifiques et techniques" },
          ],
        },
        {
          titre: "Services de placement et gestion des ressources humaines",
          codes: [
            { code: "78.10Y", activite: "Activités des agences de placement de main-d'œuvre" },
            { code: "78.20H", activite: "Autre mise à disposition de ressources humaines" },
          ],
        },
        {
          titre: "Services de soutien et d'organisation d'évènements",
          codes: [
            { code: "68.20H", activite: "Location et gestion d'autres biens immobiliers propres ou loués (sous réserve du champ de la convention de l'immobilier, IDCC 1527)" },
            { code: "82.30Y", activite: "Organisation de salons professionnels et congrès" },
          ],
        },
      ],
    },
    personnels: [
      {
        titre: "Définition des populations (art. 1.2)",
        texte:
          "Sont ETAM les salariés dont les fonctions relèvent de la grille de classification de l'annexe 1, y compris les diplômés n'occupant pas un poste nécessitant leurs connaissances. Sont ingénieurs et cadres les diplômés ou praticiens dont les fonctions nécessitent la mise en œuvre de connaissances acquises par une formation supérieure ou une pratique professionnelle reconnue équivalente (classification de l'annexe 2).",
      },
      {
        titre: "Personnels enquêteurs (annexe IV)",
        texte:
          "Les chargés d'enquête, les chargés d'enquête intermittents à garantie annuelle (CEIGA) et les enquêteurs vacataires des instituts d'études et sondages relèvent de l'accord du 16 décembre 1991 (annexe IV), modifié par l'avenant n° 1 du 27 octobre 2022. Les enquêteurs vacataires sont exclus du régime de prévoyance de l'accord du 27 mars 1997 (art. 2).",
      },
    ],
    fusion: ["Aucune fusion de branche en cours. Le champ a été redéfini en codes NAF 2025 par l'avenant n° 48 du 28 mai 2025, applicable au 1er janvier 2026."],
  },

  rubriques: [
    {
      theme: "conditions_travail",
      precisions: [
        {
          population: "autre",
          texte: "Les enquêteurs relèvent de l'annexe IV (accord du 16 décembre 1991 modifié) : contrat, rémunération et absences y sont régis par des stipulations propres. Les dispositions ci-dessous concernent les ETAM et les ingénieurs et cadres.",
        },
      ],
      dispositions: [
        {
          id: "contrat",
          titre: "Contrat de travail",
          populations: ["etam", "cadres"],
          reference: { article: "Article 3.2", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", etendu: "05/04/2023 (J.O. du 28/04/2023)", applicable: "01/05/2023", url: LF("KALIARTI000047513823") },
          blocs: [
            { type: "texte", contenu: "Il est remis à tout salarié au moment de son engagement un contrat de travail comportant notamment :" },
            {
              type: "liste",
              items: [
                "la durée du contrat ;",
                "la date d'entrée dans l'entreprise ;",
                "la fonction occupée ;",
                "la classification et le coefficient hiérarchique ;",
                "le lieu d'emploi ;",
                "la période d'essai, le cas échéant ;",
                "le montant du salaire mensuel et/ou annuel ;",
                "les éventuels autres éléments de rémunération directs ou indirects ;",
                "la clause de mobilité géographique, le cas échéant.",
              ],
            },
            { type: "texte", contenu: "Des mentions spécifiques sont ajoutées en cas de temps partiel, de durée déterminée, de forfait en jours ou en heures. Visite d'information et de prévention dans les 3 mois de la prise de poste. L'employeur informe le salarié des textes conventionnels applicables à l'embauche et en tient un exemplaire à jour à disposition." },
          ],
        },
        {
          id: "essai",
          titre: "Période d'essai",
          populations: ["etam", "cadres"],
          reference: { article: "Article 3.4", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", etendu: "05/04/2023 (J.O. du 28/04/2023)", applicable: "01/05/2023", url: LF("KALIARTI000047513825") },
          blocs: [
            { type: "texte", contenu: "La période d'essai et son renouvellement ne se présument pas : ils sont stipulés dans la proposition d'embauche ou le contrat. Le renouvellement est exceptionnel et requiert l'accord écrit des deux parties." },
            {
              type: "tableau",
              colonnes: ["Population", "Coefficients", "Durée maximale", "Renouvellement maximal"],
              lignes: [
                ["ETAM", "240 à 250 (230 avant l'avenant n° 2 du 29/09/2022)", "2 mois", "2 mois"],
                ["ETAM", "275 à 500", "3 mois", "3 mois"],
                ["Ingénieurs et cadres", "95 à 270", "4 mois", "4 mois"],
              ],
            },
            {
              type: "tableau",
              titre: "Délais de prévenance en cas de rupture de la période d'essai",
              colonnes: ["Temps de présence", "À l'initiative de l'employeur", "À l'initiative du salarié"],
              lignes: [
                ["Inférieur à 8 jours", "24 heures", "24 heures"],
                ["Entre 8 jours et 1 mois", "48 heures", "24 heures"],
                ["Au-delà d'1 mois et jusqu'à 3 mois", "2 semaines", "48 heures"],
                ["Au-delà de 3 mois et jusqu'à 6 mois", "1 mois", "48 heures"],
                ["Au-delà de 6 mois et jusqu'à 8 mois", "6 semaines", "48 heures"],
              ],
            },
            { type: "texte", contenu: "La période d'essai, renouvellement inclus, n'est pas prolongée par le délai de prévenance : si l'employeur ne peut le respecter, le salarié perçoit une indemnité compensatrice (salaires et avantages jusqu'au terme du délai, congés payés compris). Pendant l'essai, 2 heures d'absence pour recherche d'emploi par jour ouvré entre la notification et la fin d'activité, non rémunérées si la rupture vient du salarié." },
            {
              type: "loi_ccn",
              lignes: [
                { point: "Durée initiale", loi: "Employés 2 mois, agents de maîtrise et techniciens 3 mois, cadres 4 mois", ccn: "ETAM 2 ou 3 mois selon le coefficient, ingénieurs et cadres 4 mois" },
                { point: "Renouvellement", loi: "Une fois si un accord de branche étendu le prévoit", ccn: "Une fois, pour une durée au plus égale à la durée initiale, par accord écrit" },
              ],
            },
          ],
        },
        {
          id: "anciennete",
          titre: "Notion d'ancienneté",
          populations: ["etam", "cadres"],
          reference: { article: "Article 3.7", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513829") },
          blocs: [
            { type: "texte", contenu: "L'ancienneté est le temps passé dans l'entreprise, c'est-à-dire le temps pendant lequel le salarié a été employé par le même employeur en une ou plusieurs fois, quels qu'aient été ses emplois. Sauf décision contraire de l'employeur, la durée des contrats rompus par démission ou licenciement pour faute grave est déduite." },
            {
              type: "liste",
              titre: "Périodes prises en compte",
              items: [
                "maladies et accidents inférieurs à 6 mois ininterrompus, quelle que soit l'ancienneté ;",
                "maternité et adoption ;",
                "congés de formation ;",
                "congés payés ou congés exceptionnels d'un commun accord ;",
                "détachements auprès d'une filiale ;",
                "suspensions ouvrant droit au maintien de l'ancienneté en application du Code du travail ;",
                "mobilisation, faits de guerre et périodes dans la réserve militaire.",
              ],
            },
          ],
        },
        {
          id: "modification",
          titre: "Modification du contrat de travail",
          populations: ["etam", "cadres"],
          reference: { article: "Article 3.5", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513827") },
          blocs: [
            { type: "texte", contenu: "Toute modification d'un élément essentiel du contrat est notifiée par écrit et requiert l'accord écrit du salarié. En cas de refus, l'employeur renonce ou licencie, en motivant le licenciement par la cause de la modification, non par le refus." },
          ],
        },
        {
          id: "secret",
          titre: "Secret professionnel, inventions et logiciels",
          populations: ["etam", "cadres"],
          reference: { article: "Articles 8.1 à 8.4", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023", url: LF("KALIARTI000047513885") },
          blocs: [
            { type: "texte", contenu: "Les salariés sont tenus au secret professionnel le plus absolu sur les plans, études, projets et logiciels de l'entreprise et de ses clients ; un manquement peut aller jusqu'au licenciement. Les inventions de mission appartiennent à l'employeur (prime forfaitaire de dépôt, rémunération supplémentaire en cas d'exploitation commerciale dans les 5 ans). Le logiciel créé dans l'exercice des fonctions appartient à l'employeur." },
          ],
        },
        {
          id: "hybride",
          titre: "Télétravail et organisation hybride",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 13/12/2022 relatif à l'organisation hybride du travail en entreprise (étendu)", url: LF("KALICONT000005635173") },
          blocs: [{ type: "texte", contenu: "L'accord de branche du 13 décembre 2022 encadre l'organisation hybride du travail. Le texte complet est consultable dans l'onglet « Texte intégral », rubrique Textes attachés." }],
        },
      ],
    },
    {
      theme: "conges",
      dispositions: [
        {
          id: "cp",
          titre: "Congés payés et congés d'ancienneté",
          populations: ["etam", "cadres"],
          reference: { article: "Article 5.1", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513845") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Durée", loi: "2,5 jours ouvrables par mois, 30 jours ouvrables par an", ccn: "25 jours ouvrés (30 jours ouvrables) après 1 an de présence continue, au prorata sinon ; prise possible dès l'embauche" },
                { point: "Congés d'ancienneté", loi: "Aucun", ccn: "1 jour ouvré après 5 ans, 2 après 10 ans, 3 après 15 ans, 4 après 20 ans, appréciés au 1er mai" },
                { point: "Fractionnement hors 1er mai – 31 octobre", loi: "2 jours si 6 jours ou plus, 1 jour si 3 à 5 jours (ouvrables)", ccn: "2 jours ouvrés si 5 jours ouvrés ou plus, 1 jour si 3 ou 4 ; aménageable ou supprimable par accord d'entreprise, sinon renonciation individuelle écrite" },
                { point: "Rappel pendant les congés", loi: "Aucune disposition", ccn: "2 jours de congés supplémentaires et remboursement des frais" },
              ],
            },
          ],
        },
        {
          id: "periode-cp",
          titre: "Période de référence et période de prise",
          populations: ["etam", "cadres"],
          reference: { article: "Articles 5.3 et 5.4", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513851") },
          blocs: [
            { type: "texte", contenu: "Acquisition du 1er juin de l'année précédente au 31 mai. Période de prise à compter du 1er mai sauf stipulation différente, de 13 mois au maximum ; tout report au-delà nécessite une demande écrite de l'employeur. Fermeture totale ou roulement après consultation du CSE ; date de fermeture communiquée au plus tard le 1er mars (fermeture entre mai et octobre) ou 2 mois avant. Modification des dates à moins de 2 mois du départ : accord des parties, frais remboursés si l'employeur en est à l'origine." },
          ],
        },
        {
          id: "assimilation",
          titre: "Périodes assimilées à du travail effectif pour les congés",
          populations: ["etam", "cadres"],
          reference: { article: "Article 5.5", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513853") },
          blocs: [
            { type: "liste", items: ["congés payés, maternité, paternité, accueil de l'enfant, adoption ;", "repos compensateur, jours de repos d'aménagement du temps de travail ;", "accident du travail ou maladie professionnelle dans la limite d'un an ininterrompu ;", "absences pour évènements familiaux, formation, congés économiques et syndicaux ;", "arrêts maladie ou accident donnant lieu à maintien de salaire conventionnel."] },
            { type: "texte", contenu: "Les congés acquis non pris pour l'un de ces motifs ne sont pas perdus : nouvelle période accordée par l'employeur, ou indemnité compensatrice en cas de rupture. Le salarié de retour de maladie, de maternité ou d'adoption a droit à la prise effective de ses congés." },
          ],
        },
        {
          id: "exceptionnels",
          titre: "Congés exceptionnels pour évènements familiaux",
          populations: ["etam", "cadres"],
          reference: { article: "Article 5.7", modifiePar: "Avenant n° 49 du 22/10/2025 relatif à la parentalité et aux évènements familiaux", url: LF("KALIARTI000053769478") },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Évènement", "Durée"],
              lignes: [
                ["Mariage ou Pacs du salarié", "4 jours ouvrés"],
                ["Mariage d'un enfant", "1 jour ouvré"],
                ["Naissance", "3 jours ouvrés consécutifs, à compter du jour de la naissance ou du premier jour ouvré suivant"],
                ["Adoption", "3 jours ouvrés consécutifs, dans les 7 jours précédant l'arrivée de l'enfant ou à compter de celle-ci"],
                ["Maladie ou accident d'un enfant (certificat médical)", "3 jours ouvrables non rémunérés ; 5 si l'enfant a moins d'un an ou si 3 enfants ou plus de moins de 16 ans"],
                ["Annonce d'un handicap, d'une pathologie chronique ou d'un cancer chez un enfant", "5 jours ouvrables"],
                ["Obsèques du conjoint, partenaire de Pacs ou concubin", "3 jours ouvrés"],
                ["Obsèques d'un enfant ou d'une personne à charge de moins de 25 ans", "14 jours ouvrés"],
                ["Obsèques d'un enfant de plus de 25 ans", "12 jours ouvrés"],
                ["Obsèques d'un enfant lui-même parent", "14 jours ouvrés"],
                ["Obsèques du père, de la mère, d'un frère, d'une sœur, d'un beau-parent", "3 jours ouvrés"],
                ["Obsèques d'un autre ascendant", "2 jours ouvrés"],
                ["Congé de deuil (enfant ou personne à charge de moins de 25 ans)", "8 jours ouvrables dans l'année suivant le décès, fractionnables"],
              ],
            },
            { type: "texte", contenu: "Absences non déductibles des congés et sans réduction de salaire (sauf mention « non rémunérés »). Si le décès survient pendant un déplacement, les frais de retour sont pris en charge (art. 11.4)." },
          ],
        },
        {
          id: "feries",
          titre: "Travail du dimanche et des jours fériés",
          populations: ["etam", "cadres"],
          reference: { article: "Article 6.3", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513923") },
          blocs: [
            { type: "texte", contenu: "Le caractère habituel s'apprécie par année civile et par salarié : à compter du 16e dimanche ou jour férié travaillé. Travail exceptionnel : majoration de 100 % (ou de la rémunération journalière pour les forfaits jours). Travail habituel : majoration de 25 %. Les avantages déjà accordés dans l'entreprise au même titre sont pris en compte. Stipulations propres au numérique (accord du 28 avril 2004) et à l'évènementiel (accord du 5 juillet 2001)." },
          ],
        },
      ],
    },
    {
      theme: "duree_travail",
      dispositions: [
        {
          id: "hs",
          titre: "Heures supplémentaires et contingent",
          populations: ["etam", "cadres"],
          reference: { article: "Article 6.2", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513868") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Majoration", loi: "25 % les 8 premières heures, 50 % au-delà (à défaut d'accord)", ccn: "Majorations légales" },
                { point: "Contingent annuel ETAM", loi: "220 heures", ccn: "130 heures" },
                { point: "Contingent annuel ingénieurs et cadres", loi: "220 heures", ccn: "Contingent réglementaire" },
              ],
            },
          ],
        },
        {
          id: "modalites",
          titre: "Modalités d'organisation du temps de travail (accord du 22 juin 1999)",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 22/06/1999 relatif à la durée du travail, modifié par l'avenant du 01/04/2014 et l'avenant n° 2 du 13/12/2022", etendu: "21/12/1999 pour l'accord initial", url: LF("KALIARTI000005851637") },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Modalité", "Population", "Principe"],
              lignes: [
                ["Modalités standard (chap. II, art. 2)", "ETAM ; ingénieurs et cadres possibles", "35 heures hebdomadaires, 1 610 heures par an au plus ; rémunération au moins égale au salaire de base d'un horaire de 39 heures à la date de l'accord"],
                ["Réalisation de missions (chap. II, art. 3)", "Ingénieurs et cadres rémunérés au moins au plafond de la Sécurité sociale ; autres catégories par accord d'entreprise", "Horaire pouvant varier dans la limite de 10 % d'un horaire de 35 heures, appointements forfaitaires, décompte en jours avec contrôle annuel"],
                ["Réalisation de missions avec autonomie complète (chap. II, art. 4)", "Responsabilités de management élargi, missions commerciales, de consultant, ou autonomie équivalente", "Forfait annuel de 218 jours maximum, journée de solidarité incluse ; rémunération au moins égale à 120 % du minimum conventionnel de la catégorie ; suivi de la charge, entretien annuel, droit à la déconnexion"],
              ],
            },
            { type: "texte", contenu: "Pour les salariés embauchés en cours d'année : jours à travailler = 218 × semaines travaillées / 47 (art. 4.3.1). Le texte complet de l'accord, ses chapitres modulation, compte épargne-temps et déconnexion sont dans l'onglet « Texte intégral »." },
          ],
        },
        {
          id: "nuit",
          titre: "Travail de nuit",
          populations: ["etam"],
          reference: { article: "Article 6.4", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513878") },
          blocs: [{ type: "texte", contenu: "Travail de nuit entre 21 heures et 7 heures. En cas de travail habituel de nuit, majoration de 25 % du taux horaire issu du salaire minimal hiérarchique, pour des heures comprises dans une période d'au moins 6 heures consécutives (mise en place subordonnée à un accord d'entreprise ou à l'autorisation de l'inspection du travail)." }],
        },
      ],
    },
    {
      theme: "retraite",
      dispositions: [
        {
          id: "depart",
          titre: "Départ et mise à la retraite",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.6", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513839") },
          blocs: [
            { type: "texte", contenu: "Départ volontaire : préavis de 1 mois jusqu'à 2 ans d'ancienneté, 2 mois à compter de 2 ans. Mise à la retraite entre 65 et 69 ans : interrogation écrite du salarié 3 mois avant l'âge du taux plein automatique, réponse dans le mois, renouvelable chaque année jusqu'à 69 ans. À 70 ans : mise à la retraite possible avec un préavis de 4 mois, le contrat prenant fin à la fin d'un mois civil." },
          ],
        },
        {
          id: "indemnite-retraite",
          titre: "Indemnité de départ et de mise à la retraite",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.8", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513843") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Départ volontaire", loi: "1/2 mois après 10 ans, 1 mois après 15 ans, 1,5 mois après 20 ans, 2 mois après 30 ans", ccn: "1 mois à 5 ans révolus, puis 1/5 de mois par année d'ancienneté supplémentaire à compter de la 6e année" },
                { point: "Mise à la retraite", loi: "Indemnité légale de licenciement", ccn: "Au moins l'indemnité conventionnelle de licenciement (art. 4.5)" },
                { point: "Salaire de référence", loi: "Moyenne des 12 ou des 3 derniers mois", ccn: "1/12 de la rémunération des 12 derniers mois, primes contractuelles incluses, hors majorations d'heures supplémentaires et indemnités de déplacement" },
              ],
            },
          ],
        },
        {
          id: "agirc",
          titre: "Retraite complémentaire",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.7", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023", url: LF("KALIARTI000044253075") },
          blocs: [{ type: "texte", contenu: "Adhésion obligatoire à une caisse de retraite complémentaire Agirc-Arrco, cotisation sur la totalité des rémunérations brutes, taux contractuel au moins égal au minimum Agirc-Arrco." }],
        },
      ],
    },
    {
      theme: "licenciement",
      dispositions: [
        {
          id: "preavis",
          titre: "Préavis (licenciement et démission)",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.2", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513833") },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Population", "Situation", "Préavis"],
              lignes: [
                ["ETAM", "Moins de 2 ans d'ancienneté", "1 mois"],
                ["ETAM", "Plus de 2 ans d'ancienneté", "2 mois"],
                ["ETAM", "Coefficients 400, 450 et 500, quelle que soit l'ancienneté", "2 mois"],
                ["Ingénieurs et cadres", "Toute ancienneté", "3 mois"],
              ],
            },
            { type: "texte", contenu: "Pas de préavis en cas de faute grave, faute lourde ou impossibilité de reclassement après inaptitude non professionnelle. Une durée différente peut être convenue. Recherche d'emploi : 6 jours ouvrés par mois, par demi-journées, fixés pour moitié par chaque partie, rémunérés en cas de licenciement (art. 4.3). Le salarié licencié peut quitter l'entreprise dès l'obtention d'un nouvel emploi (art. 4.4)." },
          ],
        },
        {
          id: "indemnite-lic",
          titre: "Indemnité de licenciement",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.5", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513839") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Ancienneté minimale", loi: "8 mois ininterrompus", ccn: "8 mois ininterrompus" },
                { point: "ETAM", loi: "1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà", ccn: "1/4 de mois par année jusqu'à 10 ans, 1/3 de mois par année après 10 ans" },
                { point: "Ingénieurs et cadres", loi: "1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà", ccn: "1/4 de mois par année si moins de 2 ans d'ancienneté ; 1/3 de mois par année à partir de 2 ans" },
                { point: "Salaire de référence", loi: "Moyenne des 12 ou des 3 derniers mois, la plus favorable", ccn: "1/12 de la rémunération des 12 derniers mois précédant la notification, primes contractuelles incluses, hors majorations d'heures supplémentaires et indemnités de déplacement ; années incomplètes au prorata" },
                { point: "Règle de comparaison", loi: "—", ccn: "L'employeur verse la plus élevée des deux indemnités, conventionnelle ou légale" },
              ],
            },
            { type: "texte", contenu: "Indemnité non due en cas de faute grave ou lourde. Elle s'ajoute à l'indemnité compensatrice de préavis." },
          ],
        },
        {
          id: "procedure",
          titre: "Procédure de rupture",
          populations: ["etam", "cadres"],
          reference: { article: "Article 4.1", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513831") },
          blocs: [{ type: "texte", contenu: "Licenciement notifié par lettre recommandée avec accusé de réception (date de première présentation = notification), rappelant la fonction, les motifs et le préavis ; entretien préalable avec possibilité d'assistance. Démission par écrit, volonté claire et non équivoque. Rupture conventionnelle selon les conditions légales et l'indemnisation minimale conventionnelle." }],
        },
      ],
    },
    {
      theme: "maladie_accident",
      dispositions: [
        {
          id: "justification",
          titre: "Justification de l'absence et contre-visite",
          populations: ["etam", "cadres"],
          reference: { article: "Article 9.1", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023", url: LF("KALIARTI000044253117") },
          blocs: [{ type: "texte", contenu: "L'absence pour maladie ou accident constatée par certificat médical suspend le contrat sans le rompre. Le salarié prévient l'employeur dès que possible et au plus tard dans les 24 heures, et justifie l'absence dans les 48 heures par certificat médical. Lorsqu'il complète les indemnités journalières, l'employeur peut faire procéder à une contre-visite." }],
        },
        {
          id: "loi-ccn-maladie",
          titre: "Comparatif loi / convention sur le maintien de salaire",
          populations: ["etam", "cadres"],
          reference: { article: "Article 9.2", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", etendu: "05/04/2023, sous réserve des articles L. 1226-1, D. 1226-1 et D. 1226-2 du Code du travail", applicable: "01/05/2023", url: LF("KALIARTI000047513889") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Ancienneté requise", loi: "1 an", ccn: "1 an ; aucune en cas d'accident du travail ou de maladie professionnelle" },
                { point: "Carence", loi: "7 jours (aucune en cas d'accident du travail)", ccn: "Aucune : allocation due dès le premier jour d'absence" },
                { point: "ETAM, 1 à 5 ans d'ancienneté", loi: "30 jours à 90 % puis 30 jours à 66,66 %", ccn: "30 jours à 100 % du salaire brut, puis 60 jours à 80 %" },
                { point: "ETAM, plus de 5 ans", loi: "40 à 90 jours à 90 % selon l'ancienneté, puis autant à 66,66 %", ccn: "60 jours à 100 %, puis 30 jours à 80 %" },
                { point: "Ingénieurs et cadres, plus d'1 an", loi: "Mêmes barèmes légaux", ccn: "90 jours à 100 %" },
                { point: "Période de référence", loi: "12 mois glissants", ccn: "90 jours au maximum, consécutifs ou non, sur 12 mois consécutifs" },
                { point: "Plafond", loi: "Rémunération nette", ccn: "Rémunération nette qu'aurait perçue le salarié, hors primes et gratifications" },
                { point: "Relais", loi: "—", ccn: "Au-delà de 90 jours consécutifs, régime de prévoyance de l'accord du 27 mars 1997 (80 % du salaire brut)" },
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
          titre: "Maternité",
          populations: ["etam", "cadres"],
          reference: { article: "Article 9.3", modifiePar: "Avenant n° 49 du 22/10/2025 relatif à la parentalité et aux évènements familiaux", url: LF("KALIARTI000053769476") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Rémunération pendant le congé légal", loi: "Indemnités journalières de la Sécurité sociale", ccn: "Maintien intégral du salaire mensuel après 1 an d'ancienneté au début du congé, sous déduction des IJSS et des prestations de prévoyance ; droit ouvert en cours de congé dès que l'ancienneté est atteinte" },
                { point: "Réduction d'horaire", loi: "Aucune", ccn: "20 minutes par jour à partir du 3e mois de grossesse, 30 minutes à partir du 5e, rémunérées ; charge de travail adaptée pour les forfaits jours" },
                { point: "Examens médicaux, PMA", loi: "Autorisations d'absence rémunérées", ccn: "Autorisations d'absence rémunérées, assimilées à du travail effectif" },
                { point: "Allaitement", loi: "1 heure par jour, non rémunérée", ccn: "1 heure par jour pendant 1 an, sans réduction de rémunération" },
              ],
            },
          ],
        },
        {
          id: "paternite",
          titre: "Paternité, accueil de l'enfant, adoption",
          populations: ["etam", "cadres"],
          reference: { article: "Articles 9.3 et 9.4", modifiePar: "Avenant n° 49 du 22/10/2025", url: LF("KALIARTI000053769476") },
          blocs: [
            {
              type: "loi_ccn",
              lignes: [
                { point: "Congé de paternité et d'accueil", loi: "IJSS seules", ccn: "Complément employeur à 100 % du salaire de base (hors primes) après 1 an d'ancienneté, plafonné à la valeur journalière du plafond de la Sécurité sociale, sous réserve du versement effectif des IJSS ; cumul limité au net journalier (1/30 du net mensuel de base)" },
                { point: "Adoption", loi: "IJSS seules", ccn: "Mêmes avantages que le congé maternité ; absences rémunérées pour les entretiens d'agrément" },
                { point: "Congé parental", loi: "Conditions légales", ccn: "Conditions légales, à temps plein ou à temps partiel (art. 9.4)" },
              ],
            },
          ],
        },
      ],
    },
    {
      theme: "prevoyance",
      dispositions: [
        {
          id: "textes-prev",
          titre: "Régime de prévoyance : textes de référence et bénéficiaires",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 27/03/1997 relatif à la prévoyance, ses annexes I et II, et ses avenants n° 3 (25/03/2009), n° 4 (15/07/2009), n° 5 et n° 6 (12/09/2012), n° 8 (16/12/2025)", url: LF("KALIARTI000005851593") },
          blocs: [
            { type: "texte", contenu: "Régime minimum obligatoire de prévoyance au plan national, France métropolitaine et DOM, bénéficiant à tous les ETAM, ingénieurs et cadres (art. 1er). L'avenant n° 7 du 24/04/2013 et l'accord du 12/06/2013 ne sont pas étendus. Sont bénéficiaires, sans sélection médicale (art. 2) :" },
            {
              type: "liste",
              items: [
                "les salariés inscrits à l'effectif, y compris en suspension du contrat (maladie, congé parental) ;",
                "les salariés atteints d'une pathologie antérieure à l'accord ;",
                "les anciens salariés demandeurs d'emploi ou en préretraite FNE, s'ils souscrivent dans les 6 mois de la rupture ;",
                "le conjoint ou concubin bénéficiaire du capital décès, s'il adhère dans les 6 mois, pour le capital décès et la rente éducation.",
              ],
            },
            { type: "texte", contenu: "Exclus : les enquêteurs vacataires et les bénéficiaires du régime de l'accord du 16 décembre 1991. En cas de suspension volontaire du contrat, maintien des garanties décès sur demande moyennant cotisation ; en congé parental, maintien sans cotisation des garanties incapacité et invalidité (art. 2 bis)." },
          ],
        },
        {
          id: "cotisations-prev",
          titre: "Cotisations, organisme et comité paritaire",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Annexe I à l'accord du 27/03/1997, art. 1er à 3, dans leur rédaction issue de l'avenant n° 8 du 16/12/2025", url: LF("KALIARTI000054225671") },
          blocs: [
            {
              type: "tableau",
              colonnes: ["Élément", "Valeur"],
              lignes: [
                ["Assiette", "Salaire brut plafonné à la tranche C, base des cotisations de Sécurité sociale"],
                ["Taux sur la tranche 1", "0,85 %"],
                ["Taux sur la tranche 2", "1,10 %"],
                ["Répartition", "Selon les règles de chaque entreprise, la part salarié ne pouvant excéder 50 %, quel que soit l'assureur"],
                ["Cadres", "La cotisation de 0,70 % sur la tranche A mentionnée à l'article 2 est imputable sur l'obligation de 1,50 % (ex-art. 7 de la convention AGIRC de 1947)"],
                ["Salariés indemnisés", "Aucune cotisation pendant le service des prestations incapacité ou invalidité"],
              ],
            },
            { type: "texte", contenu: "Organisme : l'annexe désigne Malakoff Médéric Prévoyance (rente éducation assurée par l'OCIRP), avec maintien des taux pendant 5 ans à compter de l'extension ; les entreprises ayant un contrat antérieur, ou en création (délai de 3 mois), peuvent contracter avec l'organisme de leur choix à garanties équivalentes. Un comité paritaire de surveillance suit le régime (art. 11). Entrée en vigueur le premier jour du mois suivant la publication de l'arrêté d'extension, délai de mise en conformité de 12 mois (art. 12)." },
          ],
        },
        {
          id: "sante",
          titre: "Complémentaire santé",
          populations: ["etam", "cadres"],
          reference: { modifiePar: "Accord du 07/10/2015 relatif à la complémentaire santé et ses avenants n° 2 à 9 (dernier : avenant n° 9 du 22/10/2025)", url: LF("KALICONT000005635173") },
          blocs: [{ type: "texte", contenu: "Le régime de frais de santé de branche est institué par l'accord du 7 octobre 2015, revalorisé par avenants successifs (n° 5 du 21/02/2023, n° 6 du 14/12/2023, n° 7 du 18/12/2024, n° 8 du 14/02/2025, n° 9 du 22/10/2025). Les catégories de bénéficiaires sont précisées par l'accord du 24 octobre 2023. Texte complet dans l'onglet « Texte intégral »." }],
        },
      ],
    },
    {
      theme: "formation",
      dispositions: [
        {
          id: "opco",
          titre: "Formation professionnelle et OPCO",
          populations: ["etam", "cadres", "autre"],
          reference: { article: "Articles 10.1 et 10.2", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023", url: LF("KALIARTI000044253128") },
          blocs: [{ type: "texte", contenu: "Les stipulations relatives à la formation sont celles de l'accord de branche du 31 octobre 2019 relatif au développement des compétences et à l'employabilité (avenants n° 1 du 15/05/2020, n° 2 du 29/10/2020, n° 3 du 27/10/2022). Opérateur de compétences : Atlas (accord du 20 décembre 2018)." }],
        },
      ],
    },
    {
      theme: "classifications",
      dispositions: [
        {
          id: "grilles",
          titre: "Classifications ETAM et ingénieurs et cadres",
          populations: ["etam", "cadres"],
          reference: { article: "Articles 1.2 et 7.2", modifiePar: "Avenant n° 2 du 27/10/2022 à l'avenant n° 46", applicable: "01/05/2023", url: LF("KALIARTI000047513883") },
          blocs: [
            { type: "texte", contenu: "Les classifications ETAM figurent à l'annexe I (agents de maîtrise dans le groupe 3), celles des ingénieurs et cadres à l'annexe II. Elles s'imposent à toutes les entreprises ; la fonction remplie est seule prise en compte, et le salarié relevant de plusieurs catégories est classé dans la plus élevée. Coefficients ETAM de 240 (230 avant l'avenant n° 2 du 29/09/2022) à 500 ; coefficients ingénieurs et cadres de 95 à 270 (art. 3.4)." },
          ],
        },
      ],
    },
    {
      theme: "salaires",
      dispositions: [
        {
          id: "minima",
          titre: "Salaires minimaux hiérarchiques",
          populations: ["etam", "cadres"],
          reference: { article: "Article 7.1", modifiePar: "Avenant n° 47 du 31/03/2022 et ses avenants n° 1 et n° 2 du 29/09/2022 relatifs aux salaires minimaux hiérarchiques", url: LF("KALIARTI000049764147") },
          blocs: [
            { type: "texte", contenu: "ETAM : salaire minimal hiérarchique = base fixe + (valeur du point ETAM × coefficient). Ingénieurs et cadres : valeur du point × coefficient hiérarchique. Les minima excluent primes d'assiduité, de participation, d'intéressement, primes exceptionnelles, frais, indemnités de déplacement, heures supplémentaires et indemnité de congés payés ; ils incluent les avantages en nature contractuels. Contrôle sur 1/12 de la rémunération annuelle ; la rémunération mensuelle ne peut être inférieure à 95 % du minimum mensuel (92 % avec 13e mois). Examen annuel par la CPPNI avant le 30 juin. Valeurs du point et base fixe : textes salaires dans l'onglet « Texte intégral »." },
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
          reference: { article: "Article 7.3", modifiePar: "Avenant n° 46 du 16/07/2021", etendu: "05/04/2023, sous réserve des articles L. 2253-1 à L. 2253-3 du Code du travail", applicable: "01/05/2023", url: LF("KALIARTI000044253107") },
          blocs: [
            { type: "texte", contenu: "L'employeur réserve chaque année au moins 10 % de la masse globale des indemnités de congés payés conventionnels au paiement d'une prime de vacances à tous les salariés. Répartition égalitaire, au prorata du salaire (majoration possible par enfant), par majoration de 10 % de l'indemnité de congés, ou au prorata de la présence. Toute prime versée à l'ensemble des salariés peut en tenir lieu si elle atteint les 10 % et qu'une partie est versée entre le 1er mai et le 31 octobre. Ne peuvent s'y substituer : un 13e mois, l'indemnité de précarité des enquêteurs vacataires, une prime d'objectifs contractuelle." },
          ],
        },
        {
          id: "bulletin",
          titre: "Mentions du bulletin de paie",
          populations: ["etam", "cadres"],
          reference: { article: "Article 7.4", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023", url: LF("KALIARTI000044253109") },
          blocs: [{ type: "texte", contenu: "Outre les mentions réglementaires : classification et coefficient hiérarchique, salaire mensuel de base, période et nombre d'heures (heures normales et majorées distinguées), nature et volume du forfait le cas échéant, intitulé de la convention collective, mention incitant à conserver le bulletin sans limitation de durée." }],
        },
        {
          id: "deplacements",
          titre: "Déplacements",
          populations: ["etam", "cadres"],
          reference: { article: "Titres 11 et 12 (articles 11.1 et suivants)", modifiePar: "Avenant n° 46 du 16/07/2021", applicable: "01/05/2023", url: LF("KALICONT000005635173") },
          blocs: [{ type: "texte", contenu: "Déplacements et changements de résidence en France métropolitaine (titre 11) et hors de France métropolitaine (titre 12) : ordre de mission, remboursement des frais, conditions de retour, prise en charge des frais en cas de décès d'un proche pendant le déplacement. Texte complet dans l'onglet « Texte intégral »." }],
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
          reference: { modifiePar: "Accord du 22/06/1999 relatif à la durée du travail, chapitre X (avenant du 01/04/2014)", url: LF("KALIARTI000029330158") },
          blocs: [{ type: "texte", contenu: "Les salariés disposent d'un droit à la déconnexion, qui vise le respect des temps de repos et de congé et l'équilibre entre vie professionnelle et vie personnelle. Pour les forfaits jours, suivi des temps de repos, de la charge et de l'amplitude, entretien annuel (art. 4.8 de l'accord)." }],
        },
        {
          id: "egalite",
          titre: "Égalité, harcèlement, dialogue social",
          populations: ["etam", "cadres", "autre"],
          reference: { modifiePar: "Accord du 28/02/2024 (harcèlement sexuel et agissements sexistes), accord du 22/10/2025 (inégalités femmes-hommes), accord du 18/12/2024 (dialogue social)", url: LF("KALICONT000005635173") },
          blocs: [{ type: "texte", contenu: "Accords de branche étendus sur la lutte contre le harcèlement sexuel et les agissements sexistes, la lutte contre les inégalités professionnelles entre les femmes et les hommes, la promotion du dialogue social en entreprise, et l'interruption spontanée de grossesse (accord du 13/12/2022). Textes dans l'onglet « Texte intégral »." }],
        },
      ],
    },
  ],

  maladieAccident: [
    {
      statut: "etam",
      libelleStatut: "ETAM",
      ancienneteRequise: "1 an d'ancienneté (aucune en cas d'accident du travail ou de maladie professionnelle)",
      carence: "Aucune : l'allocation est due dès le premier jour d'absence constatée par certificat médical.",
      tranches: [
        { anciennete: "Plus de 1 an et moins de 5 ans", paliers: [{ duree: "30 jours", taux: "100 % du brut" }, { duree: "60 jours", taux: "80 % du brut" }] },
        { anciennete: "Plus de 5 ans", paliers: [{ duree: "60 jours", taux: "100 % du brut" }, { duree: "30 jours", taux: "80 % du brut" }] },
      ],
      base: "Allocation complétant les indemnités journalières de la Sécurité sociale et, le cas échéant, les prestations de prévoyance, sans excéder la rémunération nette qu'aurait perçue le salarié (temps plein ou partiel), hors primes et gratifications.",
      periodeReference: "90 jours au maximum, consécutifs ou non, sur une période de 12 mois consécutifs. Au-delà de 90 jours consécutifs, relais par le régime de prévoyance (accord du 27 mars 1997).",
      conditions: ["Prévenir l'employeur dans les 24 heures, justifier l'absence dans les 48 heures par certificat médical (art. 9.1).", "Si l'ancienneté requise est atteinte pendant l'arrêt, le nouveau barème s'applique pour les jours restants."],
      sources: [{ label: "Article 9.2 de la convention (annexe 1 de l'avenant n° 46), avenant n° 2 du 27/10/2022", url: LF("KALIARTI000047513889") }],
    },
    {
      statut: "cadres",
      libelleStatut: "Ingénieurs et cadres",
      ancienneteRequise: "1 an d'ancienneté (aucune en cas d'accident du travail ou de maladie professionnelle)",
      carence: "Aucune : l'allocation est due dès le premier jour d'absence constatée par certificat médical.",
      tranches: [{ anciennete: "Plus de 1 an", paliers: [{ duree: "90 jours", taux: "100 % du brut" }] }],
      base: "Allocation complétant les indemnités journalières de la Sécurité sociale et, le cas échéant, les prestations de prévoyance, sans excéder la rémunération nette qu'aurait perçue le salarié, hors primes et gratifications.",
      periodeReference: "90 jours au maximum, consécutifs ou non, sur une période de 12 mois consécutifs. Au-delà de 90 jours consécutifs, relais par le régime de prévoyance (accord du 27 mars 1997).",
      conditions: ["Prévenir l'employeur dans les 24 heures, justifier l'absence dans les 48 heures par certificat médical (art. 9.1).", "Si l'ancienneté d'un an est atteinte pendant l'arrêt, le maintien s'applique pour les jours restants."],
      sources: [{ label: "Article 9.2 de la convention (annexe 1 de l'avenant n° 46), avenant n° 2 du 27/10/2022", url: LF("KALIARTI000047513889") }],
    },
  ],

  prevoyance: [
    {
      statut: "cadres",
      libelleStatut: "Ingénieurs et cadres",
      caractere: "obligatoire",
      salaireReference: "Total des rémunérations brutes perçues au cours des 12 mois précédant l'évènement, tous éléments contractuels soumis à cotisation, limité aux tranches A, B et C (art. 8).",
      garanties: [
        {
          nom: "Incapacité temporaire de travail (art. 6)",
          franchise: "90 jours consécutifs d'arrêt de travail.",
          ancienneteMin: "Plus d'un an.",
          montant: "Arrêt total de travail entraînant le versement d'indemnités journalières de la Sécurité sociale, hors assurance maternité : complément d'indemnité portant les versements de la Sécurité sociale à hauteur de 80 % du salaire brut de référence.",
          terme: "Jusqu'au classement en invalidité par la Sécurité sociale.",
          plafond: "Sans excéder le salaire net qu'aurait perçu le salarié en activité.",
          precision: "Prend le relais du maintien employeur de l'article 9.2 (90 jours à 100 %).",
        },
        {
          nom: "Invalidité totale ou partielle (art. 7)",
          montant: "Maladie : 2e et 3e catégorie, complément des rentes de la Sécurité sociale à hauteur de 80 % du salaire brut de référence ; 1re catégorie, complément divisé par deux. Accident du travail : taux d'incapacité d'au moins 66 %, 80 % du salaire brut ; taux entre 33 % et 65 %, complément calculé sur 3n/2 de cette rente.",
          terme: "Rente versée mensuellement à terme échu jusqu'à la date d'effet de la retraite de la Sécurité sociale.",
          plafond: "Sans excéder le salaire net qu'aurait perçu le salarié en activité.",
          precision: "En 3e catégorie (ou incapacité d'au moins 66 % d'origine professionnelle), versement anticipé du capital décès en sus de la rente.",
        },
        {
          nom: "Capital décès (art. 3)",
          beneficiaires: "Bénéficiaire désigné ; à défaut conjoint non séparé, partenaire de Pacs ou concubin notoire, enfants, parents, héritiers.",
          montant: "200 % du salaire de référence, avec un minimum de 300 % du plafond annuel de la Sécurité sociale au jour du décès pour les salariés relevant du régime de retraite des cadres (prorata pour les temps partiels).",
          precision: "Transformable en rente en tout ou partie à la demande des ayants droit. Versé par anticipation en cas d'invalidité absolue et définitive (3e catégorie avec majoration tierce personne, art. 4).",
        },
        {
          nom: "Rente éducation (art. 5)",
          beneficiaires: "Chaque enfant à charge : jusqu'à 18 ans sans condition, jusqu'à 25 ans en cas d'études, d'apprentissage ou de recherche d'emploi, sans limite en cas d'invalidité survenue avant 21 ans.",
          montant: "12 % du salaire de référence par enfant jusqu'au 18e anniversaire, 15 % de 18 ans au 26e anniversaire ; minimum pour les salariés relevant du régime des cadres : 24 % puis 30 % du plafond annuel de la Sécurité sociale.",
          terme: "Payable mensuellement à compter du premier jour du mois suivant le décès, cumulable avec le capital décès.",
          precision: "Assurée par l'OCIRP.",
        },
        {
          nom: "Assistance aux proches aidants (art. 10)",
          montant: "Service d'information et d'orientation et service de soutien psychosocial, ouverts à tous les salariés.",
        },
      ],
      cotisation: { taux: "0,85 % sur la tranche 1 et 1,10 % sur la tranche 2 (annexe I, art. 2)", assiette: "Salaire brut plafonné à la tranche C", repartition: "Selon les règles de l'entreprise, part salarié au plus égale à 50 %" },
      organisme: "Malakoff Médéric Prévoyance désigné par l'annexe I (rente éducation OCIRP) ; libre choix à garanties équivalentes pour les contrats antérieurs et les entreprises en création.",
      notes: ["Régime minimum obligatoire de branche (accord du 27 mars 1997, art. 1er). Le contrat de l'entreprise peut être plus favorable.", "Revalorisation des prestations conformément à la convention d'assurance et de gestion du régime (art. 9)."],
      sources: [
        { label: "Accord du 27 mars 1997 relatif à la prévoyance, art. 3 à 8", url: LF("KALIARTI000005851600") },
        { label: "Annexe I à l'accord du 27 mars 1997, art. 2 (cotisations), rédaction issue de l'avenant n° 8 du 16/12/2025", url: LF("KALIARTI000054225671") },
      ],
    },
    {
      statut: "etam",
      libelleStatut: "ETAM",
      caractere: "obligatoire",
      salaireReference: "Total des rémunérations brutes perçues au cours des 12 mois précédant l'évènement, tous éléments contractuels soumis à cotisation, limité aux tranches A, B et C (art. 8).",
      garanties: [
        {
          nom: "Incapacité temporaire de travail (art. 6)",
          franchise: "90 jours consécutifs d'arrêt de travail.",
          ancienneteMin: "Plus d'un an.",
          montant: "Arrêt total de travail entraînant le versement d'indemnités journalières de la Sécurité sociale, hors assurance maternité : complément d'indemnité portant les versements de la Sécurité sociale à hauteur de 80 % du salaire brut de référence.",
          terme: "Jusqu'au classement en invalidité par la Sécurité sociale.",
          plafond: "Sans excéder le salaire net qu'aurait perçu le salarié en activité.",
          precision: "Prend le relais du maintien employeur de l'article 9.2 (30 ou 60 jours à 100 % puis 60 ou 30 jours à 80 %).",
        },
        {
          nom: "Invalidité totale ou partielle (art. 7)",
          montant: "Maladie : 2e et 3e catégorie, complément des rentes de la Sécurité sociale à hauteur de 80 % du salaire brut de référence ; 1re catégorie, complément divisé par deux. Accident du travail : taux d'incapacité d'au moins 66 %, 80 % du salaire brut ; taux entre 33 % et 65 %, complément calculé sur 3n/2 de cette rente.",
          terme: "Rente versée mensuellement à terme échu jusqu'à la date d'effet de la retraite de la Sécurité sociale.",
          plafond: "Sans excéder le salaire net qu'aurait perçu le salarié en activité.",
          precision: "En 3e catégorie (ou incapacité d'au moins 66 % d'origine professionnelle), versement anticipé du capital décès en sus de la rente.",
        },
        {
          nom: "Capital décès (art. 3)",
          beneficiaires: "Bénéficiaire désigné ; à défaut conjoint non séparé, partenaire de Pacs ou concubin notoire, enfants, parents, héritiers.",
          montant: "200 % du salaire de référence, avec un minimum de 200 % du plafond annuel de la Sécurité sociale au jour du décès pour les salariés ne relevant pas du régime de retraite des cadres (prorata pour les temps partiels).",
          precision: "Transformable en rente en tout ou partie à la demande des ayants droit. Versé par anticipation en cas d'invalidité absolue et définitive (3e catégorie avec majoration tierce personne, art. 4).",
        },
        {
          nom: "Rente éducation (art. 5)",
          beneficiaires: "Chaque enfant à charge : jusqu'à 18 ans sans condition, jusqu'à 25 ans en cas d'études, d'apprentissage ou de recherche d'emploi, sans limite en cas d'invalidité survenue avant 21 ans.",
          montant: "12 % du salaire de référence par enfant jusqu'au 18e anniversaire, 15 % de 18 ans au 26e anniversaire ; minimum pour les salariés ne relevant pas du régime des cadres : 12 % puis 15 % du plafond annuel de la Sécurité sociale.",
          terme: "Payable mensuellement à compter du premier jour du mois suivant le décès, cumulable avec le capital décès.",
          precision: "Assurée par l'OCIRP.",
        },
        {
          nom: "Assistance aux proches aidants (art. 10)",
          montant: "Service d'information et d'orientation et service de soutien psychosocial, ouverts à tous les salariés.",
        },
      ],
      cotisation: { taux: "0,85 % sur la tranche 1 et 1,10 % sur la tranche 2 (annexe I, art. 2)", assiette: "Salaire brut plafonné à la tranche C", repartition: "Selon les règles de l'entreprise, part salarié au plus égale à 50 %" },
      organisme: "Malakoff Médéric Prévoyance désigné par l'annexe I (rente éducation OCIRP) ; libre choix à garanties équivalentes pour les contrats antérieurs et les entreprises en création.",
      notes: ["Régime minimum obligatoire de branche (accord du 27 mars 1997, art. 1er). Le contrat de l'entreprise peut être plus favorable."],
      sources: [
        { label: "Accord du 27 mars 1997 relatif à la prévoyance, art. 3 à 8", url: LF("KALIARTI000005851600") },
        { label: "Annexe I à l'accord du 27 mars 1997, art. 2 (cotisations), rédaction issue de l'avenant n° 8 du 16/12/2025", url: LF("KALIARTI000054225671") },
      ],
    },
    {
      statut: "cadres",
      libelleStatut: "Ingénieurs et cadres",
      caractere: "obligation_cotisation",
      garanties: [
        {
          nom: "Prévoyance « 1,50 % » des cadres",
          montant: "Cotisation employeur minimale de 1,50 % de la tranche A, affectée en priorité à la couverture du risque décès.",
          precision: "L'annexe I de l'accord prévoyance (art. 2) précise que la cotisation de 0,70 % sur la tranche A qu'elle mentionne est imputable sur cette obligation.",
        },
      ],
      cotisation: { taux: "1,50 %", assiette: "Tranche A", repartition: "100 % employeur" },
      sources: [{ label: "ANI du 17 novembre 2017 relatif à la prévoyance des cadres, art. 1er (ex-art. 7 de la convention AGIRC du 14 mars 1947), rappelé à l'annexe I de l'accord du 27 mars 1997", url: LF("KALIARTI000054225671") }],
    },
  ],

  vigilance: [
    "Maintien de salaire : 90 jours au maximum sur 12 mois consécutifs, consécutifs ou non. Un second arrêt dans l'année entame le reliquat.",
    "ETAM : le palier à 80 % suit le palier à 100 %, il ne s'y ajoute pas. Barème 30 + 60 jours avant 5 ans d'ancienneté, 60 + 30 jours après.",
    "Accident du travail ou maladie professionnelle : maintien dès le premier jour de présence, sans condition d'ancienneté.",
    "Prévoyance : la franchise de 90 jours se compte en jours consécutifs d'arrêt. Elle coïncide avec la fin du maintien employeur pour les ingénieurs et cadres.",
    "Salaire de référence prévoyance : 12 mois précédant l'évènement, tranches A, B et C.",
    "Cadres : la cotisation 1,50 % tranche A est distincte du régime de branche ; 0,70 % de la tranche A y est imputable.",
    "Indemnité de licenciement : comparer systématiquement conventionnel et légal, l'employeur verse la plus élevée.",
  ],

  veille: [
    { date: "2026-10-13", theme: "conditions_travail", titre: "Champ d'application", texte: "Annexe V : liste des activités selon la nomenclature NAF 2025, et article 1.1 dans sa rédaction issue de l'avenant n° 48 (arrêté d'extension du 28/09/2026)." },
    { date: "2026-05-27", theme: "prevoyance", titre: "Comités paritaires de surveillance", texte: "Accords du 27/05/2026 relatifs aux comités paritaires de surveillance des régimes de complémentaire santé et de prévoyance lourde (non étendus à ce jour)." },
    { date: "2025-12-16", theme: "prevoyance", titre: "Prévoyance lourde", texte: "Avenant n° 8 du 16/12/2025 à l'accord du 27/03/1997 : nouvelle rédaction du capital décès (art. 3), de la revalorisation (art. 9), de l'assistance aux proches aidants (art. 10), du comité paritaire (art. 11) et des cotisations (annexe I, art. 2)." },
    { date: "2025-10-22", theme: "maternite", titre: "Parentalité et évènements familiaux", texte: "Avenant n° 49 du 22/10/2025 : réécriture des articles 5.7 (congés pour évènements familiaux) et 9.3 (maternité, paternité, adoption, PMA, allaitement)." },
  ],

  sources: [
    { label: "Convention collective nationale du 15 décembre 1987 (IDCC 1486, brochure 3018), texte consolidé sur Légifrance (base KALI)", url: LF("KALICONT000005635173") },
    { label: "Avenant n° 46 du 16 juillet 2021 et son annexe 1 (articles 1.1 à 13.6)", url: LF("KALITEXT000044253019") },
    { label: "Accord du 27 mars 1997 relatif à la prévoyance et annexe I", url: LF("KALIARTI000005851593") },
    { label: "Accord du 22 juin 1999 relatif à la durée du travail", url: LF("KALIARTI000005851637") },
  ],
};
