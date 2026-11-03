"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONVENTIONS, findConvention, niveauDuTitre, searchConventions } from "@/lib/ccn/idcc";
import type { Convention } from "@/lib/ccn/types";
import { useFavoris } from "@/lib/favoris";
import { exporterListe } from "@/lib/ccn/export";
import { ExportButton } from "@/components/ExportButton";

export type IndexFiches = Record<string, { brochure?: string; nomUsage?: string; niveau?: string }>;

const EXEMPLES = ["1486", "3018", "Syntec", "commerces de gros", "0016"];
const NIVEAU_LABEL: Record<string, string> = { nationale: "Nationale", regionale: "Régionale", departementale: "Départementale", locale: "Locale" };

function fold(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function LigneConvention({ c, index }: { c: Convention; index: IndexFiches }) {
  const meta = index[c.idcc];
  const ok = !!meta;
  const niveau = meta?.niveau ?? niveauDuTitre(c.titre);
  return (
    <Link href={`/app/ccn/${c.idcc}`} className="flex items-center gap-4 px-4 py-3 hover:bg-accent-soft">
      <span className="font-mono-num w-12 shrink-0 text-sm font-semibold text-accent">{c.idcc}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-snug text-ink">
          {meta?.nomUsage && <span className="text-accent">{meta.nomUsage} · </span>}
          {c.titre}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted">
          {meta?.brochure && <span>Brochure {meta.brochure}</span>}
          <span>{NIVEAU_LABEL[niveau]}</span>
        </span>
      </span>
      <span className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-medium ${ok ? "bg-accent-soft text-accent" : "bg-bg text-muted"}`}>{ok ? "Renseignée" : "À renseigner"}</span>
    </Link>
  );
}

export function CcnSearch({ index }: { index: IndexFiches }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [seulementRenseignees, setSeulementRenseignees] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { favoris, pret } = useFavoris();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /** Brochure ou nom d'usage → IDCC, en plus de la recherche officielle par code et par titre. */
  const parMeta = useMemo(() => {
    const t = fold(q.trim());
    if (!t) return [];
    return Object.entries(index)
      .filter(([, m]) => (m.brochure && /^\d+$/.test(t) && m.brochure === t) || (m.nomUsage && fold(m.nomUsage).includes(t)))
      .map(([idcc]) => findConvention(idcc))
      .filter((c): c is Convention => !!c);
  }, [q, index]);

  const results: Convention[] = useMemo(() => {
    const base = q.trim() ? searchConventions(q, 80) : seulementRenseignees ? CONVENTIONS : [];
    const merged = [...parMeta, ...base.filter((c) => !parMeta.some((m) => m.idcc === c.idcc))];
    return seulementRenseignees ? merged.filter((c) => !!index[c.idcc]) : merged;
  }, [q, seulementRenseignees, index, parMeta]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cible = parMeta[0] ?? findConvention(q) ?? (results.length === 1 ? results[0] : undefined);
    if (cible) router.push(`/app/ccn/${cible.idcc}`);
  }

  const favorisConv = pret ? favoris.map((f) => findConvention(f)).filter((c): c is Convention => !!c) : [];
  const nbRenseignees = Object.keys(index).length;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="panel p-5 sm:p-6">
        <h1 className="text-xl font-semibold text-ink">Rechercher une convention collective</h1>
        <p className="mt-1 text-sm text-muted">
          IDCC, numéro de brochure, nom d&rsquo;usage ou mots du titre, parmi les {CONVENTIONS.length} conventions de la liste officielle.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            id="q"
            type="text"
            inputMode="search"
            autoComplete="off"
            placeholder="1486, 3018, Syntec, bureaux d'études…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input flex-1"
          />
          <button type="submit" className="btn justify-center">
            Rechercher
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>Exemples :</span>
            {EXEMPLES.map((ex) => (
              <button key={ex} type="button" onClick={() => setQ(ex)} className="rounded border border-line bg-white px-2 py-0.5 text-ink hover:border-accent">
                {ex}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" checked={seulementRenseignees} onChange={(e) => setSeulementRenseignees(e.target.checked)} className="h-4 w-4 accent-[#1f3b5c]" />
            Fiches renseignées uniquement ({nbRenseignees})
          </label>
        </div>
      </form>

      {results.length > 0 && (
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">
              {results.length} convention{results.length > 1 ? "s" : ""} correspond{results.length > 1 ? "ent" : ""} à votre recherche
            </p>
            <ExportButton label="Exporter la liste" onExport={() => exporterListe(results, index)} />
          </div>
          <ul className="panel mt-3 divide-y divide-line">
            {results.map((c) => (
              <li key={c.idcc}>
                <LigneConvention c={c} index={index} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {q.trim() && results.length === 0 && <p className="text-sm text-muted">Aucune convention ne correspond. Essayez le code IDCC à quatre chiffres ou le numéro de brochure.</p>}

      {!q.trim() && !seulementRenseignees && favorisConv.length > 0 && (
        <section>
          <p className="text-sm font-semibold text-ink">Mes favoris</p>
          <ul className="panel mt-3 divide-y divide-line">
            {favorisConv.map((c) => (
              <li key={c.idcc}>
                <LigneConvention c={c} index={index} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
