import type { MaintienSalaire, PrevoyanceComplementaire, Source, Statut } from "@/lib/ccn/types";
import { STATUT_LABEL } from "@/lib/ccn/types";
import { STATUT_COLOR } from "@/lib/ccn/populations";

/* ------------------------------------------------------------------ */
/*  Briques communes                                                   */
/* ------------------------------------------------------------------ */

export function Sources({ sources }: { sources: Source[] }) {
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

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-slate-800">{children}</dd>
    </div>
  );
}

export function Liste({ items }: { items?: string[] }) {
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

export function BadgeStatut({ item }: { item: { statut: Statut; libelleStatut?: string } }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
      style={{ background: STATUT_COLOR[item.statut] }}
    >
      {item.libelleStatut ?? STATUT_LABEL[item.statut]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Maladie – Accident : maintien de salaire                           */
/* ------------------------------------------------------------------ */

export function MaintienCard({ m }: { m: MaintienSalaire }) {
  return (
    <article className="card-soft rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900">Maintien de salaire employeur</h4>
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

export function PrevoyanceCard({ p }: { p: PrevoyanceComplementaire }) {
  return (
    <article className="card-soft rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900">{CARACTERE[p.caractere]}</h4>
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
