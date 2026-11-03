"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONVENTIONS, findConvention, searchConventions } from "@/lib/ccn/idcc";
import type { Convention } from "@/lib/ccn/types";

const EXEMPLES = ["1486", "2098", "1517", "3248", "0016", "2216"];

export function CcnSearch({ renseignees }: { renseignees: string[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [seulementRenseignees, setSeulementRenseignees] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filled = useMemo(() => new Set(renseignees), [renseignees]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results: Convention[] = useMemo(() => {
    const base = q.trim() ? searchConventions(q, 80) : seulementRenseignees ? CONVENTIONS : [];
    return seulementRenseignees ? base.filter((c) => filled.has(c.idcc)) : base;
  }, [q, seulementRenseignees, filled]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const exact = findConvention(q);
    if (exact) {
      router.push(`/app/ccn/${exact.idcc}`);
    } else if (results.length === 1) {
      router.push(`/app/ccn/${results[0].idcc}`);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card-soft rounded-3xl p-5 sm:p-6">
        <label htmlFor="q" className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          IDCC ou mots du titre
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            id="q"
            type="text"
            inputMode="search"
            autoComplete="off"
            placeholder="1486, ou « bureaux d'études »"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full flex-1 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            className="rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Ouvrir la fiche
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Exemples :</span>
            {EXEMPLES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setQ(code)}
                className="font-mono-num rounded-full border border-slate-200 px-2.5 py-1 text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
              >
                {code}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              checked={seulementRenseignees}
              onChange={(e) => setSeulementRenseignees(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
            />
            Fiches renseignées uniquement ({renseignees.length})
          </label>
        </div>
      </form>

      {results.length > 0 && (
        <ul className="card-soft divide-y divide-slate-100 overflow-hidden rounded-3xl">
          {results.map((c) => {
            const ok = filled.has(c.idcc);
            return (
              <li key={c.idcc}>
                <Link href={`/app/ccn/${c.idcc}`} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-indigo-50/60">
                  <span className="font-mono-num w-14 shrink-0 text-sm font-semibold text-indigo-700">{c.idcc}</span>
                  <span className="flex-1 text-sm text-slate-800">{c.titre}</span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${ok ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-500"}`}
                  >
                    {ok ? "Renseignée" : "À renseigner"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {q.trim() && results.length === 0 && (
        <p className="px-2 text-sm text-slate-500">Aucune convention ne correspond. Essayez le code IDCC à quatre chiffres.</p>
      )}
    </div>
  );
}
