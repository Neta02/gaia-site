"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

// ─── Vocabulaire d'animation UNIQUE (défini ici, réutilisé partout) ───
// opacité + translation Y légère, easeOut, reveal une seule fois.
// prefers-reduced-motion est géré globalement par <MotionConfig reducedMotion="user">
// (voir motion-provider) : les transforms sont désactivés, l'opacité reste.
// On ne branche PAS sur useReducedMotion ici : cela produirait un arbre
// serveur/client divergent et donc un mismatch d'hydratation.
const DISTANCE = 20; // px de translation Y (dans 16–24)
const DURATION = 0.6; // s (dans 0.5–0.7)
const EASE = "easeOut" as const;
const STAGGER = 0.1; // s entre enfants (dans 0.08–0.12)
const AMOUNT = 0.3; // fraction visible avant déclenchement

const revealVariants = (distance: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
});

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

type On = "scroll" | "load";

function triggerProps(on: On, amount: number) {
  return on === "load"
    ? ({ initial: "hidden", animate: "visible" } as const)
    : ({
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount },
      } as const);
}

type RevealProps = {
  children?: React.ReactNode;
  className?: string;
  /** fondu pur, sans translation (Y = 0) */
  fade?: boolean;
  /** "scroll" = whileInView once (défaut) ; "load" = à l'entrée */
  on?: On;
  amount?: number;
};

/** Reveal d'un élément (fondu + légère translation Y, une seule fois). */
export function Reveal({
  children,
  className,
  fade = false,
  on = "scroll",
  amount = AMOUNT,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={revealVariants(fade ? 0 : DISTANCE)}
      {...triggerProps(on, amount)}
    >
      {children}
    </motion.div>
  );
}

/** Conteneur de reveal échelonné : ses <StaggerItem> apparaissent en cascade. */
export function Stagger({
  children,
  className,
  on = "scroll",
  amount = AMOUNT,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      {...triggerProps(on, amount)}
    >
      {children}
    </motion.div>
  );
}

/** Enfant d'un <Stagger> (hérite du déclenchement du conteneur). */
export function StaggerItem({ children, className, fade = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={revealVariants(fade ? 0 : DISTANCE)}
    >
      {children}
    </motion.div>
  );
}
