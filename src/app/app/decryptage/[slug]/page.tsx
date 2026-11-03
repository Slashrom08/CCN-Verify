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
      <nav className="text-xs text-muted" aria-label="Fil d'Ariane">
        <Link href="/app" className="hover:text-accent">
          Accueil
        </Link>
        <span className="mx-1.5">›</span>
        <Link href="/app/decryptage" className="hover:text-accent">
          Décryptages
        </Link>
      </nav>

      <article className="panel p-6 sm:p-8">
        <p className="label">Décryptage · mis à jour {d.maj}</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{d.titre}</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">{d.accroche}</p>
        <div className="mt-8 space-y-8 border-t border-line pt-8">
          {d.sections.map((s) => (
            <section key={s.titre}>
              <h2 className="text-lg font-semibold text-accent">{s.titre}</h2>
              <div className="mt-2 space-y-3">
                {s.paragraphes.map((p, i) => (
                  <p key={i} className="max-w-3xl text-sm leading-relaxed text-ink">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section>
        <h2 className="text-sm font-semibold text-ink">Autres décryptages</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`/app/decryptage/${x.slug}`} className="panel block p-4 hover:border-accent">
                <span className="text-sm font-semibold text-accent">{x.titre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
