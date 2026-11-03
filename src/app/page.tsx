import Link from "next/link";
import { PillNav } from "@/components/PillNav";
import { Reveal } from "@/components/Reveal";
import { CcnLogo } from "@/components/CcnLogo";
import { NightBackground } from "@/components/NightBackground";
import { BRAND } from "@/lib/brand";
import { CONVENTIONS } from "@/lib/ccn/idcc";
import { listFiches } from "@/lib/ccn/fiches";

/* ------------------------------------------------------------------ */
/*  Contenu                                                            */
/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    n: "01",
    tag: "IDENTIFIER",
    title: "Un IDCC, pas une recherche",
    body: "Le code à quatre chiffres de la DSN suffit. La liste officielle du ministère du Travail est embarquée, avec le titre exact de chaque convention.",
  },
  {
    n: "02",
    tag: "EXTRAIRE",
    title: "Quinze thèmes, deux au cœur",
    body: "Conditions de travail, congés, durée du travail, licenciement, maladie – accident, prévoyance, classifications, salaires… Les deux thèmes paie sont saisis en valeurs structurées : paliers, garanties, cotisations.",
  },
  {
    n: "03",
    tag: "DÉCLINER",
    title: "Par population, d'un clic",
    body: "Cochez ETAM, cadres, ouvriers ou les statuts propres à la branche : la matrice thèmes × populations et chaque disposition se filtrent. Une bande de couleur dit à qui s'applique chaque paragraphe.",
  },
  {
    n: "04",
    tag: "SOURCER",
    title: "L'article, pas l'interprétation",
    body: "Chaque disposition cite son article, l'avenant qui l'a modifiée, sa date d'extension et sa date d'application. Un comparatif Code du travail / convention met le légal et le conventionnel côte à côte.",
  },
];

const STEPS = [
  { title: "Saisissez l'IDCC", body: "Ou quelques mots du titre : « commerces de gros », « bureaux d'études »." },
  { title: "Cochez les populations", body: "ETAM, cadres, ouvriers, employés : la fiche n'affiche que ce qui s'applique." },
  { title: "Lisez la fiche", body: "Présentation, champ d'application (codes NAF), obligations par thème, comparatif loi / convention." },
  { title: "Remontez à la source", body: "Un lien vers Légifrance par convention, l'article cité pour chaque valeur." },
];

const DISPOSITIONS = [
  { label: "Ancienneté requise", detail: "pour ouvrir le droit au maintien" },
  { label: "Délai de carence", detail: "conventionnel, maladie et accident" },
  { label: "Paliers de maintien", detail: "durée et taux, par tranche d'ancienneté" },
  { label: "Base et déductions", detail: "salaire brut, IJSS, prévoyance" },
  { label: "Période de référence", detail: "12 mois glissants ou année civile" },
  { label: "Garantie décès", detail: "capital, rente éducation, conjoint" },
  { label: "Incapacité temporaire", detail: "indemnités complémentaires, franchise" },
  { label: "Invalidité", detail: "rentes par catégorie" },
  { label: "Cotisations", detail: "taux, assiette, répartition employeur / salarié" },
  { label: "Obligation 1,50 % cadres", detail: "tranche A, affectation décès" },
];

/* ------------------------------------------------------------------ */
/*  Visuels                                                            */
/* ------------------------------------------------------------------ */

function DisplayTitle({ italic, sans, className = "" }: { italic: string; sans: string; className?: string }) {
  return (
    <h2 className={`text-center leading-[0.95] tracking-tight text-white ${className}`}>
      <span className="block font-serif text-5xl italic sm:text-7xl">{italic}</span>
      <span className="mt-1 block text-5xl font-medium sm:text-7xl">{sans}</span>
    </h2>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.35em] text-indigo-400">{children}</p>;
}

/** Aperçu décoratif d'une fiche : les paliers de maintien en barres, cadres / non-cadres. */
function HeroFiche() {
  const rows = [
    { label: "Non-cadres · 1 à 5 ans", segs: [{ w: 1, t: "100 %" }, { w: 2, t: "80 %" }] },
    { label: "Non-cadres · + 5 ans", segs: [{ w: 2, t: "100 %" }, { w: 1, t: "80 %" }] },
    { label: "Cadres · dès 1 an", segs: [{ w: 3, t: "100 %" }] },
  ];
  return (
    <div className="glass-night mx-auto w-full max-w-md rounded-[2rem] p-6 sm:p-8" aria-hidden>
      <div className="flex items-center justify-between">
        <span className="font-mono-num text-sm text-indigo-300">IDCC 1486</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">Maladie – accident</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">Bureaux d&rsquo;études techniques, ingénieurs-conseils, sociétés de conseils</p>
      <div className="mt-6 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500">{r.label}</p>
            <div className="mt-1.5 flex gap-1">
              {r.segs.map((s, i) => (
                <div
                  key={i}
                  style={{ flex: s.w }}
                  className={`rounded-md px-2 py-1.5 text-center text-[11px] font-semibold ${i === 0 ? "bg-indigo-500 text-white" : "bg-indigo-500/30 text-indigo-100"}`}
                >
                  {s.w} mois · {s.t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[11px] text-slate-500">Source : CCN art. 43 · Brouillon à valider</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Landing() {
  const nbConventions = CONVENTIONS.length;
  const nbFiches = listFiches().length;
  return (
    <div className="relative min-h-full text-slate-100">
      <NightBackground />
      <PillNav />

      <main className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section id="accueil" className="flex min-h-screen flex-col items-center justify-center px-5 pt-28 pb-16">
          <Reveal className="px-10 py-8 text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]">
            <Eyebrow>Pour la paie, le SIRH et la protection sociale</Eyebrow>
            <h1 className="mt-6 leading-[0.95] tracking-tight text-white">
              <span className="block font-serif text-6xl italic sm:text-8xl">{BRAND.tagline.italic}</span>
              <span className="mt-1 block text-6xl font-medium sm:text-8xl">{BRAND.tagline.sans}</span>
            </h1>
          </Reveal>
          <Reveal delay={150} className="mt-8 max-w-xl text-center">
            <p className="text-base text-slate-300 sm:text-lg">
              Les dispositions maladie – accident et prévoyance complémentaire de chaque convention collective,
              par statut, en une fiche.
            </p>
            <p className="mt-2 text-sm text-slate-500">Maintien de salaire. Carence. Garanties. Cotisations. Sources.</p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="btn-glow rounded-full px-7 py-3.5 text-sm font-semibold">
              Accéder à l&rsquo;outil
            </Link>
            <a
              href="#fonctionnement"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10"
            >
              Voir comment ça marche
            </a>
          </Reveal>
        </section>

        {/* ---------- Accroches ---------- */}
        <section className="px-5 pb-24">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-slate-300">
                Chaque convention a ses règles : un mois à plein, deux à 80 %, après un an, sur douze mois
                glissants. Elles sont écrites dans les textes, mais dispersées entre conventions, avenants et
                accords de prévoyance.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-slate-300">
                {BRAND.name} les rassemble en une fiche par IDCC, lisible avant le paramétrage ou la paie : ce
                que l&rsquo;employeur maintient, ce que la prévoyance couvre, et d&rsquo;où ça vient.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-indigo-500"
              >
                Consulter une convention
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ---------- Piliers ---------- */}
        <section id="fonctionnement" className="px-5 py-24">
          <Reveal>
            <DisplayTitle italic="Le texte dit tout," sans="encore faut-il le lire" />
          </Reveal>
          <div className="mx-auto mt-20 grid max-w-6xl gap-x-16 gap-y-14 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <p className="text-xs font-semibold tracking-[0.35em] text-indigo-400">
                  {p.n} — {p.tag}
                </p>
                <h3 className="mt-3 font-serif text-3xl italic text-white">{p.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate-400">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- Aperçu + dispositions suivies ---------- */}
        <section id="dispositions" className="px-5 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <HeroFiche />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>Dispositions suivies</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl italic text-white sm:text-5xl">Dix champs paie, quinze thèmes</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
                La fiche se lit en colonnes : cadres d&rsquo;un côté, non-cadres de l&rsquo;autre. Quand la branche
                distingue ouvriers, employés ou ETAM, les colonnes suivent la convention.
              </p>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {DISPOSITIONS.map((r) => (
                  <li key={r.label} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span>
                      <span className="block text-sm font-medium text-white">{r.label}</span>
                      <span className="block text-xs text-slate-500">{r.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- Étapes ---------- */}
        <section className="px-5 py-24">
          <Reveal>
            <DisplayTitle italic="Quatre gestes," sans="une fiche" />
          </Reveal>
          <ol className="mx-auto mt-16 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.9)]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------- Sources ---------- */}
        <section id="sources" className="px-5 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <DisplayTitle italic="Textes publics," sans="lecture paie" />
            </Reveal>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {[
                {
                  t: "Sources officielles",
                  b: `Liste des IDCC du ministère du Travail (${BRAND.idccListDate}, ${nbConventions} codes). Textes des conventions et accords publiés sur Légifrance (base KALI), Licence Ouverte Etalab.`,
                },
                {
                  t: "Transparence",
                  b: `Chaque valeur cite son article. Chaque fiche affiche son niveau de fiabilité. Aujourd'hui : ${nbFiches} fiche${nbFiches > 1 ? "s" : ""} renseignée${nbFiches > 1 ? "s" : ""}, les autres IDCC renvoient directement vers le texte.`,
                },
                {
                  t: "Complément, pas substitut",
                  b: "La fiche sert à paramétrer et à contrôler ; elle ne remplace ni la lecture du texte en vigueur, ni les accords d'entreprise plus favorables.",
                },
              ].map((x, i) => (
                <Reveal key={x.t} delay={i * 100}>
                  <h3 className="text-base font-semibold text-white">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{x.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA final ---------- */}
        <section className="px-5 py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <DisplayTitle italic="Avant de paramétrer," sans="vérifiez la branche." />
            <Link href="/login" className="btn-glow mt-10 inline-block rounded-full px-8 py-4 text-sm font-semibold">
              Accéder à l&rsquo;outil
            </Link>
          </Reveal>
        </section>

        {/* ---------- Pied ---------- */}
        <footer className="border-t border-white/10 px-5 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
            <CcnLogo />
            <p className="text-xs text-slate-500">
              Un produit{" "}
              <a href={BRAND.companyUrl} className="text-slate-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                {BRAND.company}
              </a>{" "}
              · Textes conventionnels Légifrance sous Licence Ouverte Etalab 2.0
            </p>
            <a href={`mailto:${BRAND.contactEmail}`} className="text-xs text-indigo-400 hover:text-indigo-300">
              {BRAND.contactEmail}
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
