"use client";

import type { Convention, FicheCcn } from "@/lib/ccn/types";
import { useFavoris } from "@/lib/favoris";
import { legifranceIdccUrl } from "@/lib/ccn/legifrance";

const NIVEAU: Record<NonNullable<FicheCcn["presentation"]>["niveau"], string> = {
  nationale: "Nationale",
  regionale: "Régionale",
  departementale: "Départementale",
  locale: "Locale",
};

export function FicheHeader({ convention, fiche, technique }: { convention: Convention; fiche?: FicheCcn; technique: boolean }) {
  const { est, toggle, pret } = useFavoris();
  const fav = est(convention.idcc);
  const niveau = fiche?.presentation?.niveau ?? "nationale";

  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-center justify-end gap-4 text-xs print:hidden">
        <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-indigo-700">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
            <path d="M6 7V3h8v4M5 14H3V8h14v6h-2M6 11h8v6H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          Imprimer
        </button>
        <button
          type="button"
          onClick={() => toggle(convention.idcc)}
          aria-pressed={fav}
          disabled={!pret}
          className={`inline-flex items-center gap-1.5 ${fav ? "text-amber-600" : "text-slate-600 hover:text-indigo-700"}`}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill={fav ? "currentColor" : "none"} aria-hidden>
            <path d="m10 2.5 2.3 4.9 5.2.6-3.9 3.6 1 5.3L10 14.3l-4.6 2.6 1-5.3L2.5 8l5.2-.6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          {fav ? "Dans mes favoris" : "Ajouter aux favoris"}
        </button>
      </div>

      <div className="rounded-3xl bg-[#0a0b16] p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="flex items-start gap-3 text-lg font-semibold leading-snug sm:text-xl">
              <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-indigo-300" fill="none" aria-hidden>
                <path d="M3 4.5h5.5a2 2 0 0 1 1.5.7 2 2 0 0 1 1.5-.7H17v11h-5.5a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0-1.5-1.5H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M10 5.2V17" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span>
                {fiche?.nomUsage && <span className="text-indigo-300">{fiche.nomUsage} · </span>}
                {convention.titre}
              </span>
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              {fiche?.brochure && (
                <span>
                  Numéro de brochure : <span className="font-mono-num font-semibold text-white">{fiche.brochure}</span>
                </span>
              )}
              <span>
                IDCC n° <span className="font-mono-num font-semibold text-white">{convention.idcc}</span>
              </span>
              {!technique && <span className="rounded border border-white/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]">{NIVEAU[niveau]}</span>}
              {fiche?.presentation?.etendue && (
                <span className="rounded border border-indigo-300/60 bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-100">Étendue</span>
              )}
            </p>
          </div>
          {!technique && (
            <a
              href={legifranceIdccUrl(convention.idcc)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-transform hover:scale-[1.03] print:hidden"
            >
              Texte sur Légifrance ↗
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
