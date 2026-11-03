import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { FicheView } from "@/components/ccn/FicheView";
import { FicheHeader } from "@/components/ccn/FicheHeader";
import { findConvention, isCodeTechnique } from "@/lib/ccn/idcc";
import { getFiche } from "@/lib/ccn/fiches";
import { CODE_TRAVAIL_NUMERIQUE_URL, legifranceSearchUrl } from "@/lib/ccn/legifrance";
import { BRAND } from "@/lib/brand";
import { THEMES } from "@/lib/ccn/types";

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
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted print:hidden" aria-label="Fil d'Ariane">
        <Link href="/app" className="hover:text-accent">
          Conventions collectives
        </Link>
        <span aria-hidden>›</span>
        <span className="max-w-md truncate text-ink">{fiche?.nomUsage ?? convention.titre}</span>
      </nav>

      <FicheHeader convention={convention} fiche={fiche} technique={technique} />

      {fiche ? (
        <FicheView fiche={fiche} />
      ) : technique ? (
        <p className="panel p-5 text-sm text-ink">
          Code technique de la DSN : aucun texte conventionnel ne s&rsquo;applique. Les règles maladie – accident sont celles du
          Code du travail (maintien légal) et il n&rsquo;y a pas de régime de prévoyance de branche.
        </p>
      ) : (
        <section className="panel p-6 sm:p-8">
          <p className="label">Fiche non renseignée</p>
          <h2 className="mt-2 text-lg font-semibold text-ink">Les dispositions de cette convention n&rsquo;ont pas encore été saisies.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Une fiche se construit à partir du texte publié : présentation (dates, avenants), champ d&rsquo;application (codes NAF)
            et obligations par thème et par population. Elle sera ajoutée sous le code {convention.idcc}.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <li key={t.id} className="rounded border border-line bg-bg px-2.5 py-1 text-xs text-ink">
                {t.label}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap gap-4 text-xs">
            <a href={legifranceSearchUrl(convention.idcc)} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
              Rechercher les textes sur Légifrance ↗
            </a>
            <a href={CODE_TRAVAIL_NUMERIQUE_URL} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
              Code du travail numérique ↗
            </a>
          </p>
        </section>
      )}
    </AppShell>
  );
}
