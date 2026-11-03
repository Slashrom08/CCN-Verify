import type { Bloc, Reference } from "@/lib/ccn/types";

/** Ligne « Article 3.2, modifié en dernier lieu par Avenant n° 2 …, étendu le …, applicable à compter du … ». */
export function ReferenceLine({ r }: { r?: Reference }) {
  if (!r) return null;
  const parts: string[] = [];
  if (r.article) parts.push(r.article);
  if (r.modifiePar) parts.push(`${r.article ? "modifié en dernier lieu par " : ""}${r.modifiePar}`);
  if (r.etendu) parts.push(`étendu le ${r.etendu}`);
  if (r.applicable) parts.push(`applicable à compter du ${r.applicable}`);
  const texte = parts.join(", ");
  return (
    <p className="text-xs text-muted">
      <span className="font-medium text-ink">Référence :</span>{" "}
      {r.url ? (
        <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
          {texte}
        </a>
      ) : (
        texte
      )}
    </p>
  );
}

function Paragraphes({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="text-sm leading-relaxed text-ink">
          {p}
        </p>
      ))}
    </>
  );
}

export function BlocView({ b }: { b: Bloc }) {
  switch (b.type) {
    case "texte":
      return <Paragraphes texte={b.contenu} />;
    case "liste":
      return (
        <div>
          {b.titre && <p className="text-sm font-medium text-ink">{b.titre}</p>}
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {b.items.map((x, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink">
                {x}
              </li>
            ))}
          </ul>
        </div>
      );
    case "tableau":
      return (
        <div className="overflow-x-auto rounded border border-line">
          {b.titre && <p className="border-b border-line bg-[#f5f7fa] px-3 py-2 text-xs font-semibold text-ink">{b.titre}</p>}
          <table className="table">
            <thead>
              <tr>
                {b.colonnes.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.lignes.map((l, i) => (
                <tr key={i}>
                  {l.map((c, j) => (
                    <td key={j} className={j === 0 ? "font-medium" : ""}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "loi_ccn":
      return (
        <div className="overflow-x-auto rounded border border-line">
          <table className="table">
            <thead>
              <tr>
                <th>Point</th>
                <th>Code du travail</th>
                <th className="!bg-accent-soft !text-accent">Convention collective</th>
              </tr>
            </thead>
            <tbody>
              {b.lignes.map((l, i) => (
                <tr key={i}>
                  <td className="font-medium">{l.point}</td>
                  <td className="text-muted">{l.loi}</td>
                  <td className="bg-accent-soft/40 font-medium">{l.ccn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
