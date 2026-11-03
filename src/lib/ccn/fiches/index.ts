import type { FicheCcn } from "../types";
import { FICHE_1486 } from "./1486";

/**
 * Registre des fiches renseignées. Une fiche = un fichier `NNNN.ts`.
 * Les IDCC absents d'ici s'affichent avec l'état « non renseignée » et les
 * liens vers les sources publiques.
 */
const FICHES: FicheCcn[] = [FICHE_1486];

const byCode = new Map(FICHES.map((f) => [f.idcc, f]));

export function getFiche(idcc: string): FicheCcn | undefined {
  return byCode.get(idcc);
}

export function listFiches(): FicheCcn[] {
  return FICHES;
}

export function hasFiche(idcc: string): boolean {
  return byCode.has(idcc);
}
