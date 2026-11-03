"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Disposition, FicheCcn, PopulationDef, Rubrique, Statut, ThemeId } from "@/lib/ccn/types";
import { THEMES, THEME_LABEL } from "@/lib/ccn/types";
import { STATUT_COLOR, dispositionsVisibles, matrice, vise } from "@/lib/ccn/populations";
import { BlocView, ReferenceLine } from "./Blocs";
import { MaintienCard, PrevoyanceCard, TagStatut } from "./Cartes";

/* ------------------------------------------------------------------ */
/*  Filtre population                                                  */
/* ------------------------------------------------------------------ */

function FiltrePopulations({ populations, cochees, onToggle }: { populations: PopulationDef[]; cochees: Set<Statut>; onToggle: (s: Statut) => void }) {
  return (
    <div className="panel sticky top-0 z-20 flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 print:static">
      <span className="text-sm font-medium text-ink">Populations affichées</span>
      {populations.map((p) => (
        <label key={p.id} className="flex cursor-pointer items-center gap-2 text-sm text-ink" title={p.detail}>
          <input type="checkbox" checked={cochees.has(p.id)} onChange={() => onToggle(p.id)} className="h-4 w-4 accent-[#1f3b5c]" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUT_COLOR[p.id] }} aria-hidden />
          {p.label}
        </label>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Matrice thèmes × populations                                       */
/* ------------------------------------------------------------------ */

function Matrice({ fiche, populations, cochees, onGo }: { fiche: FicheCcn; populations: PopulationDef[]; cochees: Set<Statut>; onGo: (t: ThemeId) => void }) {
  const lignes = useMemo(() => matrice(fiche, populations), [fiche, populations]);
  const cols = `minmax(12rem,15rem) repeat(${populations.length}, minmax(0,1fr))`;
  return (
    <div className="panel overflow-x-auto p-4 print:hidden">
      <p className="text-sm font-medium text-ink">Vue d&rsquo;ensemble</p>
      <p className="mt-0.5 text-xs text-muted">Une case pleine : la convention prévoit des dispositions pour cette population. Une case qui s&rsquo;étend sur plusieurs colonnes : dispositions identiques. Cliquez pour rejoindre le thème.</p>
      <div className="mt-4 min-w-[36rem]">
        <div className="grid items-center gap-x-1.5 gap-y-1" style={{ gridTemplateColumns: cols }}>
          <div />
          {populations.map((p) => (
            <div key={p.id} className="truncate text-center text-xs font-medium text-ink" style={{ opacity: cochees.has(p.id) ? 1 : 0.35 }}>
              {p.label}
            </div>
          ))}
          {lignes.map((l) => (
            <Ligne key={l.theme} l={l} cochees={cochees} onGo={onGo} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Ligne({ l, cochees, onGo }: { l: ReturnType<typeof matrice>[number]; cochees: Set<Statut>; onGo: (t: ThemeId) => void }) {
  return (
    <>
      <div className={`truncate pr-3 text-right text-xs ${l.vide ? "text-slate-400" : "font-medium text-ink"}`}>{l.label}</div>
      {l.cellules.map((c, i) => {
        const actif = c.populations.some((p) => cochees.has(p));
        return c.nb > 0 ? (
          <button
            key={i}
            type="button"
            onClick={() => onGo(l.theme)}
            style={{ gridColumn: `span ${c.populations.length}`, opacity: actif ? 1 : 0.3 }}
            className="h-6 rounded-sm bg-accent text-[11px] font-medium text-white hover:bg-accent-hover"
            title={`${l.label} : ${c.nb} disposition${c.nb > 1 ? "s" : ""}`}
          >
            {c.nb}
          </button>
        ) : (
          <div key={i} style={{ gridColumn: `span ${c.populations.length}` }} className="flex h-6 items-center justify-center rounded-sm bg-[#f0f3f7] text-[11px] text-slate-400">
            —
          </div>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Contenu d'un thème                                                 */
/* ------------------------------------------------------------------ */

function Tags({ populations, cible }: { populations: PopulationDef[]; cible: { populations: Statut[] } }) {
  const visees = populations.filter((p) => vise(cible, p.id));
  return (
    <span className="flex flex-wrap gap-1.5">
      {visees.length === populations.length ? <TagStatut statut="tous" label="Toutes les populations" /> : visees.map((p) => <TagStatut key={p.id} statut={p.id} label={p.label} />)}
    </span>
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
          <div key={i} className="rounded border-l-4 bg-[#f5f7fa] px-4 py-3" style={{ borderColor: STATUT_COLOR[x.population] }}>
            <p className="text-xs font-semibold text-ink">Précisions pour la population {p?.label ?? x.population}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{x.texte}</p>
          </div>
        );
      })}
    </div>
  );
}

function DispositionView({ d, populations, cochees }: { d: Disposition; populations: PopulationDef[]; cochees: Set<Statut> }) {
  return (
    <article id={`d-${d.id}`} className="scroll-mt-24 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-semibold text-ink">{d.titre}</h4>
        <Tags populations={populations} cible={d} />
      </div>
      <ReferenceLine r={d.reference} />
      {d.blocs.map((b, i) => (
        <BlocView key={i} b={b} />
      ))}
      <Precisions items={d.precisions} populations={populations} cochees={cochees} />
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
    <section id={`t-${theme}`} ref={refCb} className="panel scroll-mt-24 p-5 sm:p-6">
      <h3 className="theme-title">{THEME_LABEL[theme]}</h3>
      <div className="mt-5 divide-y divide-line [&>*]:py-5 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
        <Precisions items={rubrique?.precisions} populations={populations} cochees={cochees} />
        {vide && <p className="text-sm text-muted">Aucune disposition pour les populations sélectionnées.</p>}
        {maladie.map((m, i) => (
          <MaintienCard key={`m${i}`} m={m} />
        ))}
        {prev.map((p, i) => (
          <PrevoyanceCard key={`p${i}`} p={p} />
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
    <nav aria-label="Thèmes" className="panel sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto print:hidden">
      {themes.map((t) => {
        const open = ouvert === t.id;
        return (
          <div key={t.id} className="border-b border-line last:border-0">
            <a
              href={`#t-${t.id}`}
              onClick={() => onOpen(t.id)}
              aria-disabled={t.vide}
              className={`flex items-center gap-2 px-3 py-2 text-sm ${t.vide ? "pointer-events-none text-slate-400" : actif === t.id ? "bg-accent-soft font-semibold text-accent" : "text-ink hover:bg-[#f5f7fa]"}`}
            >
              <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`} fill="none" aria-hidden>
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="truncate">{t.label}</span>
            </a>
            {open && t.dispositions.length > 0 && (
              <ul className="pb-2">
                {t.dispositions.map((d) => (
                  <li key={d.id}>
                    <a href={`#d-${d.id}`} className="block truncate py-1 pl-8 pr-3 text-xs text-muted hover:text-accent">
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
        const existe = !!r?.dispositions.length || (t.id === "maladie_accident" && fiche.maladieAccident.length > 0) || (t.id === "prevoyance" && fiche.prevoyance.length > 0);
        return { id: t.id, label: t.label, dispositions, vide: !existe };
      }),
    [parTheme, cochees, fiche],
  );

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

      <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
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
