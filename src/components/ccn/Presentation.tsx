import type { FicheCcn } from "@/lib/ccn/types";
import { THEME_LABEL } from "@/lib/ccn/types";
import { Liste, Sources } from "./Cartes";

function dateFr(iso: string): string {
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export function Presentation({ fiche }: { fiche: FicheCcn }) {
  const p = fiche.presentation;
  return (
    <div className="space-y-6">
      {fiche.resume && <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{fiche.resume}</p>}

      <section className="card-soft rounded-3xl p-5 sm:p-6">
        <dl className="grid gap-x-10 gap-y-4 text-sm sm:grid-cols-2">
          {p?.dateSignature && (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Date de signature</dt>
              <dd className="mt-1 font-medium text-slate-900">{p.dateSignature}</dd>
            </div>
          )}
          {p?.dateExtension && (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Date d&rsquo;extension</dt>
              <dd className="mt-1 font-medium text-slate-900">{p.dateExtension}</dd>
            </div>
          )}
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Dernière veille juridique</dt>
            <dd className="mt-1 font-medium text-slate-900">{p?.derniereVeille ?? dateFr(fiche.maj)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Populations distinguées</dt>
            <dd className="mt-1 font-medium text-slate-900">{fiche.populations.map((x) => x.label).join(" · ")}</dd>
          </div>
        </dl>
        {p?.actualisations?.length ? (
          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Actualisée par</p>
            <Liste items={p.actualisations} />
          </div>
        ) : null}
      </section>

      {fiche.vigilance?.length ? (
        <section className="card-soft rounded-3xl p-5 sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-700">Points de vigilance paie / SIRH</h3>
          <Liste items={fiche.vigilance} />
        </section>
      ) : null}

      {fiche.veille?.length ? (
        <section className="rounded-3xl bg-indigo-50 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">La veille juridique</h3>
          <p className="mt-1 text-sm text-slate-600">Dernières mises à jour de cette convention.</p>
          <ul className="mt-4 space-y-3">
            {[...fiche.veille]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((v, i) => (
                <li key={i} className="card-soft grid gap-2 rounded-2xl p-4 sm:grid-cols-[14rem_1fr]">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {fiche.nomUsage ?? `IDCC ${fiche.idcc}`} – {v.titre}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {dateFr(v.date)}
                      {v.theme && <span className="ml-2 text-indigo-700">{THEME_LABEL[v.theme]}</span>}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{v.texte}</p>
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      <Sources sources={fiche.sources} />
    </div>
  );
}
