"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CcnLogo } from "@/components/CcnLogo";
import { BRAND } from "@/lib/brand";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "Connexion impossible.");
        return;
      }
      const next = new URLSearchParams(window.location.search).get("next") || "/app";
      router.push(next.startsWith("/") ? next : "/app");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label={`${BRAND.name} — accueil`}>
            <CcnLogo />
          </Link>
          <Link href="/" className="text-sm font-medium text-muted hover:text-accent">
            Retour au site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <form onSubmit={handleSubmit} className="panel w-full max-w-sm p-7">
          <h1 className="text-xl font-semibold text-ink">Connexion</h1>
          <p className="mt-1 text-sm text-muted">Espace réservé aux équipes paie, SIRH et protection sociale.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="label">
                Identifiant
              </label>
              <input id="username" type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="label">
                Mot de passe
              </label>
              <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="input mt-1" />
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={isLoading} className="btn mt-6 w-full justify-center">
            {isLoading ? "Connexion…" : "Se connecter"}
          </button>

          <p className="mt-6 text-center text-xs text-muted">Un produit {BRAND.company}</p>
        </form>
      </main>
    </div>
  );
}
