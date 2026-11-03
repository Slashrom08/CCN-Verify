import { AppShell } from "@/components/AppShell";
import { CcnSearch } from "@/components/ccn/CcnSearch";
import { CONVENTIONS } from "@/lib/ccn/idcc";
import { listFiches } from "@/lib/ccn/fiches";

export default function AppPage() {
  const renseignees = listFiches().map((f) => f.idcc);
  return (
    <AppShell>
      <div>
        <p className="inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700">
          Suivi des conventions collectives
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Un IDCC, une fiche maladie – accident et prévoyance</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          {CONVENTIONS.length} codes de la liste officielle. Chaque fiche décline le maintien de salaire et la prévoyance
          complémentaire par statut, avec l&rsquo;article source.
        </p>
      </div>

      <CcnSearch renseignees={renseignees} />
    </AppShell>
  );
}
