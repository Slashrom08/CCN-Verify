/** Identité produit : un seul endroit à modifier pour renommer le service. */
export const BRAND = {
  name: "CCN Verify",
  wordmark: ["CCN", "Verify"] as const,
  baseline: "Vérification des données conventionnelles",
  tagline: "Vérifiez les données de vos conventions collectives.",
  company: "Katena Solutions",
  companyUrl: "https://katena-solutions.fr",
  contactEmail: "contact@katena-solutions.fr",
  /** Date de la liste officielle des IDCC embarquée (ministère du Travail). */
  idccListDate: "octobre 2024",
} as const;
