import type { FicheCcn } from "../types";

/**
 * IDCC 1486 — Bureaux d'études techniques, cabinets d'ingénieurs-conseils,
 * sociétés de conseils (« Syntec »).
 *
 * BROUILLON : contenu saisi de mémoire pour tester l'outil. Chaque valeur doit
 * être relue sur le texte en vigueur (Légifrance, base KALI) avant usage.
 */
export const FICHE_1486: FicheCcn = {
  idcc: "1486",
  nomUsage: "Syntec",
  brochure: "3018",
  fiabilite: "brouillon",
  maj: "2026-11-03",
  resume:
    "Maintien de salaire employeur dès un an d'ancienneté, différencié ETAM / ingénieurs et cadres. Régime de prévoyance de branche obligatoire pour tous les salariés (accord du 27 mars 1997), complété par l'obligation 1,50 % tranche A pour les cadres.",
  maladieAccident: [
    {
      statut: "non_cadres",
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
      sources: [{ label: "CCN 1486, art. 43 « Maladie et accidents » (numérotation d'origine)" }],
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
      sources: [{ label: "CCN 1486, art. 43 « Maladie et accidents » (numérotation d'origine)" }],
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
  sources: [{ label: "Convention collective nationale du 15 décembre 1987 (IDCC 1486), brochure 3018" }],
};
