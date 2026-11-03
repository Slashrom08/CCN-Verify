"use client";

import { useState } from "react";

export function ExportButton({ onExport, label = "Exporter en Excel", className = "btn-secondary" }: { onExport: () => Promise<void>; label?: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function run() {
    setBusy(true);
    setErr(null);
    try {
      await onExport();
    } catch {
      setErr("Export impossible.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <span className="inline-flex items-center gap-2">
      <button type="button" onClick={run} disabled={busy} className={className}>
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
          <path d="M4 3h8l4 4v10H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M7 10.5l2 2.5-2 2.5M13 10.5l-2 2.5 2 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {busy ? "Préparation…" : label}
      </button>
      {err && <span className="text-xs text-red-700">{err}</span>}
    </span>
  );
}
