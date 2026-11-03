import Link from "next/link";
import Image from "next/image";
import { CcnLogo } from "@/components/CcnLogo";
import { BRAND } from "@/lib/brand";
import { CONVENTIONS } from "@/lib/ccn/idcc";
import { listFiches, nbDispositions } from "@/lib/ccn/fiches";
import { THEMES } from "@/lib/ccn/types";

const ATOUTS = [
  {
    title: "Une fiche par convention",
    body: "Le code IDCC, le numéro de brochure ou quelques mots du titre suffisent. La liste officielle du ministère du Travail est intégrée, avec le titre exact de chaque convention.",
  },
  {
    title: "Les obligations, thème par thème",
    body: "Quinze thèmes, des conditions de travail aux primes. Cochez les populations concernées (ETAM, cadres, ouvriers ou les statuts propres à la branche) et la fiche n'affiche que ce qui s'applique.",
  },
  {
    title: "Des valeurs vérifiables",
    body: "Maintien de salaire par tranche d'ancienneté, carence, garanties et cotisations de prévoyance, présentés en tableaux. Un comparatif Code du travail / convention sur les points clés.",
  },
  {
    title: "La source à chaque ligne",
    body: "Chaque disposition cite son article, l'avenant qui l'a modifiée, sa date d'extension et sa date d'application. Le niveau de fiabilité de la fiche est affiché, et le texte officiel est à un clic.",
  },
];

const ETAPES = [
  { title: "Recherchez", body: "IDCC, numéro de brochure, nom d'usage ou mots du titre." },
  { title: "Filtrez", body: "Sélectionnez les populations. La vue d'ensemble montre où la convention prévoit des dispositions." },
  { title: "Vérifiez et exportez", body: "Lisez la disposition et sa référence, comparez avec la loi, exportez la fiche en Excel." },
];

const PUBLICS = ["Gestionnaires de paie", "Services RH", "Experts-comptables", "Courtiers et assureurs", "Juristes en droit social"];

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
            <Link href="/login" className="btn whitespace-nowrap">
              Se connecter
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ---------- Bandeau ---------- */}
        <section className="overflow-hidden bg-gradient-to-b from-white to-bg">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1fr_1.1fr] lg:py-20">
            <div>
              <p className="text-sm font-medium text-accent">Plateforme de vérification des données conventionnelles</p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{BRAND.tagline}</h1>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Pour chaque convention collective, une fiche claire : champ d&rsquo;application, obligations par thème et par
                population, maintien de salaire, prévoyance. Chaque donnée renvoie à son article et à sa date d&rsquo;application.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="btn">
                  Accéder à la plateforme
                </Link>
                <a href="#fonctionnement" className="btn-secondary">
                  Comment ça marche
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                {PUBLICS.map((x) => (
                  <li key={x} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/accueil-ccn.webp"
                alt="Illustration : une fiche de convention collective vérifiée, avec les populations, le droit et les indicateurs"
                width={1672}
                height={941}
                priority
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* ---------- Chiffres ---------- */}
        <section className="border-y border-line bg-white">
          <dl className="mx-auto grid max-w-6xl divide-y divide-line px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { n: CONVENTIONS.length, l: "conventions collectives référencées" },
              { n: THEMES.length, l: "thèmes suivis par fiche" },
              { n: nbDispositions(), l: `dispositions saisies, ${nbFiches} fiche${nbFiches > 1 ? "s" : ""} renseignée${nbFiches > 1 ? "s" : ""}` },
            ].map((c) => (
              <div key={c.l} className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                <dt className="font-mono-num text-2xl font-semibold text-accent">{c.n}</dt>
                <dd className="mt-1 text-sm text-muted">{c.l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Contenu d'une fiche ---------- */}
        <section id="fonctionnement" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold text-ink">Ce que contient une fiche</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {ATOUTS.map((a) => (
              <div key={a.title} className="panel p-5">
                <h3 className="text-base font-semibold text-accent">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="label">Thèmes suivis</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {THEMES.map((t) => (
                <li key={t.id} className="rounded border border-line bg-white px-2.5 py-1 text-xs text-ink">
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Étapes ---------- */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-semibold text-ink">Trois étapes</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {ETAPES.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Sources ---------- */}
        <section id="sources" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold text-ink">Sources et limites</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Sources officielles",
                b: `Liste des IDCC du ministère du Travail (${BRAND.idccListDate}). Textes des conventions et accords publiés sur Légifrance (base KALI), Licence Ouverte Etalab.`,
              },
              {
                t: "Transparence",
                b: "Chaque disposition cite sa référence. Chaque fiche affiche son niveau de fiabilité : vérifiée sur le texte, ou brouillon à valider.",
              },
              {
                t: "Complément, pas substitut",
                b: "La fiche sert à vérifier et à contrôler. Elle ne remplace ni la lecture du texte en vigueur, ni les accords d'entreprise plus favorables.",
              },
            ].map((x) => (
              <div key={x.t} className="panel p-5">
                <h3 className="text-base font-semibold text-accent">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{x.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Appel final ---------- */}
        <section className="border-t border-line bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-ink">Vérifiez une convention dès maintenant</h2>
              <p className="mt-1 text-sm text-muted">Accès réservé. Identifiants fournis par {BRAND.company}.</p>
            </div>
            <Link href="/login" className="btn">
              Se connecter
            </Link>
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
