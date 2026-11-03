"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Disposition, FicheCcn, PopulationDef, Rubrique, Statut, ThemeId } from "@/lib/ccn/types";
import { THEMES, THEME_LABEL } from "@/lib/ccn/types";
import { STATUT_COLOR, dispositionsVisibles, matrice, vise } from "@/lib/ccn/populations";
import { BlocView, ReferenceLine } from "./Blocs";
import { MaintienCard, PrevoyanceCard } from "./Cartes";

/* ------------------------------------------------------------------ */
/*  Filtre population                                                  */
/* ------------------------------------------------------------------ */

function Check({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      {on ? (
        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      )}
    </svg>
  );
}

function FiltrePopulations({
  populations,
  cochees,
  onToggle,
}: {
  populations: PopulationDef[];
  cochees: Set<Statut>;
  onToggle: (s: Statut) => void;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-4 bg-[#f4f4f9]/95 px-4 py-3 backdrop-blur print:static print:bg-transparent">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Populations</span>
        {populations.map((p) => {
          const on = cochees.has(p.id);
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              title={p.detail}
              onClick={() => onToggle(p.id)}
              style={on ? { background: STATUT_COLOR[p.id], borderColor: STATUT_COLOR[p.id] } : { color: STATUT_COLOR[p.id], borderColor: STATUT_COLOR[p.id] }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${on ? "text-white" : "bg-white opacity-70 hover:opacity-100"}`}
            >
              {p.label}
              <Check on={on} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Matrice thèmes × populations                                       */
/* ------------------------------------------------------------------ */

function Matrice({
  fiche,
  populations,
  cochees,
  onGo,
}: {
  fiche: FicheCcn;
  populations: PopulationDef[];
  cochees: Set<Statut>;
  onGo: (t: ThemeId) => void;
}) {
  const lignes = useMemo(() => matrice(fiche, populations), [fiche, populations]);
  const cols = `minmax(11rem,14rem) repeat(${populations.length}, minmax(0,1fr))`;
  return (
    <div className="card-soft overflow-x-auto rounded-3xl p-4 print:hidden">
      <div className="min-w-[36rem]">
        <div className="grid items-center gap-x-2 gap-y-1.5" style={{ gridTemplateColumns: cols }}>
          <div />
          {populations.map((p) => (
            <div
              key={p.id}
              className="truncate text-center text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: STATUT_COLOR[p.id], opacity: cochees.has(p.id) ? 1 : 0.35 }}
            >
              {p.label}
            </div>
          ))}
          {lignes.map((l) => (
            <Ligne key={l.theme} l={l} cochees={cochees} onGo={onGo} />
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        Une barre pleine signale des dispositions conventionnelles pour la population. Une même barre sur plusieurs colonnes : dispositions identiques. Cliquer pour rejoindre le thème.
      </p>
    </div>
  );
}

function Ligne({ l, cochees, onGo }: { l: ReturnType<typeof matrice>[number]; cochees: Set<Statut>; onGo: (t: ThemeId) => void }) {
  return (
    <>
      <div className={`truncate pr-2 text-right text-[11px] font-semibold uppercase tracking-wide ${l.vide ? "text-slate-300" : "text-slate-700"}`}>{l.label}</div>
      {l.cellules.map((c, i) => {
        const actif = c.populations.some((p) => cochees.has(p));
        return c.nb > 0 ? (
          <button
            key={i}
            type="button"
            onClick={() => onGo(l.theme)}
            style={{ gridColumn: `span ${c.populations.length}`, opacity: actif ? 1 : 0.3 }}
            className="h-5 rounded-md bg-indigo-500 transition-colors hover:bg-indigo-600"
            title={`${l.label} : ${c.nb} disposition${c.nb > 1 ? "s" : ""}`}
            aria-label={`${l.label}, ${c.nb} disposition${c.nb > 1 ? "s" : ""}`}
          />
        ) : (
          <div
            key={i}
            style={{ gridColumn: `span ${c.populations.length}` }}
            className="flex h-5 items-center justify-center rounded-md border border-slate-200 text-[9px] text-slate-400"
          >
            pas de dispositions
          </div>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Contenu d'un thème                                                 */
/* ------------------------------------------------------------------ */

/** Bandes de couleur à gauche : une par population de la fiche, pleine si la disposition la vise. */
function Bandes({ populations, cible }: { populations: PopulationDef[]; cible: { populations: Statut[] } }) {
  return (
    <div className="flex shrink-0 gap-[3px]" aria-hidden>
      {populations.map((p) => (
        <span
          key={p.id}
          className="w-[4px] rounded-full"
          style={{ background: vise(cible, p.id) ? STATUT_COLOR[p.id] : "rgba(16,17,31,0.06)" }}
        />
      ))}
    </div>
  );
}

function Precisions({ items, populations, cochees }: { items?: { population: Statut; texte: string }[]; populations: PopulationDef[]; cochees: Set<Statut> }) {
  const visibles = (items ?? []).filter((x) => cochees.has(x.population));
  if (!visibles.length) return null;
  return (
    <div className="space-y-3">
      {visibles.map((x, i) => {
        const p = populations.find((q) => q.id === x.population);
        return (
          <div key={i} className="overflow-hidden rounded-2xl border" style={{ borderColor: STATUT_COLOR[x.population] }}>
            <p className="px-4 py-1.5 text-xs font-semibold text-white" style={{ background: STATUT_COLOR[x.population] }}>
              Précisions pour la population {p?.label ?? x.population}
            </p>
            <p className="px-4 py-3 text-sm leading-relaxed text-slate-700">{x.texte}</p>
          </div>
        );
      })}
    </div>
  );
}

function DispositionView({ d, populations, cochees }: { d: Disposition; populations: PopulationDef[]; cochees: Set<Statut> }) {
  return (
    <article id={`d-${d.id}`} className="flex gap-4 scroll-mt-28">
      <Bandes populations={populations} cible={d} />
      <div className="min-w-0 flex-1 space-y-3">
        <h4 className="text-lg font-semibold text-slate-900">{d.titre}</h4>
        <ReferenceLine r={d.reference} />
        {d.blocs.map((b, i) => (
          <BlocView key={i} b={b} />
        ))}
        <Precisions items={d.precisions} populations={populations} cochees={cochees} />
      </div>
    </article>
  );
}

function ThemeSection({
  theme,
  rubrique,
  fiche,
  populations,
  cochees,
  refCb,
}: {
  theme: ThemeId;
  rubrique?: Rubrique;
  fiche: FicheCcn;
  populations: PopulationDef[];
  cochees: Set<Statut>;
  refCb: (el: HTMLElement | null) => void;
}) {
  const dispositions = dispositionsVisibles(rubrique, cochees);
  const maladie = theme === "maladie_accident" ? fiche.maladieAccident.filter((m) => m.statut === "tous" || cochees.has(m.statut)) : [];
  const prev = theme === "prevoyance" ? fiche.prevoyance.filter((p) => p.statut === "tous" || cochees.has(p.statut)) : [];
  const vide = !dispositions.length && !maladie.length && !prev.length;

  return (
    <section id={`t-${theme}`} ref={refCb} className="card-soft scroll-mt-28 rounded-3xl p-5 sm:p-7">
      <h3 className="theme-title">{THEME_LABEL[theme]}</h3>
      <div className="mt-5 space-y-8">
        <Precisions items={rubrique?.precisions} populations={populations} cochees={cochees} />
        {vide && <p className="text-sm text-slate-500">Aucune disposition pour les populations sélectionnées.</p>}
        {maladie.map((m, i) => (
          <div key={`m${i}`} className="flex gap-4">
            <Bandes populations={populations} cible={{ populations: [m.statut] }} />
            <div className="min-w-0 flex-1">
              <MaintienCard m={m} />
            </div>
          </div>
        ))}
        {prev.map((p, i) => (
          <div key={`p${i}`} className="flex gap-4">
            <Bandes populations={populations} cible={{ populations: [p.statut] }} />
            <div className="min-w-0 flex-1">
              <PrevoyanceCard p={p} />
            </div>
          </div>
        ))}
        {dispositions.map((d) => (
          <DispositionView key={d.id} d={d} populations={populations} cochees={cochees} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sommaire latéral                                                   */
/* ------------------------------------------------------------------ */

function Sommaire({
  themes,
  actif,
  ouvert,
  onOpen,
}: {
  themes: { id: ThemeId; label: string; dispositions: Disposition[]; vide: boolean }[];
  actif: ThemeId | null;
  ouvert: ThemeId | null;
  onOpen: (t: ThemeId) => void;
}) {
  return (
    <nav aria-label="Thèmes" className="card-soft sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl print:hidden">
      {themes.map((t) => {
        const open = ouvert === t.id;
        return (
          <div key={t.id} className="border-b border-slate-100 last:border-0">
            <a
              href={`#t-${t.id}`}
              onClick={() => onOpen(t.id)}
              aria-disabled={t.vide}
              className={`flex items-center gap-2 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide ${
                t.vide ? "pointer-events-none text-slate-300" : actif === t.id ? "bg-indigo-50 text-indigo-800" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`} fill="none" aria-hidden>
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="truncate">{t.label}</span>
              {t.vide && <span className="ml-auto text-[9px] font-normal normal-case tracking-normal">pas de dispositions</span>}
            </a>
            {open && t.dispositions.length > 0 && (
              <ul className="pb-2">
                {t.dispositions.map((d) => (
                  <li key={d.id}>
                    <a href={`#d-${d.id}`} className="block truncate py-1 pl-8 pr-3 text-xs text-slate-600 hover:text-indigo-700">
                      {d.titre}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Onglet Obligations                                                 */
/* ------------------------------------------------------------------ */

export function Obligations({ fiche, populations }: { fiche: FicheCcn; populations: PopulationDef[] }) {
  const [cochees, setCochees] = useState<Set<Statut>>(() => new Set(populations.map((p) => p.id)));
  const [actif, setActif] = useState<ThemeId | null>(null);
  const [ouvert, setOuvert] = useState<ThemeId | null>(null);
  const sections = useRef(new Map<ThemeId, HTMLElement>());

  const parTheme = useMemo(() => {
    const m = new Map<ThemeId, Rubrique>();
    for (const r of fiche.rubriques ?? []) m.set(r.theme, r);
    return m;
  }, [fiche]);

  const themes = useMemo(
    () =>
      THEMES.map((t) => {
        const r = parTheme.get(t.id);
        const dispositions = dispositionsVisibles(r, cochees);
        const extra =
          (t.id === "maladie_accident" && fiche.maladieAccident.some((m) => m.statut === "tous" || cochees.has(m.statut))) ||
          (t.id === "prevoyance" && fiche.prevoyance.some((p) => p.statut === "tous" || cochees.has(p.statut)));
        const existe = !!r?.dispositions.length || (t.id === "maladie_accident" && fiche.maladieAccident.length > 0) || (t.id === "prevoyance" && fiche.prevoyance.length > 0);
        return { id: t.id, label: t.label, dispositions, vide: !existe, visible: existe && (dispositions.length > 0 || extra) };
      }),
    [parTheme, cochees, fiche],
  );

  // Thème courant dans le sommaire, au défilement.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActif(hit.target.id.replace("t-", "") as ThemeId);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    for (const el of sections.current.values()) io.observe(el);
    return () => io.disconnect();
  }, [themes]);

  function toggle(s: Statut) {
    setCochees((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  function go(t: ThemeId) {
    setOuvert(t);
    document.getElementById(`t-${t}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-6">
      <FiltrePopulations populations={populations} cochees={cochees} onToggle={toggle} />
      {cochees.size === 0 && <p className="text-sm text-amber-800">Cochez au moins une population pour afficher les dispositions.</p>}
      <Matrice fiche={fiche} populations={populations} cochees={cochees} onGo={go} />

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <Sommaire themes={themes} actif={actif} ouvert={ouvert} onOpen={(t) => setOuvert((o) => (o === t ? null : t))} />
        <div className="min-w-0 space-y-6">
          {themes
            .filter((t) => !t.vide)
            .map((t) => (
              <ThemeSection
                key={t.id}
                theme={t.id}
                rubrique={parTheme.get(t.id)}
                fiche={fiche}
                populations={populations}
                cochees={cochees}
                refCb={(el) => {
                  if (el) sections.current.set(t.id, el);
                  else sections.current.delete(t.id);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
