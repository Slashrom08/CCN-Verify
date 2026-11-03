import { BRAND } from "@/lib/brand";

/**
 * Marque CCN Verify : trois lignes de texte (les articles d'une convention)
 * barrées d'une coche (la disposition vérifiée) — même famille visuelle que
 * le relief Terra Verify et le globe Sky Verify.
 */
export function CcnMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="20" cy="20" r="15.6" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      {/* lignes d'articles */}
      <path d="M11 14.5h18" stroke="currentColor" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
      <path d="M11 20h12" stroke="currentColor" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
      <path d="M11 25.5h15" stroke="currentColor" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
      {/* coche de validation */}
      <path d="M12.4 21.2 17.6 26.6 30 13.4" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CcnLogo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const word = tone === "dark" ? "text-white" : "text-slate-900";
  const sub = tone === "dark" ? "text-slate-400" : "text-slate-500";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <CcnMark className="h-9 w-9 shrink-0 text-indigo-400" />
      <span className="leading-none">
        <span className={`block text-base font-bold tracking-wide ${word}`}>
          {BRAND.wordmark[0]} <span className="text-indigo-400">{BRAND.wordmark[1]}</span>
        </span>
        <span className={`mt-1 block text-[10px] font-medium tracking-[0.25em] ${sub}`}>{BRAND.baseline}</span>
      </span>
    </span>
  );
}
