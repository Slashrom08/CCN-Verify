import Link from "next/link";
import { CcnLogo } from "@/components/CcnLogo";
import { LogoutButton } from "@/components/LogoutButton";
import { BRAND } from "@/lib/brand";

const NAV = [
  { href: "/app", label: "Conventions collectives" },
  { href: "/app/decryptage", label: "Décryptages" },
];

/** Cadre commun de l'espace outil : barre blanche, fond pastel uni, pied de page. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-line bg-white print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
          <Link href="/app" aria-label={`${BRAND.name} — accueil de l'outil`}>
            <CcnLogo />
          </Link>
          <nav aria-label="Navigation" className="hidden items-center gap-6 text-sm font-medium text-muted sm:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8">{children}</main>

      <footer className="border-t border-line bg-white px-4 py-5 text-center text-xs text-muted print:hidden">
        {BRAND.name} · Liste des IDCC du ministère du Travail ({BRAND.idccListDate}) · Textes conventionnels Légifrance, Licence Ouverte Etalab 2.0 · Un produit{" "}
        <a href={BRAND.companyUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          {BRAND.company}
        </a>
      </footer>
    </div>
  );
}
