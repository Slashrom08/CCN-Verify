"use client";

import { useEffect, useMemo, useState } from "react";
import type { KaliArticle, KaliDoc, KaliNode, KaliSection } from "@/lib/ccn/kali";
import { KALI_DATE, enVigueur, etatInfo, legifranceArticleUrl, legifranceConventionUrl, sanitize, texteBrut } from "@/lib/ccn/kali";

/* ------------------------------------------------------------------ */
/*  Indexation                                                         */
/* ------------------------------------------------------------------ */

interface Entree {
  article: KaliArticle;
  chemin: string[];
  sectionId: string;
  texte: string;
}

interface SectionInfo {
  section: KaliSection;
  chemin: string[];
  parentId: string | null;
}

function cle(s: KaliSection, i: number, parent: string | null): string {
  return s.id ?? `${parent ?? "root"}/${i}`;
}

function indexer(doc: KaliDoc) {
  const entrees: Entree[] = [];
  const sections = new Map<string, SectionInfo>();
  function walk(s: KaliSection, chemin: string[], parentId: string | null, i: number) {
    const id = cle(s, i, parentId);
    const ch = [...chemin, s.titre];
    sections.set(id, { section: s, chemin: ch, parentId });
    s.enfants.forEach((n, j) => {
      if (n.t === "a") entrees.push({ article: n, chemin: ch, sectionId: id, texte: texteBrut(n.html).toLowerCase() });
      else walk(n, ch, id, j);
    });
  }
  doc.groupes.forEach((g, i) => walk(g, [], null, i));
  return { entrees, sections };
}

function fold(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* ------------------------------------------------------------------ */
/*  Briques                                                            */
/* ------------------------------------------------------------------ */

function Etat({ etat }: { etat: string | null }) {
  const e = etatInfo(etat);
  const cls = e.tone === "ok" ? "border-emerald-300 bg-emerald-50 text-emerald-800" : e.tone === "warn" ? "border-amber-300 bg-amber-50 text-amber-800" : "border-slate-300 bg-slate-100 text-slate-500";
  return <span className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${cls}`}>{e.label}</span>;
}

function ArticleView({ a, surligne }: { a: KaliArticle; surligne?: string }) {
  const html = useMemo(() => sanitize(a.html), [a.html]);
  const liens = (a.liens ?? []).filter((l) => l.t === "ETEND" || l.t === "MODIFIE");
  return (
    <article id={`art-${a.id}`} className={`scroll-mt-24 border-t border-line py-5 first:border-t-0 first:pt-0 ${surligne ? "bg-amber-50/40" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-semibold text-ink">
          {a.num ? `Article ${a.num}` : "Article"}
          {a.titre && <span className="font-normal text-muted"> · {a.titre}</span>}
        </h4>
        <span className="flex items-center gap-2">
          <Etat etat={a.etat} />
          <a href={legifranceArticleUrl(a.id)} target="_blank" rel="noopener noreferrer" className="text-xs text-link hover:underline">
            Légifrance ↗
          </a>
        </span>
      </div>
      {liens.length > 0 && (
        <p className="mt-1 text-xs text-muted">
          {liens.map((l, i) => (
            <span key={i}>
              {i > 0 && " · "}
              {l.t === "ETEND" ? "Étendu par " : "Modifié par "}
              {l.titre}
            </span>
          ))}
        </p>
      )}
      <div className="kali-html mt-3 text-sm leading-relaxed text-ink" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

function Arbre({
  nodes,
  parentId,
  profondeur,
  ouvert,
  courant,
  onOuvrir,
  onChoisir,
  vigueurSeul,
}: {
  nodes: KaliNode[];
  parentId: string | null;
  profondeur: number;
  ouvert: Set<string>;
  courant: string | null;
  onOuvrir: (id: string) => void;
  onChoisir: (id: string) => void;
  vigueurSeul: boolean;
}) {
  return (
    <ul>
      {nodes.map((n, i) => {
        if (n.t !== "s") return null;
        if (vigueurSeul && !enVigueur(n.etat)) return null;
        const id = cle(n, i, parentId);
        const sousSections = n.enfants.some((c) => c.t === "s");
        const open = ouvert.has(id);
        return (
          <li key={id}>
            <div
              className={`flex items-start gap-1 rounded px-1 py-1 text-xs ${courant === id ? "bg-accent-soft font-semibold text-accent" : "text-ink hover:bg-[#f5f7fa]"}`}
              style={{ paddingLeft: `${profondeur * 0.75 + 0.25}rem` }}
            >
              <button
                type="button"
                aria-label={open ? "Replier" : "Déplier"}
                onClick={() => onOuvrir(id)}
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-muted ${sousSections ? "" : "invisible"}`}
              >
                <svg viewBox="0 0 12 12" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} fill="none" aria-hidden>
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" onClick={() => onChoisir(id)} className={`text-left leading-snug ${enVigueur(n.etat) ? "" : "text-slate-400 line-through"}`}>
                {n.titre || "Sans titre"}
              </button>
            </div>
            {open && sousSections && (
              <Arbre nodes={n.enfants} parentId={id} profondeur={profondeur + 1} ouvert={ouvert} courant={courant} onOuvrir={onOuvrir} onChoisir={onChoisir} vigueurSeul={vigueurSeul} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Onglet                                                             */
/* ------------------------------------------------------------------ */

export function TexteIntegral({ idcc }: { idcc: string }) {
  const [doc, setDoc] = useState<KaliDoc | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [vigueurSeul, setVigueurSeul] = useState(true);
  const [courant, setCourant] = useState<string | null>(null);
  // Sections dépliées : le chemin de la section courante l'est d'office, les clics inversent l'état.
  const [bascules, setBascules] = useState<Set<string>>(new Set());
  const [cibleArticle, setCibleArticle] = useState<string | null>(null);

  useEffect(() => {
    let actif = true;
    fetch(`/kali/${idcc}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: KaliDoc) => {
        if (actif) setDoc(d);
      })
      .catch(() => actif && setErreur("Le texte n'a pas pu être chargé."));
    return () => {
      actif = false;
    };
  }, [idcc]);

  const idx = useMemo(() => (doc ? indexer(doc) : null), [doc]);

  // Section affichée par défaut : la première qui contient directement des articles (le texte de base).
  const defaut = useMemo(() => {
    if (!idx) return null;
    for (const [id, info] of idx.sections) if (info.section.enfants.some((c) => c.t === "a")) return id;
    return idx.sections.keys().next().value ?? null;
  }, [idx]);
  const sectionId = courant ?? defaut;

  const ouvert = useMemo(() => {
    const chemin = new Set<string>();
    let id: string | null = sectionId;
    while (id && idx) {
      chemin.add(id);
      id = idx.sections.get(id)?.parentId ?? null;
    }
    const out = new Set<string>();
    for (const c of chemin) if (!bascules.has(c)) out.add(c);
    for (const b of bascules) if (!chemin.has(b)) out.add(b);
    return out;
  }, [sectionId, idx, bascules]);

  useEffect(() => {
    if (!cibleArticle) return;
    const el = document.getElementById(`art-${cibleArticle}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cibleArticle, sectionId]);

  const resultats = useMemo(() => {
    if (!idx) return [];
    const t = fold(q.trim());
    if (t.length < 3) return [];
    const mots = t.split(/\s+/).filter(Boolean);
    return idx.entrees
      .filter((e) => (!vigueurSeul || enVigueur(e.article.etat)) && mots.every((m) => fold(e.texte).includes(m)))
      .slice(0, 60)
      .map((e) => {
        const pos = fold(e.texte).indexOf(mots[0]);
        const debut = Math.max(0, pos - 80);
        return { ...e, extrait: (debut > 0 ? "… " : "") + e.texte.slice(debut, pos + 160) + " …" };
      });
  }, [idx, q, vigueurSeul]);

  if (erreur) return <p className="panel p-5 text-sm text-red-700">{erreur}</p>;
  if (!doc || !idx) return <p className="panel p-5 text-sm text-muted">Chargement du texte intégral…</p>;

  const info = sectionId ? idx.sections.get(sectionId) : undefined;
  const articles = (info?.section.enfants ?? []).filter((n): n is KaliArticle => n.t === "a" && (!vigueurSeul || enVigueur(n.etat)));
  const sousSections = (info?.section.enfants ?? []).filter((n): n is KaliSection => n.t === "s" && (!vigueurSeul || enVigueur(n.etat)));
  const nbTotal = idx.entrees.length;

  function choisir(id: string, article?: string) {
    setCourant(id);
    setBascules(new Set());
    setCibleArticle(article ?? null);
    if (!article) window.scrollTo({ top: 0 });
  }

  return (
    <div className="space-y-4">
      <div className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-ink">
          <span className="font-semibold">{nbTotal.toLocaleString("fr-FR")} articles</span>
          <span className="text-muted"> · texte de base, textes attachés et textes salaires · Légifrance (base KALI), extraction du {KALI_DATE}</span>
        </p>
        <a href={legifranceConventionUrl(doc.id)} target="_blank" rel="noopener noreferrer" className="text-xs text-link hover:underline">
          Convention sur Légifrance ↗
        </a>
      </div>

      <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher dans le texte : « 90 jours », « prime de vacances », « période d'essai »…" className="input flex-1" aria-label="Rechercher dans le texte" />
        <label className="flex items-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={vigueurSeul} onChange={(e) => setVigueurSeul(e.target.checked)} className="h-4 w-4 accent-[#1f3b5c]" />
          En vigueur uniquement
        </label>
      </div>

      {q.trim().length >= 3 && (
        <section className="panel p-4">
          <p className="text-sm font-semibold text-ink">
            {resultats.length === 0 ? "Aucun article ne contient ces mots." : `${resultats.length}${resultats.length === 60 ? "+" : ""} article${resultats.length > 1 ? "s" : ""} trouvé${resultats.length > 1 ? "s" : ""}`}
          </p>
          <ul className="mt-2 divide-y divide-line">
            {resultats.map((r) => (
              <li key={r.article.id} className="py-2.5">
                <button type="button" onClick={() => choisir(r.sectionId, r.article.id)} className="text-left">
                  <span className="block text-sm font-medium text-accent hover:underline">
                    {r.article.num ? `Article ${r.article.num}` : "Article"} · {r.chemin.slice(-2).join(" › ")}
                  </span>
                  <span className="block text-xs text-muted">{r.chemin[0]}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink">{r.extrait}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-4 lg:grid-cols-[19rem_1fr]">
        <nav aria-label="Sommaire du texte" className="panel sticky top-4 max-h-[calc(100vh-3rem)] overflow-y-auto p-2 print:hidden">
          <Arbre
            nodes={doc.groupes}
            parentId={null}
            profondeur={0}
            ouvert={ouvert}
            courant={sectionId}
            onOuvrir={(id) =>
              setBascules((o) => {
                const n = new Set(o);
                if (n.has(id)) n.delete(id);
                else n.add(id);
                return n;
              })
            }
            onChoisir={(id) => choisir(id)}
            vigueurSeul={vigueurSeul}
          />
        </nav>

        <section className="panel min-w-0 p-5 sm:p-6">
          {info ? (
            <>
              <p className="text-xs text-muted">{info.chemin.slice(0, -1).join(" › ")}</p>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-accent">{info.section.titre || "Sans titre"}</h3>
                <Etat etat={info.section.etat} />
              </div>
              {sousSections.length > 0 && (
                <ul className="mt-4 divide-y divide-line rounded border border-line">
                  {sousSections.map((s, i) => {
                    const id = cle(s, info.section.enfants.indexOf(s), sectionId);
                    return (
                      <li key={id + i}>
                        <button type="button" onClick={() => choisir(id)} className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-ink hover:bg-accent-soft">
                          <span>{s.titre || "Sans titre"}</span>
                          <span className="shrink-0 text-xs text-muted">{s.enfants.length} élément{s.enfants.length > 1 ? "s" : ""} ›</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {articles.length > 0 && (
                <div className="mt-5">
                  {articles.map((a) => (
                    <ArticleView key={a.id} a={a} surligne={cibleArticle === a.id ? "oui" : undefined} />
                  ))}
                </div>
              )}
              {articles.length === 0 && sousSections.length === 0 && <p className="mt-4 text-sm text-muted">Cette section ne contient aucun élément en vigueur.</p>}
            </>
          ) : (
            <p className="text-sm text-muted">Choisissez une section dans le sommaire.</p>
          )}
        </section>
      </div>
    </div>
  );
}
