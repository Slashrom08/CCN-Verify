import Link from "next/link";
import { CcnLogo } from "@/components/CcnLogo";
import { LogoutButton } from "@/components/LogoutButton";
import { BRAND } from "@/lib/brand";

/** Cadre commun de l'espace outil : en-tête nuit, fond pointillé, pied de page. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-dot-grid flex min-h-full flex-col">
      <header className="bg-[#0a0b16] px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/app">
            <CcnLogo />
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10">{children}</main>

      <footer className="px-4 py-6 text-center text-xs text-slate-400">
        Liste des IDCC du ministère du Travail ({BRAND.idccListDate}) · Textes conventionnels Légifrance, Licence Ouverte Etalab 2.0.
      </footer>
    </div>
  );
}
