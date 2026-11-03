import type { Bloc, Reference } from "@/lib/ccn/types";

/** Ligne « Article 3.2 modifié en dernier lieu par Avenant n° 2 … étendu le … applicable à compter du … ». */
export function ReferenceLine({ r }: { r?: Reference }) {
  if (!r) return null;
  const parts: React.ReactNode[] = [];
  if (r.article) parts.push(<span key="a" className="font-semibold text-indigo-700">{r.article}</span>);
  if (r.modifiePar) parts.push(<span key="m">{r.article ? " modifié en dernier lieu par " : ""}<span className="font-medium text-indigo-700">{r.modifiePar}</span></span>);
  if (r.etendu) parts.push(<span key="e"> étendu le {r.etendu}</span>);
  if (r.applicable) parts.push(<span key="p"> et applicable à compter du {r.applicable}</span>);
  return (
    <p className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" fill="none" aria-hidden>
        <path d="M5 3h7l3 3v11H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M7.5 9h5M7.5 12h5M7.5 15h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>
        {r.url ? (
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {parts}
          </a>
        ) : (
          parts
        )}
      </span>
    </p>
  );
}

function Paragraphes({ texte }: { texte: string }) {
  return (
    <>
      {texte.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="text-sm leading-relaxed text-slate-700">
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
          {b.titre && <p className="text-sm font-medium text-slate-800">{b.titre}</p>}
          <ul className="mt-1 space-y-1">
            {b.items.map((x, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "tableau":
      return (
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          {b.titre && <p className="bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">{b.titre}</p>}
          <table className="w-full text-sm">
            <thead className="bg-indigo-50 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-800">
              <tr>
                {b.colonnes.map((c) => (
                  <th key={c} className="px-4 py-2.5">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {b.lignes.map((l, i) => (
                <tr key={i}>
                  {l.map((c, j) => (
                    <td key={j} className={`px-4 py-2.5 align-top ${j === 0 ? "font-medium text-slate-800" : "text-slate-700"}`}>
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
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] font-semibold uppercase tracking-[0.18em]">
              <tr>
                <th className="bg-slate-50 px-4 py-2.5 text-slate-500">Point</th>
                <th className="bg-slate-50 px-4 py-2.5 text-slate-500">Code du travail</th>
                <th className="bg-indigo-50 px-4 py-2.5 text-indigo-800">Convention collective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {b.lignes.map((l, i) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 align-top font-medium text-slate-800">{l.point}</td>
                  <td className="px-4 py-2.5 align-top text-slate-600">{l.loi}</td>
                  <td className="bg-indigo-50/40 px-4 py-2.5 align-top font-medium text-slate-900">{l.ccn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
