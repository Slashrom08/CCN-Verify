import index from "@/data/kali-index.json";

/** Index des conventions dont le texte intégral KALI est disponible (généré par scripts/import-kali.mjs). */
export interface KaliMeta {
  id: string;
  titre: string;
  titreCourt: string;
  articles: number;
  octets: number;
}

interface KaliIndex {
  source: string;
  version: string;
  genere: string;
  conventions: Record<string, KaliMeta>;
}

const data = index as KaliIndex;

export const KALI_SOURCE = data.source;
export const KALI_VERSION = data.version;
export const KALI_DATE = data.genere;

export function getKaliMeta(idcc: string): KaliMeta | undefined {
  return data.conventions[idcc];
}

export function listKali(): Record<string, KaliMeta> {
  return data.conventions;
}

export function nbArticlesKali(): number {
  return Object.values(data.conventions).reduce((n, c) => n + c.articles, 0);
}

/* ------------------------------------------------------------------ */
/*  Document compact (public/kali/NNNN.json)                           */
/* ------------------------------------------------------------------ */

export interface KaliLien {
  t: string;
  titre: string;
  date?: string;
}

export interface KaliArticle {
  t: "a";
  id: string;
  num: string | null;
  titre: string | null;
  etat: string | null;
  html: string;
  liens?: KaliLien[];
}

export interface KaliSection {
  t: "s";
  id: string | null;
  titre: string;
  etat: string | null;
  enfants: KaliNode[];
}

export type KaliNode = KaliArticle | KaliSection;

export interface KaliDoc {
  idcc: string;
  id: string;
  titre: string;
  titreCourt: string;
  groupes: KaliSection[];
}

export const ETAT_LABEL: Record<string, { label: string; tone: "ok" | "warn" | "off" }> = {
  VIGUEUR_ETEN: { label: "En vigueur, étendu", tone: "ok" },
  VIGUEUR_NON_ETEN: { label: "En vigueur, non étendu", tone: "warn" },
  VIGUEUR: { label: "En vigueur", tone: "ok" },
  MODIFIE: { label: "Modifié", tone: "warn" },
  ABROGE: { label: "Abrogé", tone: "off" },
  PERIME: { label: "Périmé", tone: "off" },
  DENONCE: { label: "Dénoncé", tone: "off" },
  REMPLACE: { label: "Remplacé", tone: "off" },
};

export function etatInfo(etat: string | null): { label: string; tone: "ok" | "warn" | "off" } {
  return (etat && ETAT_LABEL[etat]) || { label: etat ?? "État inconnu", tone: "warn" };
}

export function enVigueur(etat: string | null): boolean {
  return !etat || etat.startsWith("VIGUEUR");
}

export function legifranceArticleUrl(id: string): string {
  return `https://www.legifrance.gouv.fr/conv_coll/id/${id}`;
}

export function legifranceConventionUrl(id: string): string {
  return `https://www.legifrance.gouv.fr/conv_coll/id/${id}`;
}

/** Nettoyage minimal du HTML DILA avant insertion : balises de script, styles, gestionnaires d'évènements. */
export function sanitize(html: string): string {
  return html
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi, "");
}

/** Texte brut d'un contenu HTML, pour la recherche. */
export function texteBrut(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/[ \t]+/g, " ")
    .trim();
}
