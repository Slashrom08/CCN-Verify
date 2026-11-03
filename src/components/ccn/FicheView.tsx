"use client";

import { useMemo, useState } from "react";
import type { FicheCcn, MaintienSalaire, PrevoyanceComplementaire, Source, Statut } from "@/lib/ccn/types";
import { FIABILITE_LABEL, STATUT_LABEL } from "@/lib/ccn/types";

/* ------------------------------------------------------------------ */
/*  Statuts : onglets Cadres / Non-cadres (ou ceux de la branche)       */
/* ------------------------------------------------------------------ */

const ORDER: Statut[] = ["cadres", "non_cadres", "etam", "agents_maitrise", "employes", "ouvriers", "autre", "tous"];

function statutsDeLaFiche(fiche: FicheCcn): Statut[] {
  const set = new Set<Statut>();
  for (const m of fiche.maladieAccident) set.add(m.statut);
  for (const p of fiche.prevoyance) set.add(p.statut);
  set.delete("tous");
  const list = ORDER.filter((s) => set.has(s));
  return list.length ? list : ["tous"];
}

/** Une disposition s'applique au statut choisi si elle le vise, ou si elle vise « tous ». */
function pour<T extends { statut: Statut }>(items: T[], statut: Statut): T[] {
  return items.filter((i) => i.statut === statut || i.statut === "tous");
}

/* ------------------------------------------------------------------ */
/*  Briques                                                            */
/* ------------------------------------------------------------------ */

function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <p className="mt-4 text-[11px] leading-snug text-slate-500">
      <span className="font-semibold">Source :</span>{" "}
      {sources.map((s, i) => (
        <span key={i}>
          {i > 0 && " · "}
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline-offset-2 hover:underline">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-slate-800">{children}</dd>
    </div>
  );
}

function Liste({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-1 space-y-1">
      {items.map((x, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-700">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function BadgeStatut({ item }: { item: { statut: Statut; libelleStatut?: string } }) {
  return (
    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-700">
      {item.libelleStatut ?? STATUT_LABEL[item.statut]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Maladie – Accident                                                 */
/* ------------------------------------------------------------------ */

function MaintienCard({ m }: { m: MaintienSalaire }) {
  return (
    <article className="card-soft rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">Maintien de salaire employeur</h3>
        <BadgeStatut item={m} />
      </div>

      <dl className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Ancienneté requise">{m.ancienneteRequise}</Field>
        <Field label="Carence">{m.carence}</Field>
      </dl>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Ancienneté</th>
              <th className="px-4 py-2.5">Paliers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {m.tranches.map((t) => (
              <tr key={t.anciennete}>
                <td className="px-4 py-3 align-top font-medium text-slate-800">{t.anciennete}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {t.paliers.map((p, i) => (
                      <span
                        key={i}
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${i === 0 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-900"}`}
                      >
                        {p.duree} à {p.taux}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Base et déductions">{m.base}</Field>
        {m.periodeReference && <Field label="Période de référence">{m.periodeReference}</Field>}
        {m.conditions?.length ? (
          <Field label="Conditions">
            <Liste items={m.conditions} />
          </Field>
        ) : null}
        {m.notes?.length ? (
          <Field label="Notes">
            <Liste items={m.notes} />
          </Field>
        ) : null}
      </dl>
      <Sources sources={m.sources} />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Prévoyance complémentaire                                          */
/* ------------------------------------------------------------------ */

const CARACTERE: Record<PrevoyanceComplementaire["caractere"], string> = {
  obligatoire: "Régime de branche obligatoire",
  recommande: "Régime recommandé",
  obligation_cotisation: "Obligation de cotisation",
};

function PrevoyanceCard({ p }: { p: PrevoyanceComplementaire }) {
  return (
    <article className="card-soft rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">{CARACTERE[p.caractere]}</h3>
        <BadgeStatut item={p} />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Garantie</th>
              <th className="px-4 py-2.5">Niveau</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {p.garanties.map((g) => (
              <tr key={g.nom}>
                <td className="px-4 py-3 align-top font-medium text-slate-800">{g.nom}</td>
                <td className="px-4 py-3 text-slate-800">
                  {g.montant}
                  {g.precision && <span className="mt-0.5 block text-xs text-slate-500">{g.precision}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {p.cotisation && (
        <dl className="mt-6 grid gap-5 sm:grid-cols-3">
          <Field label="Taux">{p.cotisation.taux}</Field>
          <Field label="Assiette">{p.cotisation.assiette}</Field>
          <Field label="Répartition">{p.cotisation.repartition}</Field>
        </dl>
      )}
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        {p.organisme && <Field label="Organisme">{p.organisme}</Field>}
        {p.conditions?.length ? (
          <Field label="Conditions">
            <Liste items={p.conditions} />
          </Field>
        ) : null}
        {p.notes?.length ? (
          <Field label="Notes">
            <Liste items={p.notes} />
          </Field>
        ) : null}
      </dl>
      <Sources sources={p.sources} />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Fiche                                                              */
/* ------------------------------------------------------------------ */

export function FicheView({ fiche }: { fiche: FicheCcn }) {
  const statuts = useMemo(() => statutsDeLaFiche(fiche), [fiche]);
  const [statut, setStatut] = useState<Statut>(statuts[0]);
  const maladie = pour(fiche.maladieAccident, statut);
  const prev = pour(fiche.prevoyance, statut);
  const brouillon = fiche.fiabilite === "brouillon";

  return (
    <div className="space-y-8">
      <div
        className={`rounded-2xl border px-4 py-3 text-sm ${brouillon ? "border-amber-200 bg-amber-50 text-amber-900" : "border-indigo-200 bg-indigo-50 text-indigo-900"}`}
      >
        <span className="font-semibold">{FIABILITE_LABEL[fiche.fiabilite]}</span>
        {brouillon && " : valeurs saisies pour tester l'outil, à relire sur le texte en vigueur avant tout usage en paie."}
        <span className="ml-2 text-xs opacity-70">Mise à jour {fiche.maj}</span>
      </div>

      {fiche.resume && <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{fiche.resume}</p>}

      {statuts.length > 1 && (
        <div role="tablist" aria-label="Statut" className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          {statuts.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={statut === s}
              onClick={() => setStatut(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${statut === s ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {STATUT_LABEL[s]}
            </button>
          ))}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-700">Maladie – Accident</h2>
        {maladie.length ? (
          maladie.map((m, i) => <MaintienCard key={i} m={m} />)
        ) : (
          <p className="text-sm text-slate-500">Aucune disposition renseignée pour ce statut.</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-700">Prévoyance complémentaire</h2>
        {prev.length ? (
          prev.map((p, i) => <PrevoyanceCard key={i} p={p} />)
        ) : (
          <p className="text-sm text-slate-500">Aucune disposition renseignée pour ce statut.</p>
        )}
      </section>

      {fiche.vigilance?.length ? (
        <section className="card-soft rounded-3xl p-5 sm:p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-700">Points de vigilance paie / SIRH</h2>
          <Liste items={fiche.vigilance} />
        </section>
      ) : null}

      <Sources sources={fiche.sources} />
    </div>
  );
}
