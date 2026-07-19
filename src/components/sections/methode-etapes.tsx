"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import { Reveal } from "@/components/motion/reveal";

type Etape = { number: string; title: string; description: string };

const etapes: Etape[] = [
  {
    number: "01",
    title: "Cartographier",
    description:
      "Nous dressons la carte de vos processus réels : qui fait quoi, avec quels outils, où le temps se perd. C'est la matière première de l'audit : on ne peut améliorer que ce que l'on voit.",
  },
  {
    number: "02",
    title: "Connecter",
    description:
      "Nous relions les logiciels que vous utilisez déjà pour que l'information circule sans ressaisie. Vos outils se parlent enfin, sans tout changer d'un coup.",
  },
  {
    number: "03",
    title: "Centraliser et normaliser",
    description:
      "L'information éparpillée est rassemblée en une source fiable, et vos processus deviennent explicites et stables. Un processus normalisé est un processus fiable : la fondation sur laquelle tout le reste tient.",
  },
  {
    number: "04",
    title: "Automatiser",
    description:
      "Les tâches répétitives passent à des outils construits sur mesure, adaptés à votre façon de travailler et connectés à l'existant. Vos équipes se concentrent là où elles ont de la valeur.",
  },
  {
    number: "05",
    title: "Augmenter avec l'IA",
    description:
      "Agents et assistants viennent augmenter vos processus là où l'effort paie le plus. Pas d'IA pour l'IA : elle s'appuie sur des processus déjà solides.",
  },
  {
    number: "06",
    title: "Piloter et améliorer",
    description:
      "Des indicateurs simples pour suivre ce qui tourne, corriger, faire évoluer. Vos équipes sont formées pour piloter sans nous : l'autonomie est la destination.",
  },
];

/**
 * Scrollytelling de la méthode : les étapes défilent, le panneau sticky suit
 * la lecture (illustration du dessus qui glisse et s'efface, pipette qui se
 * remplit d'un cran par étape). Indicateur d'état : il suit le scroll dans les
 * deux sens, contrairement aux reveals de texte qui ne jouent qu'une fois.
 * `images[i]` = asset de l'étape i+1 s'il existe, sinon placeholder sobre.
 */
export function MethodeEtapes({ images }: { images: (string | null)[] }) {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.55", "end 0.55"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(
      Math.min(etapes.length - 1, Math.max(0, Math.floor(v * etapes.length)))
    );
  });

  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Panneau sticky (décoratif) : personnage + pipette graduée */}
      <div
        aria-hidden="true"
        className="sticky top-16 z-30 self-start border-b border-border bg-background pt-3 pb-4 lg:top-24 lg:order-last lg:border-b-0 lg:pt-0 lg:pb-0"
      >
        <div className="flex items-stretch justify-center gap-4 lg:gap-6">
          <div className="relative aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-xl border border-border lg:max-w-[420px]">
            {etapes.map((e, i) => (
              <motion.div
                key={e.number}
                initial={false}
                animate={
                  i < active ? { opacity: 0, y: "-8%" } : { opacity: 1, y: "0%" }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ zIndex: etapes.length - i }}
                className="absolute inset-0"
              >
                {images[i] ? (
                  <Image
                    src={images[i]!}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-muted">
                    <span className="text-6xl font-semibold text-foreground/15">
                      {e.number}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Pipette graduée : le niveau monte d'un cran par étape */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-3 flex-1 overflow-hidden rounded-full border border-border bg-background lg:w-4">
              {[1, 2, 3, 4, 5].map((g) => (
                <span
                  key={g}
                  className="absolute inset-x-0 h-px bg-border"
                  style={{ bottom: `${(g * 100) / 6}%` }}
                />
              ))}
              <span
                className="absolute inset-x-0 bottom-0 bg-accent motion-safe:transition-[height] motion-safe:duration-500"
                style={{ height: `${((active + 1) * 100) / 6}%` }}
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {active + 1}/6
            </span>
          </div>
        </div>
      </div>

      {/* Les 6 étapes */}
      <div ref={stepsRef} className="flex flex-col gap-14 lg:gap-0">
        {etapes.map((e, i) => (
          <div
            key={e.number}
            className="lg:flex lg:min-h-[45vh] lg:flex-col lg:justify-center"
          >
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  className={
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-lg font-semibold transition-colors duration-300 " +
                    (i <= active
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground")
                  }
                >
                  {e.number}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {e.title}
                </h3>
              </div>
              <p className="mt-3 text-muted-foreground">{e.description}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
