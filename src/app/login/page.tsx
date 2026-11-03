"use client";

import { useState } from "react";
import Link from "next/link";
import { CcnLogo } from "@/components/CcnLogo";
import { NightBackground } from "@/components/NightBackground";
import { BRAND } from "@/lib/brand";

const inputClass =
  "w-full rounded-full border border-white/10 bg-white/[0.06] px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/30";

export default function LoginPage() {
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
      window.location.href = next;
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-dvh text-slate-100">
      <NightBackground />

      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" aria-label={`${BRAND.name} — accueil`}>
            <CcnLogo />
          </Link>
          <Link
            href="/"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:scale-[1.03]"
          >
            Retour au site
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100dvh-72px)] items-center justify-center px-5 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-[2rem] border border-white/10 bg-black/45 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-10"
        >
          <h1 className="text-center leading-[0.95] tracking-tight text-white">
            <span className="block font-serif text-4xl italic sm:text-5xl">Bienvenue,</span>
            <span className="mt-1 block text-4xl font-medium sm:text-5xl">connectez-vous</span>
          </h1>
          <p className="mt-5 text-center text-sm text-slate-400">Espace réservé aux équipes paie, SIRH et protection sociale.</p>

          <div className="mt-8 space-y-3">
            <label htmlFor="username" className="sr-only">
              Identifiant
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="mt-3 px-2 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-glow mt-5 w-full rounded-full px-5 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Connexion…" : "Se connecter"}
          </button>

          <p className="mt-6 text-center text-xs text-slate-500">Un produit {BRAND.company}</p>
        </form>
      </main>
    </div>
  );
}
