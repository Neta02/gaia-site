/** Liens externes du site (câblés en sous-tâche 7). */

// URL de production (sans slash final). Surchargeable via NEXT_PUBLIC_SITE_URL
// (utile quand le domaine définitif sera câblé).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaia-site-34h6.vercel.app";

// Prise de rendez-vous (audit gratuit) : tous les CTA rendez-vous pointent ici.
export const CALENDLY_URL = "https://calendly.com/b00823902-essec/30min";

// Attributs communs pour tout lien externe ouvert dans un nouvel onglet.
export const EXTERNAL_LINK = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
