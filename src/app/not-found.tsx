import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function NotFound() {
  return (
    <AppShell>
      <div className="card-soft rounded-3xl p-8 text-center">
        <p className="font-mono-num text-sm text-indigo-700">404</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">Ce code IDCC n&rsquo;est pas dans la liste officielle.</h1>
        <p className="mt-2 text-sm text-slate-500">Vérifiez les quatre chiffres, ou cherchez par mots du titre.</p>
        <Link href="/app" className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
          Retour à la recherche
        </Link>
      </div>
    </AppShell>
  );
}
