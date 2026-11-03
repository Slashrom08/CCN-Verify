/** Liens vers les sources publiques d'une convention collective. */

/** Page Légifrance listant les textes de la convention (KALI). */
export function legifranceIdccUrl(idcc: string): string {
  const n = String(Number(idcc));
  return `https://www.legifrance.gouv.fr/liste/idcc?facetteTexteBase=TEXTE_BASE&facetteEtat=VIGUEUR_ETEN&facetteEtat=VIGUEUR_NON_ETEN&idcc=${n}`;
}

/** Recherche plein texte Légifrance sur l'IDCC (repli si la page liste ne répond pas). */
export function legifranceSearchUrl(idcc: string): string {
  return `https://www.legifrance.gouv.fr/search/all?tab_selection=all&searchField=ALL&query=IDCC+${String(Number(idcc))}`;
}

/** Outil « Trouver sa convention collective » du Code du travail numérique. */
export const CODE_TRAVAIL_NUMERIQUE_URL = "https://code.travail.gouv.fr/outils/convention-collective";
