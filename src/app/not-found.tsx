import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function NotFound() {
  return (
    <AppShell>
      <div className="panel p-8 text-center">
        <p className="font-mono-num text-sm text-muted">404</p>
        <h1 className="mt-2 text-xl font-semibold text-ink">Cette page n&rsquo;existe pas, ou ce code IDCC n&rsquo;est pas dans la liste officielle.</h1>
        <p className="mt-2 text-sm text-muted">Vérifiez les quatre chiffres, ou cherchez par mots du titre.</p>
        <Link href="/app" className="btn mt-6">
          Retour à la recherche
        </Link>
      </div>
    </AppShell>
  );
}
