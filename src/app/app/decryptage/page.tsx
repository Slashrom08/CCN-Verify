import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DECRYPTAGES } from "@/lib/decryptages";

export default function DecryptagesPage() {
  return (
    <AppShell>
      <div>
        <h1 className="text-2xl font-semibold text-ink">Décryptages</h1>
        <p className="mt-1 text-sm text-muted">Des articles de fond pour comprendre le fonctionnement des conventions collectives.</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {DECRYPTAGES.map((d) => (
          <li key={d.slug}>
            <Link href={`/app/decryptage/${d.slug}`} className="panel flex h-full flex-col p-5 hover:border-accent">
              <span className="text-base font-semibold text-accent">{d.titre}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.accroche}</span>
              <span className="mt-4 text-xs font-medium text-link">Lire l&rsquo;article ›</span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
