"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Database,
  Workflow,
  Search,
  TrendingUp,
  Wrench,
  Play,
  Check,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Pilier = {
  number: string;
  title: string;
  description: string;
  exemples: string[];
  icon: LucideIcon;
  /** URL d'embed (vidéo, outil interactif) à brancher quand la démo existe. */
  demo?: string;
};

const piliers: Pilier[] = [
  {
    number: "01",
    title: "Infrastructure et unification des données",
    description:
      "Vos données éparpillées (fichiers, mails, logiciels) deviennent une base propre, structurée et accessible.",
    exemples: [
      "Référentiel client unique réunissant CRM, facturation et échanges mails",
      "Catalogues, tarifs et stocks synchronisés entre vos outils",
      "Tableaux de bord alimentés automatiquement, sans ressaisie Excel",
    ],
    icon: Database,
  },
  {
    number: "02",
    title: "Automatisation et orchestration des processus",
    description:
      "Les tâches répétitives s'exécutent seules, de bout en bout, sur vos logiciels existants.",
    exemples: [
      "Devis et factures générés et envoyés depuis vos modèles",
      "Relances clients et fournisseurs déclenchées au bon moment",
      "Onboarding d'un client ou d'un salarié orchestré étape par étape",
    ],
    icon: Workflow,
  },
  {
    number: "03",
    title: "Recherche intelligente et accès à la connaissance",
    description:
      "Toute la connaissance de l'entreprise interrogeable en langage naturel, comme un collègue qui aurait tout lu.",
    exemples: [
      "Assistant qui répond à partir de vos documents internes (procédures, contrats, notices)",
      "La bonne référence ou le bon précédent client retrouvé en quelques secondes",
      "Nouveaux arrivants autonomes plus vite, sans solliciter toute l'équipe",
    ],
    icon: Search,
  },
  {
    number: "04",
    title: "Prédiction, optimisation et aide à la décision",
    description:
      "Vos données passées éclairent les décisions à venir : anticiper plutôt que subir.",
    exemples: [
      "Prévisions de ventes et de trésorerie pour piloter les commandes",
      "Alertes sur les clients à risque de départ ou les retards fournisseurs",
      "Plannings et tournées optimisés selon la charge réelle",
    ],
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Produits IA et outils métiers sur mesure",
    description:
      "Quand aucun logiciel du marché ne colle à votre métier, nous le construisons avec vous.",
    exemples: [
      "Agent qui traite les demandes entrantes (mails, formulaires) et prépare les réponses",
      "Outil de chiffrage qui applique vos règles métier",
      "Interface simple taillée pour votre atelier, votre cabinet ou votre agence",
    ],
    icon: Wrench,
  },
];

/** Espace réservé à la démo de l'étage (vidéo/embed branché plus tard). */
function EspaceDemo({ p }: { p: Pilier }) {
  if (p.demo) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
        <iframe
          src={p.demo}
          title={`Démo : ${p.title}`}
          className="size-full"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/50">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary">
        <Play className="size-4 text-accent" aria-hidden="true" />
      </span>
      <span className="text-xs text-muted-foreground">Démo</span>
    </div>
  );
}

/** Contenu détaillé d'un étage : description, exemples concrets, espace démo. */
function PilierPanel({ p, layout }: { p: Pilier; layout: "desktop" | "mobile" }) {
  return (
    <motion.div
      key={p.number}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "gap-8",
        layout === "desktop" ? "grid xl:grid-cols-[1fr_320px]" : "grid"
      )}
    >
      <div>
        {layout === "desktop" && (
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
              <p.icon className="size-5 text-accent-foreground" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
          </div>
        )}
        <p className={cn("text-muted-foreground", layout === "desktop" && "mt-4")}>
          {p.description}
        </p>
        <p className="mt-5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Exemples concrets :
        </p>
        <ul className="mt-3 space-y-2.5">
          {p.exemples.map((ex) => (
            <li key={ex} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="size-3 text-accent" aria-hidden="true" />
              </span>
              {ex}
            </li>
          ))}
        </ul>
      </div>
      <EspaceDemo p={p} />
    </motion.div>
  );
}

export function PropositionValeur() {
  const [active, setActive] = useState(0);
  const actif = piliers[active];

  return (
    <section
      id="proposition"
      aria-labelledby="proposition-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            PROPOSITION DE VALEUR
          </p>
          <h2
            id="proposition-title"
            className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            L&apos;IA utile, étage par étage.
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            Cinq familles de services, du socle de données aux outils sur mesure.
            Chaque étage s&apos;appuie sur le précédent.
          </p>
        </Reveal>

        {/* Desktop : immeuble (01 en bas) + panneau de l'étage actif */}
        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          <div
            aria-label="Choisir un étage"
            className="flex flex-col-reverse items-center gap-2 self-start"
          >
            {piliers.map((p, i) => (
              <motion.button
                key={p.number}
                type="button"
                onClick={() => setActive(i)}
                aria-current={active === i ? "true" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                style={{ width: `${100 - i * 4}%` }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-colors duration-300",
                  active === i
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                )}
              >
                <span className="font-mono text-xs">{p.number}</span>
                <p.icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{p.title}</span>
              </motion.button>
            ))}
          </div>

          <div className="lg:min-h-[320px]">
            <PilierPanel p={actif} layout="desktop" />
          </div>
        </div>

        {/* Mobile : liste 01 à 05 en accordéon, premier étage ouvert */}
        <div className="mt-10 flex flex-col gap-2 lg:hidden">
          {piliers.map((p, i) => (
            <div key={p.number}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={active === i}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-colors duration-300",
                  active === i
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <span className="font-mono text-xs">{p.number}</span>
                <p.icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{p.title}</span>
              </button>
              {active === i && (
                <div className="px-1 py-6">
                  <PilierPanel p={p} layout="mobile" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
