"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONVENTIONS, findConvention, niveauDuTitre, searchConventions } from "@/lib/ccn/idcc";
import type { Convention } from "@/lib/ccn/types";
import { useFavoris } from "@/lib/favoris";

export type IndexFiches = Record<string, { brochure?: string; nomUsage?: string; niveau?: string }>;

const EXEMPLES = ["1486", "3018", "Syntec", "commerces de gros", "0016"];
const NIVEAU_LABEL: Record<string, string> = { nationale: "Nationale", regionale: "Régionale", departementale: "Départementale", locale: "Locale" };

function fold(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function CarteConvention({ c, index }: { c: Convention; index: IndexFiches }) {
  const meta = index[c.idcc];
  const ok = !!meta;
  const niveau = meta?.niveau ?? niveauDuTitre(c.titre);
  return (
    <Link href={`/app/ccn/${c.idcc}`} className="card-soft group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:border-indigo-300">
      <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-indigo-500" fill="none" aria-hidden>
        <path d="M3 4.5h5.5a2 2 0 0 1 1.5.7 2 2 0 0 1 1.5-.7H17v11h-5.5a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0-1.5-1.5H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M10 5.2V17" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-slate-900">
          {meta?.nomUsage && <span className="text-indigo-700">{meta.nomUsage} · </span>}
          {c.titre}
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          {meta?.brochure && (
            <span>
              Numéro de brochure : <span className="font-mono-num font-semibold text-slate-800">{meta.brochure}</span>
            </span>
          )}
          <span>
            IDCC n° <span className="font-mono-num font-semibold text-slate-800">{c.idcc}</span>
          </span>
          <span className="rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">{NIVEAU_LABEL[niveau]}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${ok ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-500"}`}>
            {ok ? "Fiche renseignée" : "À renseigner"}
          </span>
        </p>
      </div>
      <span className="shrink-0 text-xs font-semibold text-indigo-700 group-hover:underline">Voir ›</span>
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
      .filter(([, m]) => (m.brochure && m.brochure === t.replace(/\D/g, "") && /^\d+$/.test(t)) || (m.nomUsage && fold(m.nomUsage).includes(t)))
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
      <form onSubmit={handleSubmit} className="rounded-3xl bg-[#0a0b16] p-6 text-white sm:p-8">
        <h2 className="text-xl font-semibold sm:text-2xl">Rechercher une convention collective</h2>
        <p className="mt-1 text-sm text-slate-300">
          Mot-clé, IDCC, numéro de brochure ou nom d&rsquo;usage, parmi les {CONVENTIONS.length} conventions de la liste officielle.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            id="q"
            type="text"
            inputMode="search"
            autoComplete="off"
            placeholder="1486, 3018, « Syntec » ou « bureaux d'études »"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full flex-1 rounded-full border border-white/10 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button type="submit" className="btn-glow rounded-full px-7 py-3.5 text-sm font-semibold">
            OK
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Exemples :</span>
            {EXEMPLES.map((ex) => (
              <button key={ex} type="button" onClick={() => setQ(ex)} className="rounded-full border border-white/15 px-2.5 py-1 text-slate-200 hover:border-indigo-300 hover:text-white">
                {ex}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={seulementRenseignees}
              onChange={(e) => setSeulementRenseignees(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-indigo-500"
            />
            Fiches renseignées uniquement ({nbRenseignees})
          </label>
        </div>
      </form>

      {results.length > 0 && (
        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">
            {results.length} convention{results.length > 1 ? "s" : ""} collective{results.length > 1 ? "s" : ""} correspond{results.length > 1 ? "ent" : ""} à votre recherche
          </p>
          <ul className="space-y-3">
            {results.map((c) => (
              <li key={c.idcc}>
                <CarteConvention c={c} index={index} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {q.trim() && results.length === 0 && (
        <p className="px-2 text-sm text-slate-500">Aucune convention ne correspond. Essayez le code IDCC à quatre chiffres ou le numéro de brochure.</p>
      )}

      {!q.trim() && !seulementRenseignees && favorisConv.length > 0 && (
        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">Mes favoris</p>
          <ul className="space-y-3">
            {favorisConv.map((c) => (
              <li key={c.idcc}>
                <CarteConvention c={c} index={index} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
