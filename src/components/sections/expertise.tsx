import {
  GraduationCap,
  FlaskConical,
  ArrowRight,
  ImageIcon,
  Check,
  type LucideIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type Format = { lead: string; rest?: string };

type Branche = {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  formats: Format[];
  checklist: string[];
  cta: string;
  icon: LucideIcon;
};

const branches: Branche[] = [
  {
    href: "/formation",
    title: "Formations IA personnalisées",
    subtitle: "Séminaires et montée en compétences",
    description:
      "GAIA forme les entreprises à l'IA à travers des parcours construits sur mesure pour chacune, au plus près de leurs métiers et de leurs priorités de terrain.",
    formats: [
      { lead: "Show IA", rest: "conférence d'acculturation à l'IA générative" },
      {
        lead: "Masterclass dirigeants et CODIR",
        rest: "stratégie IA, ROI, risques et gouvernance, pour vous aider à bâtir votre feuille de route",
      },
      {
        lead: "Ateliers pratiques sur vos cas métiers (RH, finance, ventes, support…)",
        rest: "identifier les usages à plus fort impact et les mettre en pratique",
      },
      { lead: "Formation agents IA", rest: "de l'idée au prototype fonctionnel" },
      {
        lead: "Formation données, sécurité et RGPD",
        rest: "ce qu'on confie à l'IA, et comment garder votre souveraineté",
      },
      {
        lead: "Parcours référents IA",
        rest: "des relais internes qui font vivre les usages de l'IA",
      },
    ],
    checklist: [
      "Construites sur vos cas réels",
      "Experts IA et métiers",
      "Sur vos outils et vos données",
      "Formations 100 % personnalisées",
      "Progression mesurée en fin de formation",
    ],
    cta: "Découvrir nos formations",
    icon: GraduationCap,
  },
  {
    href: "/gaia-lab",
    title: "GAIA Lab",
    subtitle: "Conseil et solutions IA",
    description:
      "Nous concevons et déployons vos solutions IA, de l'audit de vos processus au premier agent en production.",
    formats: [
      {
        lead: "Mission IA In-House",
        rest: "des experts GAIA intégrés à vos équipes, qui conçoivent et mettent en production vos projets IA de l'intérieur",
      },
      { lead: "GAIA", rest: "la plateforme d'IA métiers" },
    ],
    checklist: [
      "Solutions sur-mesure",
      "Déploiement rapide",
      "Formation des équipes incluse",
      "Orientées ROI et performance",
      "Audit d'entrée de deux heures offert",
    ],
    cta: "Découvrir nos solutions",
    icon: FlaskConical,
  },
];

function Carte({ b }: { b: Branche }) {
  return (
    // Carte entièrement cliquable via le lien "stretched" (after:inset-0).
    <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg sm:p-8">
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
      <p className="mt-2 text-sm text-muted-foreground italic">{b.subtitle}</p>

      <p className="mt-5 text-muted-foreground">{b.description}</p>

      <ul className="mt-6 space-y-2.5 text-sm">
        {b.formats.map((f) => (
          <li key={f.lead} className="flex gap-2.5">
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>
              <span className="font-semibold">{f.lead}</span>
              {f.rest ? (
                <span className="text-muted-foreground"> : {f.rest}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm">
        {b.checklist.map((c) => (
          <li key={c} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary">
              <Check className="size-3 text-accent" aria-hidden="true" />
            </span>
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <a
          href={b.href}
          className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors after:absolute after:inset-0 group-hover:bg-primary group-hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {b.cta}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

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

        <Stagger className="mt-14 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {branches.map((b) => (
            <StaggerItem key={b.href} className="h-full">
              <Carte b={b} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
