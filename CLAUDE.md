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

## Outillage

- **MCP Playwright = msedge headless sur ce poste.** Le `chrome.exe` headful de
  Chrome-for-Testing ne démarre pas ici (échec d'activation SxS de son assembly
  privé versionné ; non réparable sans droits admin). `.mcp.json` est donc réglé
  sur `--browser msedge --headless` (Edge = moteur Chromium, rendu fidèle). **Sur
  un poste sain, revenir à `--browser chromium`.** Tout changement de `.mcp.json`
  ne prend effet qu'après reconnexion du serveur MCP.

## Design

- **Palette Sovereign :** ink `#10151C`, bone `#ECE6D8`, brass `#C8A24B`. Light =
  fond bone, texte ink, accent brass. Variables `dark` de shadcn conservées, aucun
  toggle dark (hors scope). Preset `radix-nova`. Typo : Geist Sans (corps + UI),
  Fraunces (`--font-display`) pour H1/H2 uniquement.
- **Application typo.** Titres H1/H2 = `.font-display` (Fraunces) ; tout le reste
  en Geist.
- **Règle brass (impérative, toutes sections).** Le brass échoue le contraste AA
  sur le fond bone (**1,93:1**). Le brass n'est **jamais** utilisé en texte sur
  fond bone : il est réservé aux aplats, bordures et rings, et au texte **sur ink
  uniquement** (`accent-foreground = ink`, 7,61:1). Vérifier les contrastes au
  script et signaler tout échec plutôt que d'assombrir la palette.
