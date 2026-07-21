import type { Metadata } from "next";
import { Users, Bot, Check, type LucideIcon } from "lucide-react";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { PropositionValeur } from "@/components/sections/proposition-valeur";
import { Methode } from "@/components/sections/methode";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";

const title = "Conseil et solutions IA | GAIA";
const description =
  "Conseil et solutions IA : audit de vos processus, missions IA in-house et plateforme d'agents IA métiers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gaia-lab" },
  openGraph: { title, description, url: "/gaia-lab", siteName: "GAIA", locale: "fr_FR", type: "website" },
};

type Format = {
  number: string;
  title: string;
  baseline: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

const formats: Format[] = [
  {
    number: "01",
    title: "Missions IA In-House",
    baseline:
      "Des experts GAIA au sein de vos équipes, qui conçoivent et déploient vos projets IA de l'intérieur.",
    description:
      "Un expert GAIA rejoint votre entreprise et travaille au quotidien avec vos équipes : il apprend vos processus, construit vos agents et fait monter vos collaborateurs en compétence.",
    points: [
      "Un expert dédié à votre entreprise",
      "Immergé au quotidien dans vos équipes",
      "De la conception au déploiement des agents",
      "Transfert de compétences en continu",
      "Un interlocuteur unique en direct",
    ],
    icon: Users,
  },
  {
    number: "02",
    title: "GAIA, la plateforme d'agents IA métiers",
    baseline: "Des agents prêts à l'emploi",
    description:
      "Des agents déjà construits pour les tâches qui reviennent dans toutes les PME. Simples à mettre en place, ils font gagner du temps dès les premiers jours.",
    points: [
      "Des agents conçus métier par métier",
      "Déployés et suivis par nos experts",
      "Branchés sur vos logiciels",
      "Conformes RGPD",
      "Des performances mesurées en continu",
    ],
    icon: Bot,
  },
];

export default function GaiaLab() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        {/* Titre de page */}
        <section className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-20 lg:py-24">
          <Stagger on="load" className="mx-auto max-w-3xl text-center">
            <StaggerItem>
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Conseil et solutions IA
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Des agents IA pensés pour votre activité, au service de vos
                équipes.
              </p>
            </StaggerItem>
          </Stagger>
        </section>

        {/* Conseil, audit, stratégie et cas d'usage */}
        <section aria-labelledby="audit-title" className="border-t border-border">
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal className="rounded-2xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="audit-title"
                  className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Vous voulez d&apos;abord y voir clair ?
                </h2>
                <p className="mt-4 text-primary-foreground/80">
                  Nos consultants passent vos processus au crible, identifient
                  les cas d&apos;usage qui comptent vraiment pour vous et vous
                  donnent une trajectoire claire. Vous repartez avec des
                  priorités et un ordre de grandeur, que vous alliez plus loin
                  avec nous ou non.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <a href={CALENDLY_URL} {...EXTERNAL_LINK}>
                      Réserver votre audit gratuit
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Deux formats d'accompagnement */}
        <section
          id="formats"
          aria-labelledby="formats-title"
          className="scroll-mt-20 border-t border-border"
        >
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal>
              <h2
                id="formats-title"
                className="font-display max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Deux formats d&apos;accompagnement
              </h2>
              <p className="mt-6 max-w-3xl text-muted-foreground">
                Un projet mené de bout en bout, ou des agents prêts à
                l&apos;emploi. Selon ce que vous voulez obtenir et à quelle
                vitesse.
              </p>
            </Reveal>

            <Stagger className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {formats.map((f) => (
                <StaggerItem key={f.number} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                        <f.icon
                          className="size-5 text-accent-foreground"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {f.number}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground italic">
                      {f.baseline}
                    </p>
                    <p className="mt-5 text-muted-foreground">{f.description}</p>
                    <ul className="mt-6 space-y-2.5">
                      {f.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm">
                          <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary">
                            <Check
                              className="size-3 text-accent"
                              aria-hidden="true"
                            />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Ce que nous construisons, puis comment */}
        <PropositionValeur />
        <Methode />
      </main>
      <SiteFooter />
    </>
  );
}
