import raw from "@/data/idcc.json";
import type { Convention } from "./types";

interface IdccFile {
  source: string;
  nombre: number;
  conventions: Convention[];
}

const data = raw as IdccFile;

export const IDCC_SOURCE = data.source;

/** Codes techniques de la DSN sans texte conventionnel derrière. */
const CODES_TECHNIQUES = new Set(["5100", "9998", "9999"]);

export const CONVENTIONS: Convention[] = data.conventions;

const byCode = new Map(CONVENTIONS.map((c) => [c.idcc, c]));

/** Normalise une saisie utilisateur (« 1486 », « 486 », « 0016 ») vers le code à 4 chiffres. */
export function normalizeIdcc(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (!digits || digits.length > 4) return null;
  return digits.padStart(4, "0");
}

export function findConvention(idcc: string): Convention | undefined {
  const code = normalizeIdcc(idcc);
  return code ? byCode.get(code) : undefined;
}

export function isCodeTechnique(idcc: string): boolean {
  return CODES_TECHNIQUES.has(idcc);
}

function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Recherche par code ou par mots du titre (tous les mots doivent apparaître). */
export function searchConventions(query: string, limit = 50): Convention[] {
  const q = query.trim();
  if (!q) return [];
  const asCode = normalizeIdcc(q);
  const results: Convention[] = [];
  if (/^\d+$/.test(q)) {
    for (const c of CONVENTIONS) {
      if (c.idcc.startsWith(q.padStart(Math.min(q.length, 4), "0")) || c.idcc === asCode || c.idcc.includes(q)) results.push(c);
    }
    return results.slice(0, limit);
  }
  const words = fold(q).split(/\s+/).filter(Boolean);
  for (const c of CONVENTIONS) {
    const t = fold(c.titre);
    if (words.every((w) => t.includes(w))) results.push(c);
    if (results.length >= limit) break;
  }
  return results;
}
