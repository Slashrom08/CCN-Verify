import type { MaintienSalaire, PrevoyanceComplementaire, Source, Statut } from "@/lib/ccn/types";
import { STATUT_LABEL } from "@/lib/ccn/types";
import { STATUT_COLOR } from "@/lib/ccn/populations";

export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <p className="mt-4 text-xs text-muted">
      <span className="font-medium text-ink">Source :</span>{" "}
      {sources.map((s, i) => (
        <span key={i}>
          {i > 0 && " · "}
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
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
      <dt className="label">{label}</dt>
      <dd className="mt-0.5 text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export function Liste({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-1 list-disc space-y-1 pl-5">
      {items.map((x, i) => (
        <li key={i} className="text-sm leading-relaxed text-ink">
          {x}
        </li>
      ))}
    </ul>
  );
}

/** Étiquette de population : pastille de couleur + libellé. */
export function TagStatut({ statut, label }: { statut: Statut; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-line bg-white px-2 py-0.5 text-xs font-medium text-ink">
      <span className="h-2 w-2 rounded-full" style={{ background: STATUT_COLOR[statut] }} aria-hidden />
      {label ?? STATUT_LABEL[statut]}
    </span>
  );
}

const PALIER_BG = ["bg-accent text-white", "bg-accent-soft text-accent", "bg-bg text-ink"];

export function MaintienCard({ m }: { m: MaintienSalaire }) {
  return (
    <article className="rounded border border-line p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-ink">Maintien de salaire employeur</h4>
        <TagStatut statut={m.statut} label={m.libelleStatut} />
      </div>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Ancienneté requise">{m.ancienneteRequise}</Field>
        <Field label="Carence">{m.carence}</Field>
      </dl>

      <div className="mt-4 overflow-x-auto rounded border border-line">
        <table className="table">
          <thead>
            <tr>
              <th>Ancienneté</th>
              <th>Paliers de maintien</th>
            </tr>
          </thead>
          <tbody>
            {m.tranches.map((t) => (
              <tr key={t.anciennete}>
                <td className="font-medium">{t.anciennete}</td>
                <td>
                  <div className="flex flex-wrap gap-1.5">
                    {t.paliers.map((p, i) => (
                      <span key={i} className={`rounded px-2 py-0.5 text-xs font-semibold ${PALIER_BG[Math.min(i, PALIER_BG.length - 1)]}`}>
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

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
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

const CARACTERE: Record<PrevoyanceComplementaire["caractere"], string> = {
  obligatoire: "Régime de branche obligatoire",
  recommande: "Régime recommandé",
  obligation_cotisation: "Obligation de cotisation",
};

export function PrevoyanceCard({ p }: { p: PrevoyanceComplementaire }) {
  return (
    <article className="rounded border border-line p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-ink">{CARACTERE[p.caractere]}</h4>
        <TagStatut statut={p.statut} label={p.libelleStatut} />
      </div>

      <div className="mt-4 overflow-x-auto rounded border border-line">
        <table className="table">
          <thead>
            <tr>
              <th>Garantie</th>
              <th>Niveau</th>
            </tr>
          </thead>
          <tbody>
            {p.garanties.map((g) => (
              <tr key={g.nom}>
                <td className="font-medium">{g.nom}</td>
                <td>
                  {g.montant}
                  {g.precision && <span className="mt-0.5 block text-xs text-muted">{g.precision}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {p.cotisation && (
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Taux">{p.cotisation.taux}</Field>
          <Field label="Assiette">{p.cotisation.assiette}</Field>
          <Field label="Répartition">{p.cotisation.repartition}</Field>
        </dl>
      )}
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
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
