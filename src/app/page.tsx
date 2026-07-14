import type { Metadata } from "next";

import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Confiance } from "@/components/sections/confiance";
import { Methode } from "@/components/sections/methode";
import { Avantages } from "@/components/sections/avantages";
import { Equipe } from "@/components/sections/equipe";
import { CtaBloc } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";

const title = "GAIA | Audit, automatisation et formation IA pour les PME";
const description =
  "GAIA normalise vos processus, les automatise avec des outils sur mesure et forme vos équipes. Audit gratuit de deux heures, premier agent en production en six semaines.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "GAIA",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <Confiance />
        <Methode />
        <Avantages />
        <Equipe />
        <CtaBloc />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
