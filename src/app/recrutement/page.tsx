import type { Metadata } from "next";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { CandidatureForm } from "@/components/sections/candidature-form";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Recrutement | GAIA",
  description:
    "Rejoignez notre équipe. GAIA construit des outils IA sur mesure pour les PME françaises.",
  alternates: { canonical: "/recrutement" },
};

export default function Recrutement() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <section className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-16 lg:py-20">
          <Stagger on="load" className="mx-auto max-w-2xl text-center">
            <StaggerItem>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                RECRUTEMENT
              </p>
            </StaggerItem>
            <StaggerItem className="mt-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Rejoignez notre équipe.
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <p className="text-lg text-muted-foreground">
                GAIA construit des outils IA sur mesure pour les PME françaises.
                Nous cherchons des profils concrets, curieux et exigeants.
                Remplissez le formulaire, nous vous recontactons.
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal className="mt-12">
            <CandidatureForm />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
