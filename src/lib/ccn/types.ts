/**
 * Modèle de données d'une fiche conventionnelle.
 *
 * Une fiche = un IDCC, une présentation (dates, avenants), un champ
 * d'application (territorial, professionnel / NAF), et des « obligations »
 * classées par thème (conditions de travail, congés, maladie – accident,
 * prévoyance…), chaque disposition indiquant à quelles populations elle
 * s'applique et de quel article elle vient.
 *
 * Les deux thèmes du cœur paie (maladie – accident, prévoyance) ont en plus
 * une saisie structurée (paliers, garanties, cotisations) : `maladieAccident`
 * et `prevoyance`.
 */

export type Statut = "cadres" | "non_cadres" | "tous" | "ouvriers" | "employes" | "etam" | "agents_maitrise" | "autre";

export const STATUT_LABEL: Record<Statut, string> = {
  cadres: "Cadres",
  non_cadres: "Non-cadres",
  tous: "Tous statuts",
  ouvriers: "Ouvriers",
  employes: "Employés",
  etam: "ETAM",
  agents_maitrise: "Agents de maîtrise",
  autre: "Autre",
};

/** Ordre d'affichage canonique des populations (de l'ouvrier au cadre, puis divers). */
export const STATUT_ORDER: Statut[] = ["ouvriers", "employes", "non_cadres", "etam", "agents_maitrise", "cadres", "autre", "tous"];

/** Population telle que la branche la nomme : identifiant + libellé affiché. */
export interface PopulationDef {
  id: Statut;
  label: string;
  /** Précision affichée en infobulle (ex. « Enquêteurs, annexe IV »). */
  detail?: string;
}

/** Niveau de confiance de la fiche : ce qui est affiché n'est jamais présenté comme sûr s'il ne l'est pas. */
export type Fiabilite = "verifie" | "brouillon";

export const FIABILITE_LABEL: Record<Fiabilite, string> = {
  verifie: "Vérifiée sur le texte",
  brouillon: "Brouillon à valider",
};

export interface Source {
  /** Ex. « CCN art. 43 », « Accord prévoyance du 27 mars 1997, art. 7 ». */
  label: string;
  url?: string;
}

/** Référence d'une disposition, dans l'esprit « Article 3.2 modifié par Avenant n° 2 du 27/10/2022, étendu le …, applicable à compter du … ». */
export interface Reference {
  article?: string;
  /** Texte modificateur le plus récent (avenant, accord). */
  modifiePar?: string;
  /** Date d'extension et J.O. */
  etendu?: string;
  /** Date d'application. */
  applicable?: string;
  url?: string;
}

/** Un palier d'indemnisation : « 1 mois à 100 % », « 2 mois à 80 % ». */
export interface Palier {
  duree: string;
  taux: string;
}

/** Une tranche d'ancienneté avec ses paliers. */
export interface TrancheAnciennete {
  anciennete: string;
  paliers: Palier[];
}

export interface MaintienSalaire {
  statut: Statut;
  /** Libellé affiché si le statut conventionnel a un autre nom (ex. « IC » pour cadres). */
  libelleStatut?: string;
  ancienneteRequise: string;
  carence: string;
  tranches: TrancheAnciennete[];
  /** Base de calcul et déductions (IJSS, prévoyance). */
  base: string;
  /** Période de référence pour cumuler les absences (12 mois glissants, année civile…). */
  periodeReference?: string;
  conditions?: string[];
  notes?: string[];
  sources: Source[];
}

export interface Garantie {
  nom: string;
  /** Ex. « 80 % du salaire brut de référence, sous déduction des prestations de la Sécurité sociale ». */
  montant: string;
  /** Délai de franchise avant versement : « 90 jours consécutifs d'arrêt de travail ». */
  franchise?: string;
  /** Ancienneté minimum pour bénéficier de la garantie : « 1 an ». */
  ancienneteMin?: string;
  /** Terme ou durée du versement : « jusqu'au classement en invalidité », « jusqu'à la liquidation de la retraite ». */
  terme?: string;
  /** Plafond : « sans excéder le salaire net qu'aurait perçu le salarié ». */
  plafond?: string;
  /** Bénéficiaires ou fait générateur quand ils diffèrent du régime : « conjoint, enfants à charge ». */
  beneficiaires?: string;
  precision?: string;
}

export interface Cotisation {
  taux: string;
  assiette: string;
  repartition: string;
}

export interface PrevoyanceComplementaire {
  statut: Statut;
  libelleStatut?: string;
  /** Régime obligatoire de branche, recommandé, ou simple obligation de cotisation. */
  caractere: "obligatoire" | "recommande" | "obligation_cotisation";
  /** Salaire de référence des prestations : « salaire brut des 12 derniers mois, tranches A et B ». */
  salaireReference?: string;
  garanties: Garantie[];
  cotisation?: Cotisation;
  organisme?: string;
  conditions?: string[];
  notes?: string[];
  sources: Source[];
}

/* ------------------------------------------------------------------ */
/*  Thèmes et dispositions                                             */
/* ------------------------------------------------------------------ */

export const THEMES = [
  { id: "conditions_travail", label: "Conditions de travail" },
  { id: "conges", label: "Congés et jours fériés" },
  { id: "duree_travail", label: "Durée du travail" },
  { id: "retraite", label: "Départ à la retraite" },
  { id: "licenciement", label: "Licenciement" },
  { id: "maladie_accident", label: "Maladie – Accident" },
  { id: "maternite", label: "Maternité – Paternité – Adoption" },
  { id: "prevoyance", label: "Prévoyance" },
  { id: "retraite_supplementaire", label: "Retraite supplémentaire" },
  { id: "epargne", label: "Épargne d'entreprise" },
  { id: "formation", label: "Formation professionnelle" },
  { id: "classifications", label: "Classifications" },
  { id: "salaires", label: "Salaires" },
  { id: "primes", label: "Primes et indemnités" },
  { id: "autres", label: "Autres thèmes" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_LABEL: Record<ThemeId, string> = Object.fromEntries(THEMES.map((t) => [t.id, t.label])) as Record<ThemeId, string>;

/** Contenu d'une disposition : paragraphes, liste, tableau, ou comparatif loi / convention. */
export type Bloc =
  | { type: "texte"; contenu: string }
  | { type: "liste"; titre?: string; items: string[] }
  | { type: "tableau"; titre?: string; colonnes: string[]; lignes: string[][] }
  | { type: "loi_ccn"; lignes: { point: string; loi: string; ccn: string }[] };

export interface Disposition {
  id: string;
  titre: string;
  /** Populations visées. `["tous"]` = toutes les populations de la fiche. */
  populations: Statut[];
  reference?: Reference;
  blocs: Bloc[];
  /** Précisions propres à une population (ex. « Divers » chez Diode). */
  precisions?: { population: Statut; texte: string }[];
}

export interface Rubrique {
  theme: ThemeId;
  /** Précision d'entête valable pour tout le thème. */
  precisions?: { population: Statut; texte: string }[];
  dispositions: Disposition[];
}

/* ------------------------------------------------------------------ */
/*  Présentation, champ d'application, veille                          */
/* ------------------------------------------------------------------ */

export interface Presentation {
  dateSignature?: string;
  /** Ex. « 13/04/1988 (J.O. du 27/04/1988) ». */
  dateExtension?: string;
  etendue: boolean;
  niveau: "nationale" | "regionale" | "departementale" | "locale";
  /** Avenants et accords récents qui actualisent le texte. */
  actualisations?: string[];
  /** Date de la dernière relecture juridique de la fiche. */
  derniereVeille?: string;
}

export interface GroupeNaf {
  titre: string;
  codes: { code: string; activite: string }[];
}

export interface ChampApplication {
  textesReference?: string[];
  territorial?: string;
  professionnel?: {
    intro?: string;
    groupes: GroupeNaf[];
  };
  /** Catégories de personnel particulières (ex. enquêteurs, VRP…). */
  personnels?: { titre: string; texte: string }[];
  /** Restructuration des branches : fusions, rattachements. */
  fusion?: string[];
}

export interface Veille {
  date: string;
  theme?: ThemeId;
  titre: string;
  texte: string;
}

/* ------------------------------------------------------------------ */
/*  Fiche                                                              */
/* ------------------------------------------------------------------ */

export interface FicheCcn {
  idcc: string;
  /** Nom d'usage (ex. « Syntec ») en plus du titre officiel. */
  nomUsage?: string;
  brochure?: string;
  fiabilite: Fiabilite;
  /** Date de dernière mise à jour de la fiche (AAAA-MM-JJ). */
  maj: string;
  resume?: string;
  /** Populations distinguées par la convention, dans l'ordre d'affichage. */
  populations: PopulationDef[];
  presentation?: Presentation;
  champApplication?: ChampApplication;
  rubriques: Rubrique[];
  maladieAccident: MaintienSalaire[];
  prevoyance: PrevoyanceComplementaire[];
  /** Points de vigilance : ce que l'on vérifie avant d'appliquer la convention. */
  vigilance?: string[];
  veille?: Veille[];
  sources: Source[];
}

export interface Convention {
  idcc: string;
  titre: string;
}
