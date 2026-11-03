import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CcnSearch } from "@/components/ccn/CcnSearch";
import { CONVENTIONS } from "@/lib/ccn/idcc";
import { indexRecherche, listFiches, nbDispositions, veilleGlobale } from "@/lib/ccn/fiches";
import { DECRYPTAGES } from "@/lib/decryptages";
import { THEME_LABEL } from "@/lib/ccn/types";

function dateFr(iso: string): string {
  const [y, m, d] = iso.split("-");
  return d ? `${d}/${m}/${y}` : iso;
}

export default function AppPage() {
  const index = indexRecherche();
  const fiches = listFiches();
  const veille = veilleGlobale(4);
  const derniereMaj = fiches.map((f) => f.maj).sort().at(-1);

  const chiffres = [
    { n: CONVENTIONS.length, l: "conventions référencées" },
    { n: fiches.length, l: `fiche${fiches.length > 1 ? "s" : ""} renseignée${fiches.length > 1 ? "s" : ""}` },
    { n: nbDispositions(), l: "dispositions saisies" },
    { n: derniereMaj ? dateFr(derniereMaj) : "—", l: "dernière mise à jour" },
  ];

  return (
    <AppShell>
      <CcnSearch index={index} />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="text-lg font-semibold text-ink">Veille conventionnelle</h2>
          <p className="mt-1 text-sm text-muted">Dernières mises à jour intégrées aux fiches.</p>
          <ul className="panel mt-4 divide-y divide-line">
            {veille.map((v, i) => (
              <li key={i} className="p-4">
                <Link href={`/app/ccn/${v.idcc}#presentation`} className="text-sm font-semibold text-accent hover:underline">
                  {v.nomUsage ?? `IDCC ${v.idcc}`} – {v.titre}
                </Link>
                <p className="mt-0.5 text-xs text-muted">
                  {dateFr(v.date)}
                  {v.theme && <span className="ml-2">· {THEME_LABEL[v.theme]}</span>}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">{v.texte}</p>
              </li>
            ))}
            {veille.length === 0 && <li className="p-4 text-sm text-muted">Aucune mise à jour enregistrée.</li>}
          </ul>
        </section>

        <aside className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-ink">En chiffres</h2>
            <dl className="panel mt-4 divide-y divide-line">
              {chiffres.map((c) => (
                <div key={c.l} className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-muted">{c.l}</dt>
                  <dd className="font-mono-num text-base font-semibold text-accent">{c.n}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Décryptages</h2>
            <ul className="panel mt-4 divide-y divide-line">
              {DECRYPTAGES.map((d) => (
                <li key={d.slug}>
                  <Link href={`/app/decryptage/${d.slug}`} className="block px-4 py-3 hover:bg-accent-soft">
                    <span className="block text-sm font-semibold text-accent">{d.titre}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">{d.accroche}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
