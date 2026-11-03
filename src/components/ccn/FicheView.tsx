"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { FicheCcn } from "@/lib/ccn/types";
import { FIABILITE_LABEL } from "@/lib/ccn/types";
import { populationsDe } from "@/lib/ccn/populations";
import { Presentation } from "./Presentation";
import { ChampApplication } from "./ChampApplication";
import { Obligations } from "./Obligations";
import { TexteIntegral } from "./TexteIntegral";
import type { KaliMeta } from "@/lib/ccn/kali";

type Onglet = "presentation" | "champ" | "obligations" | "texte";
const ONGLETS: { id: Onglet; label: string }[] = [
  { id: "presentation", label: "Présentation" },
  { id: "champ", label: "Champ d'application" },
  { id: "obligations", label: "Obligations" },
  { id: "texte", label: "Texte intégral" },
];

function lireHash(): Onglet | "" {
  const h = window.location.hash.replace("#", "");
  return (ONGLETS.find((o) => o.id === h)?.id ?? "") as Onglet | "";
}

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function FicheView({ fiche, idcc, kali }: { fiche?: FicheCcn; idcc: string; kali?: KaliMeta }) {
  const populations = useMemo(() => (fiche ? populationsDe(fiche) : []), [fiche]);
  const onglets = ONGLETS.filter((o) => (o.id === "texte" ? !!kali : !!fiche));
  // L'onglet courant vit dans le hash de l'URL : partageable, et stable au rechargement.
  const hash = useSyncExternalStore(subscribeHash, lireHash, () => "" as const);
  const onglet: Onglet = onglets.some((o) => o.id === hash) ? (hash as Onglet) : fiche ? "obligations" : "texte";
  const brouillon = fiche?.fiabilite === "brouillon";

  function choisir(o: Onglet) {
    window.history.replaceState(null, "", `#${o}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return (
    <div className="space-y-6">
      {fiche ? (
        <div className={`rounded border px-4 py-2.5 text-sm ${brouillon ? "border-amber-300 bg-amber-50 text-amber-900" : "border-line bg-white text-ink"}`}>
          <span className="font-semibold">{FIABILITE_LABEL[fiche.fiabilite]}</span>
          {brouillon ? " : valeurs saisies pour tester l'outil, à relire sur le texte en vigueur avant tout usage." : " : chaque disposition renvoie à l'article du texte officiel."}
          <span className="ml-2 text-xs text-muted">Mise à jour {fiche.maj}</span>
        </div>
      ) : (
        <div className="rounded border border-line bg-white px-4 py-2.5 text-sm text-ink">
          <span className="font-semibold">Fiche structurée non renseignée.</span> Le texte intégral de la convention est disponible ci-dessous, avec recherche par mots.
        </div>
      )}

      <div role="tablist" aria-label="Rubriques de la fiche" className="flex gap-6 border-b border-line print:hidden">
        {onglets.map((o) => {
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

      {fiche && onglet === "presentation" && <Presentation fiche={fiche} />}
      {fiche && onglet === "champ" && <ChampApplication champ={fiche.champApplication} />}
      {fiche && onglet === "obligations" && <Obligations fiche={fiche} populations={populations} />}
      {kali && onglet === "texte" && <TexteIntegral idcc={idcc} />}
    </div>
  );
}
