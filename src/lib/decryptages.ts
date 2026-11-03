/** Articles de fond courts, accessibles depuis l'espace outil. */
export interface Decryptage {
  slug: string;
  titre: string;
  accroche: string;
  maj: string;
  sections: { titre: string; paragraphes: string[] }[];
}

export const DECRYPTAGES: Decryptage[] = [
  {
    slug: "quest-ce-quune-convention-collective",
    titre: "Qu'est-ce qu'une convention collective ?",
    accroche:
      "Un accord conclu entre organisations syndicales de salariés et organisations d'employeurs, qui complète le Code du travail pour un secteur donné.",
    maj: "2026-11",
    sections: [
      {
        titre: "Un texte négocié, pas une loi",
        paragraphes: [
          "La convention collective (CC) est un accord conclu entre une ou plusieurs organisations syndicales de salariés représentatives d'un côté et une ou plusieurs organisations professionnelles d'employeurs de l'autre. Elle traite de l'ensemble des conditions d'emploi, de travail et des garanties sociales d'une branche.",
          "Elle ne remplace pas le Code du travail : elle le complète, le plus souvent dans un sens plus favorable aux salariés (maintien de salaire, congés supplémentaires, indemnités de licenciement, prévoyance). Depuis les ordonnances de 2017, certains thèmes restent toutefois réservés à la branche, d'autres à l'accord d'entreprise.",
        ],
      },
      {
        titre: "Étendue ou non étendue",
        paragraphes: [
          "Une convention signée ne s'applique qu'aux entreprises adhérentes des organisations patronales signataires. L'arrêté d'extension du ministère du Travail, publié au Journal officiel, la rend obligatoire pour toutes les entreprises du champ, adhérentes ou non. C'est pourquoi la date d'extension et le J.O. figurent en tête de chaque fiche.",
          "Chaque avenant suit le même chemin : signature, puis extension. Entre les deux, il ne s'applique qu'aux adhérents. Pour la paie, la date qui compte est celle d'application fixée par l'avenant, souvent le premier jour du mois suivant la publication de l'arrêté.",
        ],
      },
      {
        titre: "IDCC et numéro de brochure",
        paragraphes: [
          "L'IDCC (identifiant de convention collective) est le code à quatre chiffres attribué par le ministère. Il est obligatoire en DSN et sur le bulletin de paie. Le numéro de brochure, lui, correspond à la publication aux Journaux officiels (ex. 3018 pour la Syntec). Les deux désignent la même convention ; l'outil accepte l'un ou l'autre.",
        ],
      },
    ],
  },
  {
    slug: "quelle-convention-collective-appliquer",
    titre: "Quelle convention collective appliquer ?",
    accroche: "L'activité principale réelle de l'entreprise décide, pas le code APE ni la convention que le dirigeant préférerait.",
    maj: "2026-11",
    sections: [
      {
        titre: "Le critère : l'activité principale",
        paragraphes: [
          "La convention applicable est celle dont le champ d'application professionnel couvre l'activité principale réellement exercée par l'entreprise. Pour une activité industrielle, on retient l'activité qui occupe le plus de salariés ; pour une activité commerciale, celle qui génère le chiffre d'affaires le plus élevé.",
          "Le code APE (NAF) attribué par l'INSEE n'est qu'une présomption. Il aide à s'orienter, mais le juge regarde l'activité réelle. L'onglet « Champ d'application » de chaque fiche liste les codes NAF visés par le texte, c'est un point de départ, pas une preuve.",
        ],
      },
      {
        titre: "Entreprises à activités multiples",
        paragraphes: [
          "Quand plusieurs activités coexistent, on applique en principe une seule convention, celle de l'activité principale, à tous les salariés. Une convention différente par établissement n'est possible que si les établissements ont une activité autonome et distincte.",
          "L'employeur peut aussi appliquer volontairement une convention plus favorable. Dans ce cas, elle s'impose à lui comme un engagement unilatéral tant qu'il ne l'a pas dénoncé dans les formes.",
        ],
      },
      {
        titre: "Où vérifier",
        paragraphes: [
          "Le bulletin de paie et la DSN doivent mentionner l'IDCC. Le Code du travail numérique propose un outil de recherche par activité, et Légifrance publie l'intégralité des textes (base KALI). Les fiches de cet outil renvoient vers ces sources.",
        ],
      },
    ],
  },
  {
    slug: "maintien-de-salaire-et-ijss",
    titre: "Maintien de salaire, IJSS et prévoyance : qui paie quoi ?",
    accroche: "En cas d'arrêt maladie, trois acteurs se relaient : la Sécurité sociale, l'employeur, puis l'organisme de prévoyance.",
    maj: "2026-11",
    sections: [
      {
        titre: "Trois couches qui s'empilent",
        paragraphes: [
          "La Sécurité sociale verse les indemnités journalières (IJSS) après un délai de carence de trois jours, à hauteur de 50 % du salaire journalier de base plafonné. L'employeur complète ensuite, au titre du maintien légal (loi de mensualisation) ou du maintien conventionnel quand il est plus favorable. Enfin, la prévoyance prend le relais quand le maintien employeur s'arrête.",
          "Le maintien conventionnel se lit en paliers : « 1 mois à 100 % puis 2 mois à 80 % » signifie que l'employeur garantit 100 % du net (ou du brut, selon le texte) pendant un mois, IJSS comprises, puis 80 % pendant deux mois. L'ancienneté requise, la carence et la période de référence changent d'une branche à l'autre : c'est exactement ce que la fiche met en colonnes.",
        ],
      },
      {
        titre: "Ce que la paie doit vérifier",
        paragraphes: [
          "L'ancienneté s'apprécie au premier jour de l'arrêt. Les durées se cumulent sur une période de référence (12 mois glissants, année civile). Le maintien est net ou brut de déductions des IJSS et parfois des prestations de prévoyance. Le non-cadre et le cadre n'ont souvent pas les mêmes paliers. Autant de paramètres à vérifier avant la première absence, pas après.",
        ],
      },
      {
        titre: "Le 1,50 % des cadres",
        paragraphes: [
          "Indépendamment du régime de branche, l'employeur doit cotiser au moins 1,50 % de la tranche A pour la prévoyance des cadres (ANI du 17 novembre 2017, héritier de l'article 7 de la convention AGIRC de 1947), affecté en priorité au risque décès. Cette ligne doit apparaître distinctement sur le bulletin.",
        ],
      },
    ],
  },
];

export function getDecryptage(slug: string): Decryptage | undefined {
  return DECRYPTAGES.find((d) => d.slug === slug);
}
