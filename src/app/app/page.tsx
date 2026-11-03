import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CcnSearch } from "@/components/ccn/CcnSearch";
import { CONVENTIONS } from "@/lib/ccn/idcc";
import { indexRecherche, listFiches, nbDispositions, veilleGlobale } from "@/lib/ccn/fiches";
import { DECRYPTAGES } from "@/lib/decryptages";
import { BRAND } from "@/lib/brand";
import { THEME_LABEL } from "@/lib/ccn/types";

function dateFr(iso: string): string {
  const [y, m, d] = iso.split("-");
  return d ? `${d}/${m}/${y}` : iso;
}

export default function AppPage() {
  const index = indexRecherche();
  const fiches = listFiches();
  const veille = veilleGlobale(3);
  const derniereMaj = fiches.map((f) => f.maj).sort().at(-1);

  const chiffres = [
    { n: CONVENTIONS.length, l: "conventions collectives référencées" },
    { n: fiches.length, l: `fiche${fiches.length > 1 ? "s" : ""} renseignée${fiches.length > 1 ? "s" : ""}` },
    { n: nbDispositions(), l: "dispositions saisies, article cité" },
    { n: derniereMaj ? dateFr(derniereMaj) : "—", l: "dernière mise à jour" },
  ];

  return (
    <AppShell>
      <CcnSearch index={index} />

      {/* ---------- Décryptages ---------- */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900">Nos décryptages</h2>
        <p className="mt-1 text-sm text-slate-500">Des articles de fond pour mieux comprendre l&rsquo;univers des conventions collectives.</p>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {DECRYPTAGES.map((d) => (
            <li key={d.slug}>
              <Link href={`/app/decryptage/${d.slug}`} className="card-soft flex h-full flex-col overflow-hidden rounded-2xl hover:border-indigo-300">
                <span className="block px-5 py-5 text-base font-semibold text-slate-900" style={{ background: d.couleur }}>
                  {d.titre}
                </span>
                <span className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <span className="text-sm leading-relaxed text-slate-600">{d.accroche}</span>
                  <span className="text-xs font-semibold text-indigo-700">En savoir plus ›</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Chiffres ---------- */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900">{BRAND.name} en chiffres</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {chiffres.map((c) => (
            <li key={c.l} className="card-soft rounded-2xl p-5 text-center">
              <p className="font-mono-num text-2xl font-semibold text-indigo-700">{c.n}</p>
              <p className="mt-1 text-xs text-slate-500">{c.l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Veille ---------- */}
      {veille.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Veille conventionnelle</h2>
          <p className="mt-1 text-sm text-slate-500">Dernières mises à jour intégrées aux fiches.</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {veille.map((v, i) => (
              <li key={i}>
                <Link href={`/app/ccn/${v.idcc}#presentation`} className="card-soft flex h-full flex-col overflow-hidden rounded-2xl hover:border-indigo-300">
                  <span className="block bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">
                    {v.nomUsage ?? `IDCC ${v.idcc}`} – {v.titre}
                  </span>
                  <span className="flex flex-1 flex-col gap-2 p-5">
                    <span className="text-xs text-slate-500">
                      {dateFr(v.date)}
                      {v.theme && <span className="ml-2 text-indigo-700">{THEME_LABEL[v.theme]}</span>}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{v.texte}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </AppShell>
  );
}
