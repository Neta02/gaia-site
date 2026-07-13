import type { Metadata } from "next";

import { SiteHeader } from "@/components/sections/site-header";

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
        {/* Sections ajoutées au fil des commits (sous-tâche 5) */}
      </main>
    </>
  );
}
