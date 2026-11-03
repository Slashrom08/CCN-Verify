import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Serif d'affichage (titres), non variable : poids et styles explicites.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Maladie, accident et prévoyance par convention collective`,
  description:
    "Un IDCC, une fiche : maintien de salaire en cas de maladie ou d'accident, prévoyance complémentaire, par statut cadres / non-cadres. À partir des textes publics des conventions collectives.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f4f9] text-slate-900">{children}</body>
    </html>
  );
}
