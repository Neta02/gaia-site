import Link from "next/link";
import {
  GraduationCap,
  FlaskConical,
  ArrowRight,
  ImageIcon,
  Check,
  type LucideIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type Branche = {
  href: string;
  title: string;
  baseline: string;
  description: string;
  points: string[];
  cta: string;
  icon: LucideIcon;
};

const branches: Branche[] = [
  {
    href: "/formation",
    title: "Formations IA personnalisées",
    baseline: "Séminaires et montée en compétences",
    description:
      "Nous formons vos équipes sur leurs propres cas métier, pour qu'elles utilisent l'IA au quotidien plutôt que d'en entendre parler.",
    points: [
      "Programmes taillés sur vos métiers",
      "Ateliers pratiques sur vos vrais dossiers",
      "De la découverte à l'agent fonctionnel",
    ],
    cta: "Découvrir nos formations",
    icon: GraduationCap,
  },
  {
    href: "/gaia-lab",
    title: "GAIA Lab",
    baseline: "Conseil et solutions IA",
    description:
      "Nous concevons et déployons vos outils IA, de l'audit de vos processus au premier agent en production.",
    points: [
      "Audit et cas d'usage prioritaires",
      "Premier agent en production en six semaines",
      "Vos équipes formées pour piloter",
    ],
    cta: "Découvrir le GAIA Lab",
    icon: FlaskConical,
  },
];

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="expertise-title"
            className="font-display text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Notre expertise
          </h2>
          <p className="mt-6 text-muted-foreground">
            Formation, accompagnement et déploiement de l&apos;intelligence
            artificielle en entreprise.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {branches.map((b) => (
            <StaggerItem key={b.href} className="h-full">
              {/* Toute la carte est cliquable, pas seulement le bouton. */}
              <Link
                href={b.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:p-8"
              >
                {/* Réserve pour un visuel (à fournir) */}
                <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/50">
                  <ImageIcon
                    className="size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <b.icon
                      className="size-5 text-accent-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {b.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground italic">
                  {b.baseline}
                </p>

                <p className="mt-5 text-muted-foreground">{b.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {b.points.map((p) => (
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

                <span className="mt-8 inline-flex items-center gap-2 self-start rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {b.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
