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
      <div className={`rounded border px-4 py-2.5 text-sm ${brouillon ? "border-amber-300 bg-amber-50 text-amber-900" : "border-line bg-white text-ink"}`}>
        <span className="font-semibold">{FIABILITE_LABEL[fiche.fiabilite]}</span>
        {brouillon && " : valeurs saisies pour tester l'outil, à relire sur le texte en vigueur avant tout usage en paie."}
        <span className="ml-2 text-xs text-muted">Mise à jour {fiche.maj}</span>
      </div>

      <div role="tablist" aria-label="Rubriques de la fiche" className="flex gap-6 border-b border-line print:hidden">
        {ONGLETS.map((o) => {
          const on = onglet === o.id;
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={on}
              onClick={() => choisir(o.id)}
              className={`-mb-px border-b-2 pb-2.5 text-sm font-medium transition-colors ${on ? "border-accent text-accent" : "border-transparent text-muted hover:text-ink"}`}
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
