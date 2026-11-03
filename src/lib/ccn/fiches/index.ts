import type { FicheCcn, Veille } from "../types";
import { FICHE_1486 } from "./1486";
import { listKali } from "../kali";

/**
 * Registre des fiches renseignées. Une fiche = un fichier `NNNN.ts`.
 * Les IDCC absents d'ici s'affichent avec l'état « non renseignée » et les
 * liens vers les sources publiques.
 */
const FICHES: FicheCcn[] = [FICHE_1486];

const byCode = new Map(FICHES.map((f) => [f.idcc, f]));
const byBrochure = new Map(FICHES.filter((f) => f.brochure).map((f) => [f.brochure as string, f]));

export function getFiche(idcc: string): FicheCcn | undefined {
  return byCode.get(idcc);
}

export function getFicheParBrochure(brochure: string): FicheCcn | undefined {
  return byBrochure.get(brochure.replace(/\D/g, ""));
}

export function listFiches(): FicheCcn[] {
  return FICHES;
}

export function hasFiche(idcc: string): boolean {
  return byCode.has(idcc);
}

/** Nombre total de dispositions saisies, toutes fiches confondues (hors cartes paie). */
export function nbDispositions(): number {
  return FICHES.reduce((n, f) => n + (f.rubriques ?? []).reduce((m, r) => m + r.dispositions.length, 0) + f.maladieAccident.length + f.prevoyance.length, 0);
}

/** Fil de veille agrégé, du plus récent au plus ancien. */
export function veilleGlobale(limit = 6): (Veille & { idcc: string; nomUsage?: string })[] {
  return FICHES.flatMap((f) => (f.veille ?? []).map((v) => ({ ...v, idcc: f.idcc, nomUsage: f.nomUsage })))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

/** Métadonnées légères pour la recherche côté client. */
export function indexRecherche(): Record<string, { brochure?: string; nomUsage?: string; niveau?: string; fiche?: boolean; texte?: boolean; titreCourt?: string }> {
  const out: Record<string, { brochure?: string; nomUsage?: string; niveau?: string; fiche?: boolean; texte?: boolean; titreCourt?: string }> = {};
  for (const [idcc, k] of Object.entries(listKali())) out[idcc] = { texte: true, titreCourt: k.titreCourt };
  for (const f of FICHES) out[f.idcc] = { ...out[f.idcc], brochure: f.brochure, nomUsage: f.nomUsage, niveau: f.presentation?.niveau, fiche: true };
  return out;
}
