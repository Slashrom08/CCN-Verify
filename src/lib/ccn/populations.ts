import type { Disposition, FicheCcn, PopulationDef, Rubrique, Statut, ThemeId } from "./types";
import { STATUT_LABEL, STATUT_ORDER, THEMES } from "./types";

/** Couleur de chaque population : barre à gauche des dispositions, cases du filtre. */
export const STATUT_COLOR: Record<Statut, string> = {
  ouvriers: "#78716c",
  employes: "#a16207",
  non_cadres: "#a16207",
  etam: "#0f766e",
  agents_maitrise: "#0284c7",
  cadres: "#312e81",
  autre: "#d97706",
  tous: "#6366f1",
};

/** Populations de la fiche : celles déclarées, sinon déduites des dispositions. */
export function populationsDe(fiche: FicheCcn): PopulationDef[] {
  if (fiche.populations?.length) return fiche.populations;
  const set = new Set<Statut>();
  for (const m of fiche.maladieAccident) set.add(m.statut);
  for (const p of fiche.prevoyance) set.add(p.statut);
  for (const r of fiche.rubriques ?? []) for (const d of r.dispositions) for (const s of d.populations) set.add(s);
  set.delete("tous");
  const list = STATUT_ORDER.filter((s) => set.has(s)).map((id) => ({ id, label: STATUT_LABEL[id] }));
  return list.length ? list : [{ id: "tous", label: STATUT_LABEL.tous }];
}

/** Une disposition vise une population si elle la cite, ou si elle vise « tous ». */
export function vise(d: { populations: Statut[] }, statut: Statut): boolean {
  return d.populations.includes("tous") || d.populations.includes(statut);
}

/** Une disposition est visible si au moins une des populations cochées est visée. */
export function visible(d: { populations: Statut[] }, cochees: Set<Statut>): boolean {
  for (const s of cochees) if (vise(d, s)) return true;
  return false;
}

export interface CelluleMatrice {
  /** Populations couvertes par cette cellule (fusionnées quand les mêmes dispositions s'appliquent). */
  populations: Statut[];
  /** Nombre de dispositions ; 0 = « pas de dispositions ». */
  nb: number;
}

export interface LigneMatrice {
  theme: ThemeId;
  label: string;
  cellules: CelluleMatrice[];
  /** Vrai si aucune population n'a de disposition. */
  vide: boolean;
}

/**
 * Matrice thèmes × populations. Les cellules voisines qui regroupent exactement
 * les mêmes dispositions sont fusionnées en une seule barre, comme sur Diode.
 */
export function matrice(fiche: FicheCcn, populations: PopulationDef[]): LigneMatrice[] {
  const parTheme = new Map<ThemeId, Rubrique>();
  for (const r of fiche.rubriques ?? []) parTheme.set(r.theme, r);

  return THEMES.map((t) => {
    const r = parTheme.get(t.id);
    const ids = populations.map((p) => {
      const list: string[] = [];
      for (const d of r?.dispositions ?? []) if (vise(d, p.id)) list.push(d.id);
      if (t.id === "maladie_accident") for (const m of fiche.maladieAccident) if (m.statut === p.id || m.statut === "tous") list.push(`ma:${m.statut}`);
      if (t.id === "prevoyance") for (const m of fiche.prevoyance) if (m.statut === p.id || m.statut === "tous") list.push(`pr:${m.statut}`);
      return list.sort().join("|");
    });

    const cellules: CelluleMatrice[] = [];
    populations.forEach((p, i) => {
      const prev = cellules[cellules.length - 1];
      const nb = ids[i] ? ids[i].split("|").length : 0;
      if (prev && nb > 0 && ids[i] === ids[i - 1]) prev.populations.push(p.id);
      else cellules.push({ populations: [p.id], nb });
    });

    return { theme: t.id, label: t.label, cellules, vide: cellules.every((c) => c.nb === 0) };
  });
}

/** Dispositions d'un thème visibles pour les populations cochées. */
export function dispositionsVisibles(r: Rubrique | undefined, cochees: Set<Statut>): Disposition[] {
  return (r?.dispositions ?? []).filter((d) => visible(d, cochees));
}
