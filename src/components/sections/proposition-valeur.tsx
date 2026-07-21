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
      "Fichiers Excel éparpillés rapatriés dans votre ERP, avec une source unique par donnée",
    ],
    icon: Database,
  },
  {
    number: "02",
    title: "Automatisation des processus",
    description:
      "Les tâches répétitives s'exécutent seules, de bout en bout, sur vos logiciels existants.",
    exemples: [
      "Devis et factures générés et envoyés automatiquement",
      "Relances clients et fournisseurs déclenchées au bon moment",
      "Onboarding d'un client ou d'un salarié orchestré étape par étape",
    ],
    icon: Workflow,
  },
  {
    number: "03",
    title: "Recherche intelligente et accès à la connaissance",
    description:
      "Toute la connaissance de votre entreprise regroupée et interrogeable à tout moment.",
    exemples: [
      "Assistant qui répond à partir de vos documents internes (procédures, contrats, notices)",
      "Assistant qui retrouve la bonne référence ou le bon dossier client en quelques secondes",
    ],
    icon: Search,
  },
  {
    number: "04",
    title: "Prédiction, optimisation et aide à la décision",
    description:
      "Vos données passées éclairent les décisions à venir, et vous permettent d'anticiper plutôt que de subir.",
    exemples: [
      "Prévisions de ventes et de trésorerie pour piloter les commandes",
      "Alertes sur les clients à risque de départ ou les retards fournisseurs",
      "Plannings et tournées optimisés",
    ],
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Produits IA et outils métiers sur mesure",
    description:
      "Quand aucun logiciel du marché ne colle à votre métier, nous le construisons avec vous.",
    exemples: [
      "Un agent qui traite les mails entrants et prépare les réponses",
      "Un outil qui lit vos factures fournisseurs et les saisit dans votre comptabilité",
      "Un générateur de rapports qui met en page vos comptes rendus d'intervention",
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

/** Un étage complet : en-tête, description, exemples concrets, espace démo. */
function PilierBloc({ p }: { p: Pilier }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
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
          <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
        </div>
        <p className="mt-4 text-muted-foreground">{p.description}</p>
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
    </div>
  );
}

export function PropositionValeur() {
  return (
    <section
      id="proposition"
      aria-labelledby="proposition-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <h2
            id="proposition-title"
            className="font-display max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Proposition de valeur
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            Cinq familles de services, du socle de données aux outils sur mesure.
          </p>
        </Reveal>

        {/* Les 5 étages, tous affichés, séparés par un filet. */}
        <div className="mt-12 flex flex-col">
          {piliers.map((p, i) => (
            <Reveal
              key={p.number}
              className={cn(
                "py-10 first:pt-0 last:pb-0",
                i > 0 && "border-t border-border"
              )}
            >
              <PilierBloc p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
