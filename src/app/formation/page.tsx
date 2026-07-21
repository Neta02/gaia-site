import type { Metadata } from "next";
import {
  Presentation,
  Compass,
  Target,
  Bot,
  ShieldCheck,
  Users,
  Check,
  type LucideIcon,
} from "lucide-react";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";

const title = "Formations IA personnalisées | GAIA";
const description =
  "Séminaires, ateliers pratiques et formation aux agents IA, construits sur les cas métier de vos équipes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/formation" },
  openGraph: { title, description, url: "/formation", siteName: "GAIA", locale: "fr_FR", type: "website" },
};

type Programme = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const programmes: Programme[] = [
  {
    number: "01",
    title: "Show IA",
    description: "Conférence d'acculturation à l'IA générative.",
    icon: Presentation,
  },
  {
    number: "02",
    title: "Masterclass dirigeants et CODIR",
    description:
      "Stratégie IA, ROI, risques et gouvernance, pour vous aider à bâtir votre feuille de route.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Ateliers pratiques sur vos cas métiers (RH, finance, ventes, support…)",
    description:
      "Identifier les usages à plus fort impact et les mettre en pratique.",
    icon: Target,
  },
  {
    number: "04",
    title: "Formation agents IA",
    description: "De l'idée au prototype fonctionnel.",
    icon: Bot,
  },
  {
    number: "05",
    title: "Formation données, sécurité et RGPD",
    description:
      "Ce qu'on confie à l'IA, et comment garder votre souveraineté.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Parcours référents IA",
    description: "Des relais internes qui font vivre les usages de l'IA.",
    icon: Users,
  },
];

const principes = [
  "Construites sur vos cas réels",
  "Experts IA et métiers",
  "Sur vos outils et vos données",
  "Formations 100 % personnalisées",
  "Progression mesurée en fin de formation",
];

export default function Formation() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        {/* Titre de page */}
        <section className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-20 lg:py-24">
          <Stagger on="load" className="mx-auto max-w-3xl text-center">
            <StaggerItem>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                SÉMINAIRES ET MONTÉE EN COMPÉTENCES
              </p>
            </StaggerItem>
            <StaggerItem className="mt-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Formations IA personnalisées
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                GAIA forme les entreprises à l&apos;IA à travers des parcours
                construits sur mesure pour chacune, au plus près de leurs métiers
                et de leurs priorités de terrain.
              </p>
            </StaggerItem>
          </Stagger>
        </section>

        {/* Les programmes */}
        <section
          id="programmes"
          aria-labelledby="programmes-title"
          className="scroll-mt-20 border-t border-border"
        >
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal>
              <h2
                id="programmes-title"
                className="font-display max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Nos formats
              </h2>
              <p className="mt-6 max-w-3xl text-muted-foreground">
                Une intervention ponctuelle ou un parcours complet. Chaque format
                se construit à partir de vos cas réels.
              </p>
            </Reveal>

            <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
              {programmes.map((p) => (
                <StaggerItem key={p.number} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                        <p.icon
                          className="size-5 text-accent-foreground"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {p.number}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-muted-foreground">{p.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Principes + CTA */}
        <section aria-labelledby="principes-title" className="border-t border-border">
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal className="rounded-2xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="principes-title"
                  className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Construisons votre programme
                </h2>
                <ul className="mt-8 space-y-3 text-left">
                  {principes.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Check
                          className="size-3 text-accent-foreground"
                          aria-hidden="true"
                        />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
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
      </main>
      <SiteFooter />
    </>
  );
}
