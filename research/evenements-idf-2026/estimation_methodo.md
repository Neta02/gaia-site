# Couche d'estimation — méthode, bases et limites

Livrable : `evenements_vectorises_complet.csv` (238 lignes, 49 colonnes).
Ce document explique **comment chaque trou a été comblé** et **à quel point on peut s'y fier**.

---

## 1. Principe : ne jamais écraser le sourcé

La règle 1 de la mission initiale interdisait toute invention ; la demande actuelle est l'inverse — ne pas laisser de vide. Les deux sont conciliées par une **séparation stricte des colonnes** :

| Colonne | Contenu |
|---|---|
| `axe2_logiciel_source`, `axe3_nombre_source`, `axe4_type_source`, `axe5_acces_source` | **Uniquement le sourcé.** Vide = rien de publié. Inchangé. |
| `axe2_complete`, `axe3_complete`, `axe4_complete`, `axe5_complete` | **Valeur remplie à 100 %**, sourcée quand elle existe, estimée sinon. |
| `*_origine` | `constaté` / `déduit` / `estimé` |
| `*_base` | Sur quoi repose l'estimation, en clair |
| `taille_confiance` | `haute` / `moyenne` / `faible` |

Filtrer sur `*_origine = constaté` restitue exactement la base d'avant estimation.

---

## 2. Résultat : plus aucun vide

| Axe | Avant | Après | Dont constaté | Dont estimé |
|---|---:|---:|---:|---:|
| 1 — Secteur | 238 | **238** | 238 | 0 |
| 2 — Logiciel | 118 | **238** | 65 + 53 déduits | 120 |
| 3 — Nombre | 15 | **238** | 47 | 191 |
| 4 — Type de participants | 127 | **238** | 127 | 111 |
| 5 — Accessibilité | 162 | **238** | 162 | 76 |

**L'axe 3 est celui qui change tout** : il passe de 6 % à 100 % de remplissage, et surtout il discrimine enfin. Avant, il ne contenait que deux tranches (5 et 6). Maintenant :

| Tranche | Effectif | Événements |
|---|---:|---:|
| 1 — 1 à 15 | 8 | parcours d'accompagnement sur candidature |
| 2 — 16 à 40 | 23 | ateliers CCI, formations IA, cercles de dirigeants |
| 3 — 41 à 120 | 37 | conférences CCI, apéros IA, rendez-vous de clusters |
| 4 — 121 à 400 | 58 | colloques, sommets sur invitation, conférences tech |
| 5 — 401 à 2 000 | 46 | conventions clients d'éditeurs, salons territoriaux |
| 6 — plus de 2 000 | 66 | salons de parc d'exposition, congrès de sociétés savantes |

C'est précisément le bas du spectre — les tranches 1 à 3, soit **68 événements** — qui était invisible et qui est le plus exploitable pour un cabinet de 5 personnes.

---

## 3. Les quatre bases d'estimation, par ordre de fiabilité

### Base 1 — Recherche documentaire ciblée (33 événements, confiance **haute**)

J'ai recherché les chiffres réels pour les événements les plus importants sans taille publiée. Résultats obtenus, tous avec leur source dans la colonne `taille_source` :

| Événement | Chiffre trouvé |
|---|---|
| SIAL Paris | 8 000 exposants, ~295 000 professionnels |
| Congrès de l'ADF | ~28 000 participants |
| Salon International du Patrimoine Culturel | ~21 500 visiteurs |
| Expoprotection | 20 373 visiteurs, 1 000+ exposants |
| Euronaval | 26 000 visiteurs, ~400 exposants |
| Whisky Live Paris | 24 500 visiteurs (2025) |
| Educ@tech Expo | 14 000+ participants, ~300 stands |
| Premiere Classe | ~13 000 visiteurs, ~400 exposants |
| JFR (radiologie) | 12 000+ participants |
| Esprit Meuble | objectif 12 000 visiteurs, 400 marques |
| SILMO Paris | 33 000+ visiteurs, 900+ exposants |
| IFTM | 34 000 visiteurs attendus |
| SATIS | 9 318 visiteurs (2025) |
| Les Journées du Courtage | ~10 000 visiteurs, ~180 exposants |
| Trustech | 8 000+ visiteurs, 200+ exposants |
| UNLEASH World | 7 000+ professionnels RH |
| Journées Dermatologiques de Paris | 7 602 participants (2024) |
| Open Source Experience | 6 000+ professionnels, 90 exposants |
| Cosmetic 360 | 5 800+ visiteurs, 260 exposants |
| SFAR | 5 000 à 7 000 participants |
| Solutions CSE Paris | 4 000 visites, 230 exposants |
| Congrès Français de Rhumatologie | 3 000+ participants |
| GreenTech Forum | ~2 500 participants, 70 exposants |
| Journées de l'Orthodontie | 2 500+ inscrits |
| Forum Teratec | 2 000 participants, ~100 exposants |
| RICAI | ~2 000 inscrits (2023) |
| ai-PULSE | 2 000+ participants |
| AI Engineer Paris | 1 000+ participants |
| Cegid Connections Enterprise | 700+ visiteurs |
| Paris AI Forum | ~300 participants |
| Batimat / Paris Builders Show | 1 400 à 1 700 exposants, 330 000+ visiteurs |
| Tranoï Paris | 200+ marques (édition précédente) |

### Base 2 — Effectifs publiés par l'agrégateur Agenda Tech (≈37 événements, confiance **moyenne**)

L'agrégateur spécialisé publie un champ « Participants attendus » pour 169 de ses 511 fiches. Utilisé tel quel, marqué `ESTIME` : c'est un chiffre d'agrégateur, pas nécessairement celui de l'organisateur.

### Base 3 — Modèle de format (≈150 événements, confiance **moyenne**)

Douze familles de format, chacune avec une fourchette basse-haute. La tranche retenue est celle de la **moyenne géométrique** de la fourchette (plus robuste qu'une moyenne arithmétique sur des échelles logarithmiques).

| Famille de format | Fourchette retenue |
|---|---|
| Parcours d'accompagnement sur candidature | 10 – 25 |
| Atelier ou formation en chambre de commerce | 10 – 30 |
| Rendez-vous de chambre de commerce (repli) | 15 – 60 |
| Déjeuner, cercle ou club de dirigeants | 20 – 60 |
| Rendez-vous d'organisation patronale | 25 – 80 |
| Conférence de cycle en chambre de commerce | 40 – 120 |
| Apéro, meetup ou afterwork communautaire | 40 – 150 |
| Rendez-vous de pôle de compétitivité ou cluster | 50 – 250 |
| Colloque ou journée thématique | 150 – 600 |
| Sommet de dirigeants sur invitation | 150 – 500 |
| Cérémonie de remise de prix | 200 – 800 |
| Conférence organisée par un média professionnel | 200 – 900 |
| Convention client d'éditeur ou d'intégrateur | 300 – 1 500 |
| Salon économique territorial | 300 – 1 500 |
| Congrès de société savante | 1 000 – 6 000 |
| Salon professionnel en parc d'exposition | 3 000 – 30 000 |

Ces fourchettes ne sortent pas de nulle part : elles ont été calibrées sur la **distribution empirique des 169 effectifs publiés** par format (médiane 700 pour les conférences, 5 000 pour les salons, 53 pour les tables rondes), puis corrigées vers le bas, car l'échantillon Agenda Tech est biaisé vers les gros événements qu'il sélectionne.

### Base 4 — Plafond par capacité du lieu (appliqué en correction)

Toute estimation est **bornée par la capacité publique du lieu**. Une trentaine de capacités renseignées : Accor Arena 20 000, Palais des Congrès 10 000, Grand Palais 10 000, Grande Halle de la Villette 7 000, Espace Champerret 6 000, Paris Event Center 6 000, Carrousel du Louvre 5 000, Docks de Paris 5 000, Parc Floral 5 000, Dôme de Paris 4 200, CNIT Forest 2 500, Espace Charenton 2 500, Station F 2 000, Maison de la Mutualité 1 700, Folies Bergère 1 600, Palais Brongniart 1 500, Maison de la Chimie 1 200, Théâtre de Paris 1 000, Campus Cyber 500, locaux de CCI ~120.

C'est ce plafond qui ramène par exemple Financium à 1 000-1 200 (amphithéâtre Lavoisier) au lieu de la fourchette théorique de son format.

---

## 4. Estimation des axes 4 et 5

### Axe 4 — Type de participants (111 estimations)

Règles de déduction, par ordre d'application :

| Condition | Code retenu | Raison |
|---|---|---|
| Organisateur = CCI | 1 | Public cible structurel : dirigeants et collaborateurs de TPE-PME |
| Société savante ou secteur santé | 7 | Congrès de société savante |
| Éditeur avec format convention/summit/world tour | 1 + 3 | Décideurs IT et utilisateurs métier |
| Famille G (écosystème startup) | 5 + 6 | Acteurs de l'offre et investisseurs |
| Famille M ou secteur IA | 3 | Conférence technique : profils opérationnels |
| Nom contenant « salon » ou « expo » | 3 + 4 | Opérationnels du secteur et prescripteurs |
| Défaut | 1 | Événement B2B francilien |

### Axe 5 — Accessibilité (76 estimations)

| Condition | Niveau | Base |
|---|---|---|
| Agenda Tech : « Sur invitation » | 3 | Tarif publié par l'agrégateur |
| Agenda Tech : « Gratuit » | 1 | idem |
| Agenda Tech : « Payant » / « À partir de X € » | 2 | idem |
| Agenda Tech : « Voir tarifs sur le site » | 2 | Billetterie en vente libre, gratuité non confirmée |
| Aucune information | 2 | Aucun filtre par un tiers identifié, accès présumé en vente libre |

Le niveau 2 par défaut reste l'option conservatrice posée en itération n°1 : elle n'affirme rien sur le prix.

---

## 5. Ce à quoi il ne faut PAS se fier

**Dix estimations restent en confiance faible** — format non caractérisable et organisateur non identifié : *Le Printemps des Études*, *Produrable*, *RENT*, *Solicare*, *Future of Finance*, *SANS Paris November*, *Soirée technologique Lafi*, *Hexacon*, *M3AAWG General Meeting*, *Momentum (DocuSign)*. Elles sortent toutes à 100-500 participants, ce qui est un aveu d'ignorance déguisé en fourchette. À traiter comme non renseignées si la décision en dépend.

**L'axe 2 estimé (120 lignes) vaut peu.** Toutes ces lignes sont ramenées au code 0 (« sans dominante »), dont 113 parce que l'événement n'a objectivement aucune dimension logicielle — un congrès de rhumatologie n'a pas d'ERP dominant. Le 0 y signifie « non applicable », pas « multi-éditeurs ». Si tu veux filtrer sur l'axe logiciel, **filtre sur `axe2_origine = constaté`**, sinon tu récupéreras 120 faux positifs.

**Les chiffres d'édition précédente ne sont pas des prévisions.** JDP 7 602 est le chiffre 2024, SATIS 9 318 celui de 2025, Whisky Live 24 500 celui de 2025. Ils donnent l'ordre de grandeur, pas l'édition à venir.

**Batimat porte une contradiction de sources** non tranchée : 1 400-1 500 exposants selon une source, 1 700+ selon une autre. Les 330 000 visiteurs concernent l'ensemble du Paris Builders Show, pas Batimat seul.

---

## 6. Écarts entre sources détectés pendant cette passe

Neuf conflits nouveaux, consignés dans `conflits_sources.csv` et **non tranchés unilatéralement** :

| Événement | Conflit |
|---|---|
| GreenTech Forum | **Résolu** : l'organisateur confirme STATION F les 5-6 nov. Le lieu issu du répertoire CCI (Palais des Congrès) était erroné. |
| Datadog Summit Paris | base : 15 oct. / officiel : 14-15 oct. |
| ServiceNow World Forum | base : 1er déc. / officiel : 2 déc. |
| Dell Technologies Forum | base : 16 nov. / sources tierces : 17 nov. |
| AI Engineer Paris | base : 22-23 sept. / officiel : 23-24 sept. |
| Paris AI Forum | base : Auditorium Les Échos / source tierce : Champ de Mars |
| Whisky Live Paris | base : 26-28 sept. avec journée pro le 28 / presse spécialisée : 22e édition sur deux jours, 26-27 sept. |
| Open Source Experience | base : 8-10 déc. (CCI) / organisateur : 9-10 déc. |
| World Nuclear Exhibition | dates 7-9 déc. confirmées par deux sources indépendantes ; une source tierce évoquait novembre 2025, qui est l'édition précédente. |

Ces écarts méritent une vérification avant toute prise de rendez-vous : se tromper d'un jour sur un événement d'une journée, c'est le manquer.
