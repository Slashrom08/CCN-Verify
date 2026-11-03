import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { DECRYPTAGES, getDecryptage } from "@/lib/decryptages";
import { BRAND } from "@/lib/brand";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return DECRYPTAGES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDecryptage(slug);
  return { title: d ? `${d.titre} — ${BRAND.name}` : BRAND.name };
}

export default async function DecryptagePage({ params }: { params: Params }) {
  const { slug } = await params;
  const d = getDecryptage(slug);
  if (!d) notFound();
  const autres = DECRYPTAGES.filter((x) => x.slug !== d.slug);

  return (
    <AppShell>
      <nav className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-wide text-slate-500" aria-label="Fil d'Ariane">
        <Link href="/app" className="hover:text-indigo-700">
          Accueil
        </Link>
        <span aria-hidden>›</span>
        <span>Décryptage</span>
      </nav>

      <article className="card-soft overflow-hidden rounded-3xl">
        <header className="p-6 sm:p-8" style={{ background: d.couleur }}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-800/70">Décryptage · mis à jour {d.maj}</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{d.titre}</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-800">{d.accroche}</p>
        </header>
        <div className="space-y-8 p-6 sm:p-8">
          {d.sections.map((s) => (
            <section key={s.titre}>
              <h2 className="text-lg font-semibold text-slate-900">{s.titre}</h2>
              <div className="mt-2 space-y-3">
                {s.paragraphes.map((p, i) => (
                  <p key={i} className="max-w-3xl text-sm leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section>
        <h2 className="text-sm font-semibold text-slate-800">Autres décryptages</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`/app/decryptage/${x.slug}`} className="card-soft block rounded-2xl p-4 hover:border-indigo-300">
                <span className="mb-2 block h-1.5 w-10 rounded-full" style={{ background: x.couleur }} />
                <span className="text-sm font-semibold text-slate-900">{x.titre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
