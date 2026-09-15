# Vectorisation des 238 événements — méthodologie appliquée et itérations

Grille de référence : `grille-vectorisation-evenements-noezya.md`.
Base vectorisée : `evenements_vectorises.csv` (238 lignes, 24 colonnes d'origine + 13 colonnes de vectorisation).

---

## 1. Gate amont

Le gate région était **déjà appliqué** : la base ne contient que des événements d'Île-de-France stricte (75, 77, 78, 91, 92, 93, 94, 95), et les événements grand public purs étaient déjà sortis en amont dans `exclusions.csv` (30 lignes GATE_2). Aucun événement n'a donc été écarté à ce stade.

**Cela répond au point ouvert n°1 de la grille** : le périmètre retenu est l'**Île-de-France stricte**, pas le bassin parisien élargi. C'est ce qui a fait sortir de la base, entre autres, la Convention USF (Strasbourg), le congrès des notaires (Lille), le congrès HLM (Bordeaux) et Minalogic Robotics & AI (près de Lyon) — ce dernier étant, thématiquement, l'un des mieux alignés du recensement.

**Réserve sur 4 lignes** : `Programme d'accélération Business`, `Convention annuelle CPME 2026`, `Grands Prix de l'Industrie` et `RegTech Day 2026` portent `departement = non identifié publiquement`. Elles ne sont pas démontrées hors région, mais elles ne sont pas démontrées dedans non plus. La convention CPME est le cas le plus douteux : elle se tient historiquement en région. **À trancher avant exploitation.**

---

## 2. Résultat de la vectorisation

| Axe | Renseignés | Vides | Commentaire |
|---|---:|---:|---|
| **1. Secteur** | 238 (100 %) | 0 | 57 lignes en double codage (24 %) |
| **2. Logiciel** | 118 (50 %) | 120 | dont 113 « axe non applicable » |
| **3. Nombre** | 15 (6 %) | 223 | **axe quasi inexploitable, voir §4** |
| **4. Type de participants** | 127 (53 %) | 111 | 30 lignes en double codage |
| **5. Accessibilité** | 162 (68 %) | 76 | dont 84 présumés, voir itération n°1 |

### Distribution axe 1 (secteur)

| Code | Libellé | N |
|---:|---|---:|
| 4 | Tech / IT / Logiciels / Télécom | 96 |
| 16 | IA | 44 |
| 7 | Santé / Pharma / Biotech | 33 |
| 0 | Générique / Transversal | 26 |
| 9 | Services pro / Conseil / Juridique / Comptabilité | 20 |
| 8 | Finance / Banque / Assurance | 13 |
| 2 | Immobilier / Construction / BTP | 12 |
| 3 | Industrie / Auto / Aéro | 10 |
| 11 | Énergie / Environnement | 10 |
| 5 | Commerce / Distribution | 8 |
| 15 | Médias / Communication | 6 |
| 13 | Secteur public | 5 |
| 14 | Hôtellerie / Restauration | 5 |
| 1 | Luxe / Mode / Beauté | 4 |
| 6 | Agroalimentaire | 4 |
| 10 | Transport / Logistique | 3 |
| 12 | Éducation / Formation | 1 |

### Distribution axe 2 (logiciel)

0 (sans dominante) : 42 · 11 (IA/automatisation) : 40 · 9 (Data/BI) : 15 · 10 (Cybersécurité) : 13 · 5 (GED) : 2 · 2 (CRM) : 2 · 4 (RH) : 2 · 3 (Finance) : 1 · 12 (Gestion de projet) : 1.

Les fonctions **ERP (1), Supply Chain (6), E-commerce (7) et PLM (8) ressortent à zéro**. Ce n'est pas un bug de codage : sur la fenêtre, aucun événement francilien ne se positionne publiquement sur ces fonctions comme dominante. Supply Chain Event est codé 9 (Data) parce que son accroche met en avant « l'IA, les mathématiques et la data pour l'optimisation des flux », pas un WMS/TMS.

### Distribution axe 4 (type de participants)

1 (Décideurs PME/ETI) : 54 · 7 (Experts / Associations pro) : 30 · 4 (Prescripteurs) : 28 · 3 (Opérationnels) : 17 · 9 (Institutionnels) : 10 · 5 (Pairs / Offre) : 6 · 8 (Journalistes) : 4 · 6 (Investisseurs) : 4 · 2 (Grands comptes) : 3 · 10 (Étudiants) : 1.

### Distribution axe 5 (accessibilité)

2 (Moyen) : 152 · 3 (Difficile) : 5 · 1 (Facile) : 5 · vide : 76.

---

## 3. Les sept itérations méthodologiques

### Itération n°1 — Axe 5 : que faire quand le prix n'est pas publié ?

**Difficulté.** 87 événements ont un mécanisme d'accès établi (inscription libre, en self-service) mais **aucun prix publié**. Or la frontière 1/2 de la grille est exactement une frontière tarifaire : 1 = « inscription publique gratuite ou symbolique », 2 = « billet payant en vente libre quel que soit le montant ». Coder 1 revient à affirmer que c'est gratuit ; coder 2 revient à affirmer que c'est payant ; laisser vide vide 63 % de l'axe.

**Règle retenue.** Le niveau **1 exige une preuve positive de gratuité**. À défaut, un accès en self-service sans gratuité confirmée est codé **2** — ce qui reste exact au sens de la définition du niveau 2 (« l'accès ne dépend que de vous »), sans rien affirmer sur le prix.

**Traçabilité.** La colonne `axe5_confiance` distingue `confirme` (78 lignes) de `presume_prix_non_publie` (84 lignes). Le biais est donc mesurable et réversible : un salon professionnel à badge gratuit comme Batimat ou EquipHotel est probablement un vrai niveau 1, il est ici en 2 présumé.

### Itération n°2 — Axe 4 : trancher 4 / 7 / 3 sur les professions réglementées

**Difficulté.** Un congrès d'experts-comptables, un congrès de chirurgiens-dentistes et un salon d'installateurs relèvent tous de « une profession se réunit », mais pas de la même case.

**Règle retenue.**
- **4 (Prescripteurs)** quand le métier consiste à conseiller *d'autres* entreprises : experts-comptables, commissaires aux comptes, avocats, notaires, courtiers, ingénierie, bureaux d'études, architectes. Ce sont des **canaux vers l'ICP**, pas la cible finale.
- **7 (Experts / Associations professionnelles)** quand l'événement est un congrès de société savante à contenu scientifique (médecine, chirurgie, psychanalyse).
- **3 (Opérationnels / Utilisateurs métier)** quand le public est utilisateur de produits ou d'outils sans être ni décideur ni canal (installateurs, techniciens, praticiens).

Conséquence lisible : le 81e Congrès des Experts-Comptables est codé **[4, 7]**, le Congrès de l'ADF **[7]**, Batimat **[4, 3]**.

### Itération n°3 — Axe 2 : le 0 n'est pas un fourre-tout

**Difficulté.** La règle 110 interdit d'utiliser le 0 comme valeur de repli. Mais trois situations très différentes s'écrasaient sur « vide » : (a) événement logiciel multi-éditeurs sans fonction dominante, (b) événement sans aucune dimension logicielle, (c) dimension logicielle plausible mais non documentée.

**Règle retenue.** Le **0 est réservé au cas (a)** : l'organisateur positionne bien le logiciel ou le SI comme sujet, mais aucune fonction ne domine. Les cas (b) et (c) restent vides. Une colonne de diagnostic hors grille, `axe2_statut`, les sépare : `code` (65), `code_deduit_axe1` (53), `non_applicable` (113), `non_trouve` (7).

**Règle dérivée.** Un événement codé 16 sur l'axe secteur et sans fonction métier nommée relève du **11 (IA / Automatisation)**, pas du 0 — sa dominante fonctionnelle *est* l'IA. Un événement codé 4 sans fonction nommée relève du 0.

### Itération n°4 — Axe 1 : périmètre de déclenchement du code 16

**Difficulté.** Une détection de l'IA sur l'ensemble du descriptif codait 66 événements en 16, dont des salons tech généralistes où l'IA n'est qu'un thème du programme. La règle 35 dit l'inverse : 16 seulement quand l'IA est *le sujet même*.

**Règle retenue.** Le code 16 ne se déclenche que sur une mention d'IA dans le **titre**, dans le **secteur déclaré** par l'organisateur, ou dans les **60 premiers caractères de l'accroche**. Jamais dans le corps du descriptif. Résultat : 44 événements en 16.

**Cas limite assumé et non forcé.** *Tech for Retail* annonce « IA agentique » dans son programme 2026 mais en énumération, après le positionnement retail. Il est codé **[4, 5]** et non [16, 5]. C'est conforme à la règle 35, au prix d'un raté possible au sens de la règle 37. Si tu veux l'inverse, c'est un arbitrage à trancher, pas un bug.

### Itération n°5 — Axe 5 : « réservé aux adhérents » n'est pas un niveau 3

**Difficulté.** J'avais d'abord codé 3 tous les événements d'organisations patronales et de fédérations marqués « réservé adhérents » — 22 lignes.

**Correction.** La grille range explicitement l'**adhésion payante ouverte** au niveau 2 (« l'accès ne dépend que de vous »). Le niveau 3 exige la décision d'un tiers. Adhérer à la CPME, à la FNAIM, à Systematic ou à Genopole ne dépend que de vous.

**Règle retenue.** « Réservé adhérents » → **2**, sauf mention explicite de cooptation, de parrainage ou de comité d'admission → 3. Après correction, le niveau 3 ne compte plus que **5 lignes**, toutes à décision de tiers avérée : Mondial de l'Auto (journée presse sur accréditation), Architect@Work (sur invitation), Paris Automotive Summit, Grands Prix de l'Industrie (plateau TV), Prix EY (cérémonie sur invitation).

### Itération n°7 — Axe 1 : l'accroche n'ouvre jamais droit à une verticale

**Difficulté.** *BOOST Camp IA* sortait codé **[16, 2]** — secteur Immobilier/BTP — parce que son accroche dit « **construction** d'un plan d'action IA ». Même mécanique de faux positif ailleurs sur des mots polysémiques.

**Règle retenue.** Quand le code 16 est déclenché, la verticale qui l'accompagne ne peut provenir que du **titre ou du secteur déclaré**, jamais de l'accroche. Et si l'organisateur déclare « tous secteurs », le 16 reste seul. Le double codage passe de 63 à 57 lignes.

### Itération n°6 — Axe 2 : la fonction métier prime sur la couche technologique

**Difficulté.** L'axe 2 est déclaré « volontairement fonctionnel » (règle 55). Or l'IA est une couche technologique qui traverse toutes les fonctions : un atelier « Pilotez votre CRM à l'aide de l'IA » était codé 11 alors que sa fonction est le CRM.

**Règle retenue.** Quand une fonction métier est nommée (ERP, CRM, finance, RH, GED, supply chain, e-commerce, PLM, data, cyber, gestion de projet), **elle prime**. Le 11 ne gagne qu'à défaut de fonction nommée. Cet atelier est désormais codé **2 (CRM)**.

---

## 4. Ce que la vectorisation révèle sur la grille elle-même

### L'axe 3 est inexploitable sur cette base

**15 événements sur 238 publient une taille**, soit 6 %. Et ces 15 se concentrent sur deux tranches seulement : 13 en tranche 6 (>2000) et 2 en tranche 5 (401-2000). Les tranches 1 à 4 — c'est-à-dire **tout le format restreint, qui est précisément le plus intéressant pour un cabinet de 5 personnes** — sont vides.

La règle anti-estimation de la grille est respectée, mais son coût est ici maximal : l'axe ne discrimine rien. Trois options, qui t'appartiennent :
1. accepter que l'axe ne serve qu'à isoler les méga-salons ;
2. autoriser une estimation explicitement marquée (capacité du lieu, édition précédente), au prix d'une entorse à la règle 68 ;
3. renseigner l'axe à la main sur un sous-ensemble ciblé plutôt que sur toute la base.

### L'axe 4 est à moitié vide, et ce n'est pas rattrapable par recherche

111 événements ne déclarent pas leur public. La règle de dominance (109) interdit de le déduire de qui pèse dans la salle, et la règle 111 interdit d'inventer. Pour les remplir il faudrait lire le programme détaillé de chacun — c'est le « difficile » annoncé dans la grille elle-même, et ça se vérifie.

### Le double codage reste rare, comme voulu

57 lignes sur 238 en double sur l'axe secteur (24 %), 30 sur l'axe participants (13 %). La règle 108 (« la deuxième valeur n'est pas un champ à remplir ») est tenue. Un premier passage trop permissif produisait 55 % de double codage : il a fallu restreindre la dominance au **titre et au secteur déclaré**, l'accroche n'ouvrant jamais droit à une deuxième valeur.

### Une corrélation attendue se vérifie, l'autre non

- **Secteur × logiciel qui se recoupent** : oui, massivement sur le couple 16/11 — 40 événements cumulent secteur IA et logiciel IA. C'est le signal fort annoncé par la grille.
- **Taille inverse à l'accessibilité** : **invérifiable ici**, faute de données de taille. Les 5 niveaux 3 n'ont aucune taille renseignée.

### Un artefact de source à connaître

Le répertoire de la CCI Paris IDF utilise des libellés de rubrique composites qui ne reflètent pas le positionnement des organisateurs — « Informatique, télécommunications, audiovisuel et multimédia » créait un faux secteur *Médias* sur Big Data & AI Paris, TechSolutions, Tech Show Paris, Trustech et Open Source Experience. Ces libellés sont normalisés avant codage. Même logique pour « Formation numérique : … » en tête de titre, qui est un **format** d'événement et non un secteur Éducation.

---

## 5. Points ouverts de la grille : où j'en suis

| Point ouvert | État |
|---|---|
| **1. Périmètre du gate région** | **Répondu de fait** : Île-de-France stricte (75-95). 4 lignes restent à départager (§1). |
| **2. Entrée 7 élargie aux « intervenants potentiels »** | **Non tranché, et non bloquant ici** : je n'ai codé 7 que sur des sociétés savantes et des associations professionnelles. Aucune ligne ne repose sur l'extension « intervenants potentiels ». Tu peux confirmer ou corriger l'entrée sans rien recoder. |
| **3. Objectifs réseau (prospection, partenariats, visibilité)** | Hors périmètre de la vectorisation, comme indiqué dans la grille. |

---

## 6. Colonnes ajoutées au CSV

| Colonne | Contenu |
|---|---|
| `axe1_secteur` / `axe1_secteur_libelle` | codes séparés par `\|`, 1 ou 2 valeurs |
| `axe2_logiciel` / `axe2_logiciel_libelle` | valeur unique ou vide |
| `axe3_nombre_participants` / `axe3_tranche_libelle` | tranche 1-6 ou vide |
| `axe4_type_participants` / `axe4_type_libelle` | codes séparés par `\|`, 1 ou 2 valeurs |
| `axe5_accessibilite` / `axe5_accessibilite_libelle` | 1-3 ou vide |
| `vecteur` | lecture compacte, ex. `S:16\|4 L:11 N:6 P:1 A:2` |
| `axe2_statut` | **hors grille**, diagnostic : `code` / `code_deduit_axe1` / `non_applicable` / `non_trouve` |
| `axe5_confiance` | **hors grille**, diagnostic : `confirme` / `presume_prix_non_publie` |

Les deux colonnes de diagnostic ne font pas partie de la grille : elles servent à mesurer la qualité du remplissage sans polluer les axes. Elles se suppriment sans rien casser.
