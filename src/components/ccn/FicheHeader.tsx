"use client";

import type { Convention, FicheCcn } from "@/lib/ccn/types";
import { useFavoris } from "@/lib/favoris";
import { legifranceIdccUrl } from "@/lib/ccn/legifrance";
import { exporterFiche } from "@/lib/ccn/export";
import { ExportButton } from "@/components/ExportButton";

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
    <header className="panel p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span>
              IDCC <span className="font-mono-num font-semibold text-ink">{convention.idcc}</span>
            </span>
            {fiche?.brochure && (
              <span>
                Brochure <span className="font-mono-num font-semibold text-ink">{fiche.brochure}</span>
              </span>
            )}
            {!technique && <span className="rounded border border-line px-1.5 py-0.5 text-[11px] font-medium text-ink">{NIVEAU[niveau]}</span>}
            {fiche?.presentation?.etendue && <span className="rounded border border-line bg-accent-soft px-1.5 py-0.5 text-[11px] font-medium text-accent">Étendue</span>}
          </p>
          <h1 className="mt-2 text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {fiche?.nomUsage && <span className="text-accent">{fiche.nomUsage} · </span>}
            {convention.titre}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          {fiche && <ExportButton onExport={() => exporterFiche(convention, fiche)} />}
          <button type="button" onClick={() => window.print()} className="btn-secondary">
            Imprimer
          </button>
          <button type="button" onClick={() => toggle(convention.idcc)} aria-pressed={fav} disabled={!pret} className={`btn-secondary ${fav ? "border-accent text-accent" : ""}`}>
            {fav ? "★ Favori" : "☆ Favori"}
          </button>
          {!technique && (
            <a href={legifranceIdccUrl(convention.idcc)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Légifrance ↗
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
