"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";

/**
 * Politique globale d'animation : reducedMotion="user" respecte
 * prefers-reduced-motion (défaut Motion = "never"). Transition par défaut =
 * le vocabulaire unique (0.6s, easeOut). MotionConfig n'ajoute aucun DOM.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: "easeOut" }}>
      {children}
    </MotionConfig>
  );
}
