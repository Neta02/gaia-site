import type { Metadata } from "next";

import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Methode } from "@/components/sections/methode";
import { Avantages } from "@/components/sections/avantages";
import { Equipe } from "@/components/sections/equipe";
import { CtaBloc } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "GAIA | Audit, automatisation et formation IA pour les PME",
  description:
    "GAIA normalise vos processus, les automatise avec des outils sur mesure et forme vos équipes. Audit gratuit de deux heures, premier agent en production en six semaines.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <MarqueeBand />
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
