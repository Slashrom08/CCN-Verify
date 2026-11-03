// Génère, à partir de l'extraction KALI (@socialgouv/kali-data, API Légifrance / DILA),
// un fichier JSON compact par IDCC dans public/kali/ et un index dans src/data/kali-index.json.
// Lancé avant chaque build (npm run prebuild). Les fichiers générés ne sont pas versionnés.
// L'archive est téléchargée directement depuis le registre npm (pas de dépendance : le paquet
// en tire une hébergée hors registre), puis mise en cache dans node_modules/.cache/kali.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const VERSION = process.env.KALI_DATA_VERSION || "3.518.0";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cache = join(root, "node_modules", ".cache", "kali", VERSION);
const src = join(cache, "package", "data");
const outDir = join(root, "public", "kali");
const indexFile = join(root, "src", "data", "kali-index.json");

if (!existsSync(src)) {
  mkdirSync(cache, { recursive: true });
  const url = `https://registry.npmjs.org/@socialgouv/kali-data/-/kali-data-${VERSION}.tgz`;
  console.log(`KALI : téléchargement de ${url}`);
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`Téléchargement impossible : ${res.status}`);
  const tgz = join(cache, "kali-data.tgz");
  await pipeline(Readable.fromWeb(res.body), createWriteStream(tgz));
  execFileSync("tar", ["xzf", tgz, "-C", cache]);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

/** Résumé des liens de modification / extension d'un article. */
function liens(list) {
  if (!Array.isArray(list)) return undefined;
  const out = list
    .filter((l) => l && (l.linkType === "ETEND" || l.linkType === "MODIFIE" || l.linkType === "CREE" || l.linkType === "ABROGE"))
    .map((l) => ({ t: l.linkType, titre: l.textTitle, date: l.dateSignaTexte || l.datePubliTexte }))
    .slice(0, 6);
  return out.length ? out : undefined;
}

function compact(node) {
  const d = node.data || {};
  if (node.type === "article") {
    return { t: "a", id: d.id, num: d.num ?? null, titre: d.title || null, etat: d.etat || null, html: d.content || "", liens: liens(d.lstLienModification) };
  }
  const children = (node.children || []).map(compact).filter(Boolean);
  return { t: "s", id: d.id || null, titre: d.title || "", etat: d.etat || null, enfants: children };
}

function nbArticles(node) {
  return node.t === "a" ? 1 : node.enfants.reduce((n, c) => n + nbArticles(c), 0);
}

const index = {};
for (const f of readdirSync(src)) {
  const m = /^(KALICONT\d+)(?:-(\d+))?\.json$/.exec(f);
  if (!m) continue;
  const raw = JSON.parse(readFileSync(join(src, f), "utf8"));
  const d = raw.data || {};
  const idcc = String(m[2] || d.num || "").padStart(4, "0");
  if (!/^\d{4}$/.test(idcc) || idcc === "0000") continue;
  const groupes = (raw.children || []).map(compact);
  const total = groupes.reduce((n, g) => n + nbArticles(g), 0);
  if (!total) continue;
  const doc = { idcc, id: d.id, titre: d.title || "", titreCourt: d.shortTitle || "", groupes };
  const json = JSON.stringify(doc);
  writeFileSync(join(outDir, `${idcc}.json`), json);
  index[idcc] = { id: d.id, titre: (d.title || "").trim(), titreCourt: d.shortTitle || "", articles: total, octets: Buffer.byteLength(json) };
}

mkdirSync(dirname(indexFile), { recursive: true });
writeFileSync(indexFile, JSON.stringify({ source: "Légifrance, base KALI (DILA), via @socialgouv/kali-data", version: VERSION, genere: new Date().toISOString().slice(0, 10), conventions: index }, null, 1));
const total = Object.values(index).reduce((n, x) => n + x.octets, 0);
console.log(`KALI : ${Object.keys(index).length} conventions, ${Math.round(total / 1e6)} Mo écrits dans public/kali (kali-data ${VERSION})`);
