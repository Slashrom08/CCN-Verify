"use client";

import { useState } from "react";
import type { ChampApplication as Champ } from "@/lib/ccn/types";
import { Liste } from "./Cartes";

type Onglet = "textes" | "territorial" | "professionnel" | "personnels" | "fusion";

export function ChampApplication({ champ }: { champ?: Champ }) {
  const entries: { id: Onglet; label: string; ok: boolean }[] = [
    { id: "textes", label: "Textes de référence", ok: !!champ?.textesReference?.length },
    { id: "territorial", label: "Territorial", ok: !!champ?.territorial },
    { id: "professionnel", label: "Professionnel", ok: !!champ?.professionnel },
    { id: "personnels", label: "Personnels particuliers", ok: !!champ?.personnels?.length },
    { id: "fusion", label: "Fusion des branches", ok: !!champ?.fusion?.length },
  ];
  const first = entries.find((e) => e.ok)?.id ?? "professionnel";
  const [onglet, setOnglet] = useState<Onglet>(first);

  if (!champ) {
    return <p className="panel p-5 text-sm text-muted">Le champ d&rsquo;application de cette convention n&rsquo;a pas encore été saisi.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <nav aria-label="Champ d'application" className="panel self-start overflow-hidden print:hidden">
        {entries.map((e) => (
          <button
            key={e.id}
            type="button"
            disabled={!e.ok}
            onClick={() => setOnglet(e.id)}
            className={`block w-full border-b border-line px-4 py-2.5 text-left text-sm last:border-0 ${
              onglet === e.id ? "bg-accent-soft font-semibold text-accent" : e.ok ? "text-ink hover:bg-[#f5f7fa]" : "text-slate-300"
            }`}
          >
            {e.label}
          </button>
        ))}
      </nav>

      <section className="panel p-5 sm:p-6">
        {onglet === "textes" && (
          <>
            <h3 className="theme-title">Textes de référence</h3>
            <Liste items={champ.textesReference} />
          </>
        )}
        {onglet === "territorial" && (
          <>
            <h3 className="theme-title">Territorial</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink">{champ.territorial}</p>
          </>
        )}
        {onglet === "professionnel" && champ.professionnel && (
          <>
            <h3 className="theme-title">Professionnel</h3>
            {champ.professionnel.intro && <p className="mt-4 text-sm leading-relaxed text-ink">{champ.professionnel.intro}</p>}
            {champ.professionnel.groupes.map((g) => (
              <div key={g.titre} className="mt-6">
                <p className="text-sm font-semibold text-ink">{g.titre}</p>
                <div className="mt-2 overflow-x-auto rounded border border-line">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="w-28">Code NAF</th>
                        <th>Activité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.codes.map((c) => (
                        <tr key={c.code}>
                          <td className="font-mono-num font-semibold">{c.code}</td>
                          <td>{c.activite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </>
        )}
        {onglet === "personnels" && (
          <>
            <h3 className="theme-title">Personnels particuliers</h3>
            {champ.personnels?.map((p) => (
              <div key={p.titre} className="mt-4">
                <p className="text-sm font-semibold text-ink">{p.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{p.texte}</p>
              </div>
            ))}
          </>
        )}
        {onglet === "fusion" && (
          <>
            <h3 className="theme-title">Fusion des branches professionnelles</h3>
            <Liste items={champ.fusion} />
          </>
        )}
      </section>
    </div>
  );
}
