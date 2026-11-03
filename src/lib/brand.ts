/** Identité produit : un seul endroit à modifier pour renommer le service. */
export const BRAND = {
  name: "CCN Verify",
  wordmark: ["CCN", "Verify"] as const,
  baseline: "Conventions collectives, lecture paie",
  tagline: "Les conventions collectives, lues pour la paie et le SIRH.",
  company: "Katena Solutions",
  companyUrl: "https://katena-solutions.fr",
  contactEmail: "contact@katena-solutions.fr",
  /** Date de la liste officielle des IDCC embarquée (ministère du Travail). */
  idccListDate: "octobre 2024",
} as const;
