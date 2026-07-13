/** Liens externes du site (câblés en sous-tâche 7). */

// URL de production. Fixée via env au déploiement ; le fallback sera remplacé
// par l'URL .vercel.app définitive (petit commit post-déploiement).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaia-site.vercel.app";

// Prise de rendez-vous (audit gratuit) : tous les CTA rendez-vous pointent ici.
export const CALENDLY_URL = "https://calendly.com/b00823902-essec/30min";

// Attributs communs pour tout lien externe ouvert dans un nouvel onglet.
export const EXTERNAL_LINK = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
