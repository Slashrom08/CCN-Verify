"use client";

import type { Convention, FicheCcn, Statut } from "./types";
import { STATUT_LABEL, THEME_LABEL } from "./types";
import { niveauDuTitre } from "./idcc";

type Row = (string | number)[];

function texteBloc(b: FicheCcn["rubriques"][number]["dispositions"][number]["blocs"][number]): string {
  switch (b.type) {
    case "texte":
      return b.contenu;
    case "liste":
      return (b.titre ? b.titre + " : " : "") + b.items.join(" ; ");
    case "tableau":
      return (b.titre ? b.titre + " : " : "") + b.lignes.map((l) => l.join(" / ")).join(" ; ");
    case "loi_ccn":
      return b.lignes.map((l) => `${l.point} : loi = ${l.loi} ; CCN = ${l.ccn}`).join(" ; ");
  }
}

function libelle(fiche: FicheCcn, s: Statut): string {
  return fiche.populations.find((p) => p.id === s)?.label ?? STATUT_LABEL[s];
}

function telecharger(buffer: ArrayBuffer, nom: string) {
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  a.click();
  URL.revokeObjectURL(url);
}

async function classeur() {
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = "CCN Verify";
  wb.created = new Date();
  return wb;
}

type Feuille = import("exceljs").Worksheet;

function feuille(wb: import("exceljs").Workbook, nom: string, colonnes: { header: string; key: string; width: number }[], rows: Row[]): Feuille {
  const ws = wb.addWorksheet(nom, { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = colonnes;
  rows.forEach((r) => ws.addRow(r));
  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: "FFFFFFFF" } };
  head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F3B5C" } };
  head.alignment = { vertical: "middle" };
  ws.eachRow((row, i) => {
    if (i > 1) row.alignment = { vertical: "top", wrapText: true };
  });
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: colonnes.length } };
  return ws;
}

/** Export d'une fiche complète : un onglet par vue (résumé, maladie, prévoyance, dispositions, NAF). */
export async function exporterFiche(convention: Convention, fiche: FicheCcn) {
  const wb = await classeur();

  const resume: Row[] = [
    ["IDCC", convention.idcc],
    ["Titre", convention.titre],
    ["Nom d'usage", fiche.nomUsage ?? ""],
    ["Numéro de brochure", fiche.brochure ?? ""],
    ["Niveau", fiche.presentation?.niveau ?? ""],
    ["Étendue", fiche.presentation?.etendue ? "Oui" : "Non"],
    ["Date de signature", fiche.presentation?.dateSignature ?? ""],
    ["Date d'extension", fiche.presentation?.dateExtension ?? ""],
    ["Populations", fiche.populations.map((p) => p.label).join(", ")],
    ["Fiabilité", fiche.fiabilite === "verifie" ? "Vérifiée sur le texte" : "Brouillon à valider"],
    ["Mise à jour de la fiche", fiche.maj],
    ["Résumé", fiche.resume ?? ""],
    ...(fiche.presentation?.actualisations ?? []).map((a, i): Row => [i === 0 ? "Actualisée par" : "", a]),
    ...(fiche.vigilance ?? []).map((v, i): Row => [i === 0 ? "Points de vigilance" : "", v]),
  ];
  const ws = feuille(wb, "Résumé", [{ header: "Champ", key: "c", width: 26 }, { header: "Valeur", key: "v", width: 110 }], resume);
  ws.getColumn(1).font = { bold: true };

  feuille(
    wb,
    "Maladie-accident",
    [
      { header: "Population", key: "p", width: 24 },
      { header: "Ancienneté requise", key: "a", width: 22 },
      { header: "Tranche d'ancienneté", key: "t", width: 22 },
      { header: "Palier", key: "n", width: 8 },
      { header: "Durée", key: "d", width: 12 },
      { header: "Taux", key: "x", width: 10 },
      { header: "Carence", key: "c", width: 40 },
      { header: "Base et déductions", key: "b", width: 50 },
      { header: "Période de référence", key: "r", width: 36 },
      { header: "Conditions", key: "k", width: 50 },
      { header: "Source", key: "s", width: 40 },
    ],
    fiche.maladieAccident.flatMap((m) =>
      m.tranches.flatMap((t) =>
        t.paliers.map((pl, i): Row => [
          m.libelleStatut ?? libelle(fiche, m.statut),
          m.ancienneteRequise,
          t.anciennete,
          i + 1,
          pl.duree,
          pl.taux,
          m.carence,
          m.base,
          m.periodeReference ?? "",
          (m.conditions ?? []).join(" ; "),
          m.sources.map((s) => s.label).join(" ; "),
        ]),
      ),
    ),
  );

  feuille(
    wb,
    "Prévoyance",
    [
      { header: "Population", key: "p", width: 24 },
      { header: "Caractère", key: "c", width: 26 },
      { header: "Garantie", key: "g", width: 28 },
      { header: "Niveau", key: "n", width: 50 },
      { header: "Précision", key: "x", width: 50 },
      { header: "Taux de cotisation", key: "t", width: 30 },
      { header: "Assiette", key: "a", width: 24 },
      { header: "Répartition", key: "r", width: 30 },
      { header: "Organisme", key: "o", width: 24 },
      { header: "Source", key: "s", width: 40 },
    ],
    fiche.prevoyance.flatMap((p) =>
      p.garanties.map((g): Row => [
        p.libelleStatut ?? libelle(fiche, p.statut),
        { obligatoire: "Régime de branche obligatoire", recommande: "Régime recommandé", obligation_cotisation: "Obligation de cotisation" }[p.caractere],
        g.nom,
        g.montant,
        g.precision ?? "",
        p.cotisation?.taux ?? "",
        p.cotisation?.assiette ?? "",
        p.cotisation?.repartition ?? "",
        p.organisme ?? "",
        p.sources.map((s) => s.label).join(" ; "),
      ]),
    ),
  );

  feuille(
    wb,
    "Dispositions",
    [
      { header: "Thème", key: "t", width: 28 },
      { header: "Disposition", key: "d", width: 36 },
      { header: "Populations", key: "p", width: 28 },
      { header: "Article", key: "a", width: 22 },
      { header: "Modifié par", key: "m", width: 36 },
      { header: "Étendu le", key: "e", width: 26 },
      { header: "Applicable à compter du", key: "x", width: 18 },
      { header: "Contenu", key: "c", width: 100 },
    ],
    (fiche.rubriques ?? []).flatMap((r) =>
      r.dispositions.map((d): Row => [
        THEME_LABEL[r.theme],
        d.titre,
        d.populations.map((s) => (s === "tous" ? "Toutes" : libelle(fiche, s))).join(", "),
        d.reference?.article ?? "",
        d.reference?.modifiePar ?? "",
        d.reference?.etendu ?? "",
        d.reference?.applicable ?? "",
        d.blocs.map(texteBloc).join("\n"),
      ]),
    ),
  );

  const naf = fiche.champApplication?.professionnel?.groupes ?? [];
  if (naf.length) {
    feuille(
      wb,
      "Champ NAF",
      [
        { header: "Famille", key: "f", width: 28 },
        { header: "Code NAF", key: "c", width: 12 },
        { header: "Activité", key: "a", width: 70 },
      ],
      naf.flatMap((g) => g.codes.map((c): Row => [g.titre, c.code, c.activite])),
    );
  }

  const buf = await wb.xlsx.writeBuffer();
  telecharger(buf as ArrayBuffer, `ccn-verify-${convention.idcc}${fiche.nomUsage ? "-" + fiche.nomUsage.toLowerCase() : ""}.xlsx`);
}

/** Export d'une liste de conventions (résultats de recherche). */
export async function exporterListe(conventions: Convention[], index: Record<string, { brochure?: string; nomUsage?: string; niveau?: string }>) {
  const wb = await classeur();
  feuille(
    wb,
    "Conventions",
    [
      { header: "IDCC", key: "i", width: 8 },
      { header: "Titre", key: "t", width: 90 },
      { header: "Nom d'usage", key: "n", width: 16 },
      { header: "Brochure", key: "b", width: 10 },
      { header: "Niveau", key: "l", width: 16 },
      { header: "Fiche renseignée", key: "f", width: 16 },
    ],
    conventions.map((c): Row => {
      const m = index[c.idcc];
      return [c.idcc, c.titre, m?.nomUsage ?? "", m?.brochure ?? "", m?.niveau ?? niveauDuTitre(c.titre), m ? "Oui" : "Non"];
    }),
  );
  const buf = await wb.xlsx.writeBuffer();
  telecharger(buf as ArrayBuffer, `ccn-verify-conventions.xlsx`);
}
