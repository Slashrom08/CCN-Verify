/**
 * Modèle de données d'une fiche conventionnelle.
 *
 * Une fiche = un IDCC + les dispositions « Maladie – Accident » (maintien de
 * salaire par l'employeur) et « Prévoyance complémentaire » (décès, incapacité,
 * invalidité), déclinées par statut. Dans 98 % des cas : Cadres / Non-cadres.
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
  /** Ex. « 100 % du salaire annuel brut », « 80 % du salaire brut sous déduction IJSS ». */
  montant: string;
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
  garanties: Garantie[];
  cotisation?: Cotisation;
  organisme?: string;
  conditions?: string[];
  notes?: string[];
  sources: Source[];
}

export interface FicheCcn {
  idcc: string;
  /** Nom d'usage (ex. « Syntec ») en plus du titre officiel. */
  nomUsage?: string;
  brochure?: string;
  fiabilite: Fiabilite;
  /** Date de dernière mise à jour de la fiche (AAAA-MM-JJ). */
  maj: string;
  resume?: string;
  maladieAccident: MaintienSalaire[];
  prevoyance: PrevoyanceComplementaire[];
  /** Points de vigilance paie / SIRH : ce que l'on regarde tous les jours. */
  vigilance?: string[];
  sources: Source[];
}

export interface Convention {
  idcc: string;
  titre: string;
}
