@AGENTS.md

# Règles de travail — site GAIA

Ces règles s'appliquent à toute contribution sur ce dépôt. Elles priment sur les
habitudes par défaut.

- **(a) Doc à jour avant tout code.** Avant d'écrire du code utilisant l'API d'une
  librairie (Next.js, shadcn, Motion, Tailwind, etc.), vérifier la documentation à
  jour via **context7** (MCP). Ne pas se fier à la mémoire.
- **(b) Composants via le MCP shadcn.** Tout composant shadcn/ui ou Magic UI
  s'ajoute **via le MCP shadcn** (résolution de la commande d'ajout puis exécution
  CLI), jamais réécrit ou recopié à la main.
- **(c) Vérification visuelle par section.** Après chaque section construite, lancer
  le dev server et vérifier le rendu via **Playwright** — screenshot **desktop
  1440px** ET **mobile 390px** — avant de déclarer la section terminée.
- **(d) Plan puis OK.** Pour chaque sous-tâche : présenter d'abord un plan, puis
  n'exécuter qu'après un « OK » explicite de ma part.
- **(e) Aucun contenu inventé.** Le copy (textes, titres, chiffres, noms) vient de
  moi exclusivement. Ne jamais inventer de contenu éditorial.
- **(f) Jamais de push sans accord.** Ne jamais faire de `git push` sans mon accord
  explicite. Les commits locaux sont autorisés dans le cadre d'une sous-tâche.
