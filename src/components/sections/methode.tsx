import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";
import { publicAsset } from "@/lib/assets";

type Bloc = {
  number: string;
  kicker: string;
  title: string;
  body: string;
  deliverable: string;
  cta: string;
  primary?: boolean;
};

const blocs: Bloc[] = [
  {
    number: "01",
    kicker: "AUDIT & NORMALISATION",
    title: "Comprendre avant de construire.",
    body: "Nous cartographions vos processus réels, identifions ceux où l'effort paie le plus, les optimisons et les numérisons. Un processus normalisé est un processus fiable : la seule fondation sur laquelle une automatisation tient dans le temps. Le point de départ : un audit gratuit de deux heures.",
    deliverable: "un rapport d'audit et vos processus documentés.",
    cta: "Réserver votre audit gratuit",
    primary: true,
  },
  {
    number: "02",
    kicker: "AUTOMATISATION SUR MESURE",
    title: "Des outils construits pour votre façon de travailler.",
    body: "Nous développons des agents et des outils sur mesure, adaptés à vos processus et connectés aux logiciels que vous utilisez déjà. Six semaines entre le début de la mission et le premier agent en production, avec des livrables à chaque étape.",
    deliverable: "le code source et sa documentation.",
    cta: "Discuter des automatisations possibles pour votre entreprise",
  },
  {
    number: "03",
    kicker: "FORMATION DES ÉQUIPES",
    title: "Notre réussite se mesure au jour où vous n'avez plus besoin de nous.",
    body: "Vos équipes apprennent à piloter, corriger et faire évoluer les outils mis en place, avec les meilleures pratiques du moment. L'autonomie n'est pas un supplément : c'est la troisième étape de la méthode.",
    deliverable: "des équipes qui pilotent sans nous.",
    cta: "Former mes équipes",
  },
];

function MethodeBloc({ bloc, reverse }: { bloc: Bloc; reverse: boolean }) {
  const illustration = publicAsset(`illustrations/methode-${bloc.number}.svg`);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <Stagger className={reverse ? "lg:order-2" : undefined}>
        <StaggerItem>
          <div className="flex items-center gap-4">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent font-semibold text-accent-foreground">
              {bloc.number}
            </span>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {bloc.kicker}
            </span>
          </div>
        </StaggerItem>

        <StaggerItem className="mt-5">
          <h3 className="text-2xl font-semibold tracking-tight">{bloc.title}</h3>
        </StaggerItem>

        <StaggerItem className="mt-4">
          <p className="text-muted-foreground">{bloc.body}</p>
        </StaggerItem>

        <StaggerItem className="mt-5">
          <div className="border-l-2 border-accent pl-4">
            <p className="text-sm">
              <span className="font-semibold">Livrable :</span>{" "}
              {bloc.deliverable}
            </p>
          </div>
        </StaggerItem>

        <StaggerItem className="mt-6">
          <Button
            asChild
            variant={bloc.primary ? "default" : "outline"}
            className="h-auto py-2 text-left whitespace-normal"
          >
            <a href={CALENDLY_URL} {...EXTERNAL_LINK}>
              {bloc.cta}
            </a>
          </Button>
        </StaggerItem>
      </Stagger>

      <Reveal fade className={reverse ? "lg:order-1" : undefined}>
        {illustration ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border">
            <Image
              src={illustration}
              alt=""
              aria-hidden="true"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="aspect-[4/3] w-full rounded-xl border border-border bg-muted"
          />
        )}
      </Reveal>
    </div>
  );
}

export function Methode() {
  return (
    <section
      id="methode"
      aria-labelledby="methode-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            LA MÉTHODE
          </p>
          <h2
            id="methode-title"
            className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Vos process d&apos;abord, l&apos;IA ensuite.
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            L&apos;IA générative ne répare pas un processus flou : elle
            l&apos;accélère. Selon la RAND Corporation, plus de 80 % des projets
            d&apos;IA échouent, soit deux fois plus que les projets informatiques
            classiques, et presque toujours pour des raisons d&apos;organisation
            plutôt que de technologie. Notre méthode s&apos;attaque à cette cause
            : une fois vos processus normalisés, ils deviennent automatisables ;
            une fois automatisés, vos équipes en gardent la maîtrise.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {blocs.map((bloc, i) => (
            <MethodeBloc key={bloc.number} bloc={bloc} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
