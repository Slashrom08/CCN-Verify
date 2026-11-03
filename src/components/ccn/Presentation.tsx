import type { FicheCcn } from "@/lib/ccn/types";
import { THEME_LABEL } from "@/lib/ccn/types";
import { Field, Liste, Sources } from "./Cartes";

function dateFr(iso: string): string {
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export function Presentation({ fiche }: { fiche: FicheCcn }) {
  const p = fiche.presentation;
  return (
    <div className="space-y-6">
      {fiche.resume && <p className="max-w-3xl text-sm leading-relaxed text-ink">{fiche.resume}</p>}

      <section className="panel p-5 sm:p-6">
        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {p?.dateSignature && <Field label="Date de signature">{p.dateSignature}</Field>}
          {p?.dateExtension && <Field label="Date d'extension">{p.dateExtension}</Field>}
          <Field label="Dernière veille juridique">{p?.derniereVeille ?? dateFr(fiche.maj)}</Field>
          <Field label="Populations distinguées">{fiche.populations.map((x) => x.label).join(" · ")}</Field>
        </dl>
        {p?.actualisations?.length ? (
          <div className="mt-6">
            <p className="label">Actualisée par</p>
            <Liste items={p.actualisations} />
          </div>
        ) : null}
      </section>

      {fiche.vigilance?.length ? (
        <section className="panel p-5 sm:p-6">
          <h3 className="text-base font-semibold text-accent">Points de vigilance</h3>
          <Liste items={fiche.vigilance} />
        </section>
      ) : null}

      {fiche.veille?.length ? (
        <section className="panel p-5 sm:p-6">
          <h3 className="text-base font-semibold text-accent">Veille juridique</h3>
          <p className="mt-1 text-sm text-muted">Dernières mises à jour de cette convention.</p>
          <ul className="mt-4 divide-y divide-line">
            {[...fiche.veille]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((v, i) => (
                <li key={i} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{v.titre}</p>
                    <p className="text-xs text-muted">
                      {dateFr(v.date)}
                      {v.theme && <span className="ml-1.5">· {THEME_LABEL[v.theme]}</span>}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink">{v.texte}</p>
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      <Sources sources={fiche.sources} />
    </div>
  );
}
