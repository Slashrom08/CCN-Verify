"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { FicheCcn } from "@/lib/ccn/types";
import { FIABILITE_LABEL } from "@/lib/ccn/types";
import { populationsDe } from "@/lib/ccn/populations";
import { Presentation } from "./Presentation";
import { ChampApplication } from "./ChampApplication";
import { Obligations } from "./Obligations";

type Onglet = "presentation" | "champ" | "obligations";
const ONGLETS: { id: Onglet; label: string }[] = [
  { id: "presentation", label: "Présentation" },
  { id: "champ", label: "Champ d'application" },
  { id: "obligations", label: "Obligations" },
];

function lireHash(): Onglet {
  const h = window.location.hash.replace("#", "");
  return (ONGLETS.find((o) => o.id === h)?.id ?? "obligations") as Onglet;
}

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function FicheView({ fiche }: { fiche: FicheCcn }) {
  const populations = useMemo(() => populationsDe(fiche), [fiche]);
  // L'onglet courant vit dans le hash de l'URL : partageable, et stable au rechargement.
  const onglet = useSyncExternalStore(subscribeHash, lireHash, () => "obligations" as Onglet);
  const brouillon = fiche.fiabilite === "brouillon";

  function choisir(o: Onglet) {
    window.history.replaceState(null, "", `#${o}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl border px-4 py-3 text-sm ${brouillon ? "border-amber-200 bg-amber-50 text-amber-900" : "border-indigo-200 bg-indigo-50 text-indigo-900"}`}
      >
        <span className="font-semibold">{FIABILITE_LABEL[fiche.fiabilite]}</span>
        {brouillon && " : valeurs saisies pour tester l'outil, à relire sur le texte en vigueur avant tout usage en paie."}
        <span className="ml-2 text-xs opacity-70">Mise à jour {fiche.maj}</span>
      </div>

      <div role="tablist" aria-label="Rubriques de la fiche" className="grid grid-cols-3 gap-3 print:hidden">
        {ONGLETS.map((o) => {
          const on = onglet === o.id;
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={on}
              onClick={() => choisir(o.id)}
              className={`border-b-4 pb-2 text-left text-xs font-semibold uppercase tracking-[0.2em] transition-colors sm:text-sm ${
                on ? "border-indigo-600 text-indigo-700" : "border-slate-200 text-slate-400 hover:text-slate-700"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {onglet === "presentation" && <Presentation fiche={fiche} />}
      {onglet === "champ" && <ChampApplication champ={fiche.champApplication} />}
      {onglet === "obligations" && <Obligations fiche={fiche} populations={populations} />}
    </div>
  );
}
