import { BRAND } from "@/lib/brand";

/** Marque : lignes d'articles barrées d'une coche, en marine. */
export function CcnMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="34" height="34" rx="7" fill="currentColor" />
      <path d="M12 13.5h16M12 19h10M12 24.5h13" stroke="#ffffff" strokeWidth="1.6" opacity="0.55" strokeLinecap="round" />
      <path d="M13.5 22.5 18 27 28.5 15.5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CcnLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <CcnMark className="h-8 w-8 shrink-0 text-accent" />
      <span className="leading-none">
        <span className="block text-base font-semibold text-ink">
          {BRAND.wordmark[0]} <span className="text-accent">{BRAND.wordmark[1]}</span>
        </span>
        <span className="mt-0.5 block text-[11px] text-muted">{BRAND.baseline}</span>
      </span>
    </span>
  );
}
