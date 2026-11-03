import Link from "next/link";
import { CcnLogo } from "./CcnLogo";
import { BRAND } from "@/lib/brand";

const LINKS = [
  { href: "#accueil", label: "Accueil", active: true },
  { href: "#fonctionnement", label: "Fonctionnement" },
  { href: "#dispositions", label: "Dispositions suivies" },
  { href: "#sources", label: "Sources" },
];

/** Barre flottante : logo, pilule centrale en verre, bouton de connexion blanc. */
export function PillNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#0a0b16]/85 via-[#0a0b16]/40 to-transparent pb-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" aria-label={`${BRAND.name} — accueil`}>
          <CcnLogo />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:flex"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.active
                  ? "rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-900"
                  : "rounded-full px-4 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href="/login"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:scale-[1.03]"
        >
          Se connecter
        </Link>
      </div>
    </header>
  );
}
