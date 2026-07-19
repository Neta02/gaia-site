"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

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
 * Les 6 étapes longées par un thermomètre pleine hauteur : le liquide brass
 * descend en continu avec le scroll (ressort fluide, suit la position de
 * lecture dans les deux sens), les badges s'allument au passage, et le bulbe
 * en bas se remplit à l'arrivée sur la dernière étape.
 */
export function MethodeEtapes() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.55", "end 0.55"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const bulb = useTransform(fill, [0.9, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(
      Math.min(etapes.length - 1, Math.max(0, Math.floor(v * etapes.length)))
    );
  });

  return (
    <div className="mt-16 flex gap-5 sm:gap-8 lg:gap-12">
      {/* Thermomètre (décoratif) : tube gradué + bulbe, pleine hauteur du texte */}
      <div aria-hidden="true" className="flex flex-col items-center">
        <div className="relative w-3 flex-1 overflow-hidden rounded-full border border-border bg-background sm:w-3.5">
          {[1, 2, 3, 4, 5].map((g) => (
            <span
              key={g}
              className="absolute inset-x-0 h-px bg-border"
              style={{ top: `${(g * 100) / 6}%` }}
            />
          ))}
          <motion.span
            className="absolute inset-0 origin-top bg-accent"
            style={{ scaleY: fill }}
          />
        </div>
        <div className="relative -mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background sm:size-8">
          <motion.span
            className="absolute inset-1 rounded-full bg-accent"
            style={{ opacity: bulb }}
          />
        </div>
        <span className="mt-2 font-mono text-xs text-muted-foreground">
          {active + 1}/6
        </span>
      </div>

      {/* Les 6 étapes */}
      <div
        ref={stepsRef}
        className="flex max-w-3xl flex-1 flex-col gap-14 sm:gap-16"
      >
        {etapes.map((e, i) => (
          <div key={e.number}>
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
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
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
