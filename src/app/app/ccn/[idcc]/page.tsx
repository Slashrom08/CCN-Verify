import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { FicheView } from "@/components/ccn/FicheView";
import { findConvention, isCodeTechnique } from "@/lib/ccn/idcc";
import { getFiche } from "@/lib/ccn/fiches";
import { CODE_TRAVAIL_NUMERIQUE_URL, legifranceIdccUrl, legifranceSearchUrl } from "@/lib/ccn/legifrance";
import { BRAND } from "@/lib/brand";

type Params = Promise<{ idcc: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { idcc } = await params;
  const c = findConvention(idcc);
  return { title: c ? `IDCC ${c.idcc} — ${BRAND.name}` : BRAND.name };
}

export default async function CcnPage({ params }: { params: Params }) {
  const { idcc } = await params;
  const convention = findConvention(idcc);
  if (!convention) notFound();
  const fiche = getFiche(convention.idcc);
  const technique = isCodeTechnique(convention.idcc);

  return (
    <AppShell>
      <nav className="text-xs text-slate-500">
        <Link href="/app" className="hover:text-indigo-700">
          ← Toutes les conventions
        </Link>
      </nav>

      <header className="card-soft rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono-num text-sm font-semibold text-indigo-700">
              IDCC {convention.idcc}
              {fiche?.brochure && <span className="ml-3 font-sans font-normal text-slate-400">Brochure {fiche.brochure}</span>}
            </p>
            <h1 className="mt-2 max-w-3xl text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
              {fiche?.nomUsage && <span className="text-indigo-700">{fiche.nomUsage} · </span>}
              {convention.titre}
            </h1>
          </div>
          {!technique && (
            <div className="flex flex-wrap gap-2">
              <a
                href={legifranceIdccUrl(convention.idcc)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
              >
                Textes sur Légifrance ↗
              </a>
              <a
                href={legifranceSearchUrl(convention.idcc)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
              >
                Recherche Légifrance ↗
              </a>
            </div>
          )}
        </div>
      </header>

      {fiche ? (
        <FicheView fiche={fiche} />
      ) : technique ? (
        <p className="text-sm text-slate-600">
          Code technique de la DSN : aucun texte conventionnel ne s&rsquo;applique. Les règles maladie – accident sont celles du
          Code du travail (maintien légal) et il n&rsquo;y a pas de régime de prévoyance de branche.
        </p>
      ) : (
        <section className="card-soft rounded-3xl p-6 sm:p-8">
          <p className="inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Fiche non renseignée
          </p>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">Les dispositions de cette convention n&rsquo;ont pas encore été saisies.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            La fiche se construit à partir du texte publié : article « maladie – accident » (ou « indemnisation des absences
            pour maladie ») de la convention, et accord de prévoyance de la branche. Elle sera ajoutée dans le dossier des
            fiches sous le code {convention.idcc}.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Maladie – accident", b: "Ancienneté requise, carence, paliers durée × taux par tranche d'ancienneté, base, période de référence." },
              { t: "Prévoyance complémentaire", b: "Décès, incapacité, invalidité ; taux, assiette et répartition des cotisations ; caractère obligatoire ou recommandé." },
            ].map((x) => (
              <li key={x.t} className="rounded-2xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">{x.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{x.b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-slate-500">
            Pour retrouver la convention par activité :{" "}
            <a href={CODE_TRAVAIL_NUMERIQUE_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
              Code du travail numérique ↗
            </a>
          </p>
        </section>
      )}
    </AppShell>
  );
}
