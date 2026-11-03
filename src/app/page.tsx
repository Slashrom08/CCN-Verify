import Link from "next/link";
import { CcnLogo } from "@/components/CcnLogo";
import { BRAND } from "@/lib/brand";
import { CONVENTIONS } from "@/lib/ccn/idcc";
import { listFiches } from "@/lib/ccn/fiches";
import { THEMES } from "@/lib/ccn/types";

const ATOUTS = [
  {
    title: "Une fiche par IDCC",
    body: "Le code à quatre chiffres de la DSN suffit. La liste officielle du ministère du Travail est embarquée, avec le titre exact de chaque convention, le numéro de brochure et le nom d'usage.",
  },
  {
    title: "Les obligations par thème et par population",
    body: "Quinze thèmes, des conditions de travail aux primes. Cochez les populations (ETAM, cadres, ouvriers ou les statuts propres à la branche) et la fiche n'affiche que ce qui s'applique.",
  },
  {
    title: "Les valeurs paie en clair",
    body: "Maintien de salaire par tranche d'ancienneté, carence, garanties et cotisations de prévoyance : des tableaux, pas des paragraphes à relire. Et un comparatif Code du travail / convention sur les points clés.",
  },
  {
    title: "L'article, la date, la source",
    body: "Chaque disposition cite son article, l'avenant qui l'a modifiée, sa date d'extension et sa date d'application. Un lien vers Légifrance par convention, un niveau de fiabilité affiché sur chaque fiche.",
  },
];

const ETAPES = [
  { title: "Saisissez l'IDCC", body: "Ou le numéro de brochure, le nom d'usage, quelques mots du titre." },
  { title: "Cochez les populations", body: "La matrice thèmes × populations montre d'un coup d'œil où la convention dit quelque chose." },
  { title: "Lisez, comparez, exportez", body: "Dispositions, comparatif loi / convention, export Excel de la fiche pour vos paramétrages." },
];

export default function Landing() {
  const nbFiches = listFiches().length;
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label={`${BRAND.name} — accueil`}>
            <CcnLogo />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted">
            <a href="#fonctionnement" className="hidden hover:text-accent sm:inline">
              Fonctionnement
            </a>
            <a href="#sources" className="hidden hover:text-accent sm:inline">
              Sources
            </a>
            <Link href="/login" className="btn">
              Se connecter
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Pour la paie, le SIRH et la protection sociale</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{BRAND.tagline}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Présentation, champ d&rsquo;application, obligations par thème et par population, maintien de salaire,
              prévoyance : chaque convention collective en une fiche, avec l&rsquo;article source et la date
              d&rsquo;application. {CONVENTIONS.length} conventions référencées, {nbFiches} fiche{nbFiches > 1 ? "s" : ""}{" "}
              renseignée{nbFiches > 1 ? "s" : ""} à ce jour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="btn">
                Accéder à l&rsquo;outil
              </Link>
              <a href="#fonctionnement" className="btn-secondary">
                Comment ça marche
              </a>
            </div>
          </div>
        </section>

        <section id="fonctionnement" className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-semibold text-ink">Ce que contient une fiche</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {ATOUTS.map((a) => (
                <div key={a.title}>
                  <h3 className="text-base font-semibold text-accent">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <p className="label">Thèmes suivis</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {THEMES.map((t) => (
                  <li key={t.id} className="rounded border border-line bg-bg px-2.5 py-1 text-xs text-ink">
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold text-ink">Trois étapes</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {ETAPES.map((s, i) => (
              <li key={s.title} className="panel p-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">{i + 1}</span>
                <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sources" className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-semibold text-ink">Sources et limites</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-base font-semibold text-accent">Sources officielles</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Liste des IDCC du ministère du Travail ({BRAND.idccListDate}). Textes des conventions et accords publiés sur Légifrance (base KALI), Licence Ouverte Etalab.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-accent">Transparence</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Chaque disposition cite sa référence. Chaque fiche affiche son niveau de fiabilité : vérifiée sur le texte, ou brouillon à valider.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-accent">Complément, pas substitut</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  La fiche sert à paramétrer et à contrôler. Elle ne remplace ni la lecture du texte en vigueur, ni les accords d&rsquo;entreprise plus favorables.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <span>
            Un produit{" "}
            <a href={BRAND.companyUrl} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              {BRAND.company}
            </a>
          </span>
          <a href={`mailto:${BRAND.contactEmail}`} className="text-accent hover:underline">
            {BRAND.contactEmail}
          </a>
        </div>
      </footer>
    </div>
  );
}
