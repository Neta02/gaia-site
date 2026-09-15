# Rapport de collecte — Événements professionnels en Île-de-France
**Fenêtre : 15 septembre 2026 → 31 décembre 2026 · Date de consultation de toutes les sources : 2026-09-15**

---

## 1. Chiffres

| | |
|---|---|
| **Événements retenus** | **238** |
| Événements exclus | 146 |
| Événements en `a_surveiller` | 17 |
| Taux de rétention | 62 % (238 / 384 qualifiés) |

### Exclusions par gate

| Gate | Nombre | Part |
|---|---:|---:|
| GATE_3_SOUS_ICP | 66 | 45 % |
| GATE_1_GEOGRAPHIE | 50 | 34 % |
| GATE_2_GRAND_PUBLIC | 30 | 21 % |

### Répartition mensuelle des retenus

| Mois | Nombre |
|---|---:|
| Septembre (à partir du 15) | 66 |
| Octobre | 78 |
| Novembre | 64 |
| Décembre | 30 |

Octobre est le pic. Décembre décroche nettement — en partie réel (trêve de fin d'année), en partie effet d'annonce tardive : c'est le mois où l'agenda associatif se remplit à 4-6 semaines.

### Répartition départementale

| Dép. | Nombre | | Dép. | Nombre |
|---|---:|---|---|---:|
| 75 | 163 | | 78 | 9 |
| 92 | 36 | | 91 | 3 |
| 93 | 10 | | 77 | 2 |
| 95 | 10 | | 94 | 1 |
| | | | non identifié | 4 |

**Paris + Hauts-de-Seine concentrent 84 % de la base.** La grande couronne est très faible : 3 événements en Essonne (tous portés par Genopole), 2 en Seine-et-Marne (Disneyland Paris), 1 dans le Val-de-Marne (Salon Effervescence 94). Ce n'est pas seulement un biais de collecte — l'événementiel professionnel francilien est structurellement parisien — mais le 94 et le 77 méritent une passe dédiée si tu veux couvrir ces territoires.

---

## 2. Rendement par famille de sources (A → M)

| Famille | Sources interrogées | Bruts trouvés | Retenus | Exclus |
|---|---:|---:|---:|---:|
| **A** — Organisateurs et opérateurs de salons | 26 | 133 | **58** | 73 |
| **B** — Sites d'exposition et centres de congrès | 16 | 99 | **18** | 0 |
| **C** — CCI et organisations patronales | 21 | 103 | **62** | 32 |
| **D** — Fédérations et syndicats sectoriels | 17 | 26 | **4** | 9 |
| **E** — Associations professionnelles de fonctions | 16 | 27 | **7** | 10 |
| **F** — Pôles, clusters et réseaux d'innovation | 9 | 15 | **8** | 2 |
| **G** — Écosystème startup et innovation | 8 | 45 | **6** | 15 |
| **H** — Éditeurs de logiciels et intégrateurs | 17 | 180 | **44** | 1 |
| **I** — Médias économiques et professionnels | 14 | 14 | **8** | 2 |
| **J** — Conseil, avocats, banques d'affaires | 9 | 9 | **1** | 1 |
| **K** — Alumni, clubs de dirigeants, cercles | 6 | 1 | **0** | 0 |
| **L** — Agrégateurs et agendas | 5 | *(famille outil)* | *(0 en propre)* | 0 |
| **M** — IA et transformation numérique | 12 | 30 | **22** | 3 |

Les totaux « bruts » ne s'additionnent pas au total général : un même événement est fréquemment trouvé par plusieurs familles et n'est compté qu'une fois après déduplication. La colonne « Retenus » est, elle, exclusive : chaque ligne de la base porte une seule famille de rattachement.

### Lecture

**Trois familles produisent 70 % de la base : C (62), A (58) et H (44).** Ce sont les trois seules qui disposent d'un répertoire structuré et scrapable — le répertoire salons de la CCI Paris IDF, son agenda événements entreprises, et l'agrégateur agenda-tech.com qui publie des données schema.org.

**La famille L n'apporte aucune ligne en propre, par construction.** C'est une famille outil : elle a servi de véhicule de découverte pour A, B, G, H et M. Cinq agrégateurs exploités (CCI Paris IDF, Viparis, Mission French Tech, agenda-tech.com, Expira), jamais en source unique — toute ligne issue d'un agrégateur porte soit une URL officielle, soit l'URL de l'agrégateur quand la donnée y est structurée et attribuée à l'organisateur.

**La famille K est à zéro.** Voir §3.

---

## 3. Familles à couverture faible, et pourquoi

### K — Alumni et clubs de dirigeants : **couverture nulle**
Aucune ligne. Les six sources interrogées (ESCP Alumni, HEC Alumni, ESSEC Alumni, AX, APM, Grand Salon des Grandes Écoles) publient leurs calendriers en JavaScript et/ou derrière une authentification adhérent. Un seul événement a pu être extrait côté serveur sur ESCP Alumni — une soirée à Saint-Étienne, donc hors Île-de-France. L'APM revendique 6 000 dirigeants adhérents : c'est le gisement ICP le plus dense du recensement, et il est totalement invisible. **C'est le trou le plus coûteux de cette collecte.**

### J — Conseil, avocats, banques d'affaires : **1 ligne**
Couverture faible **par nature**, comme anticipé en Phase 0 : la majorité des événements clients de ces cabinets sont sur invitation et jamais publiés. La plateforme evenements.pwc.fr renvoie un blocage automatisé (HTTP 403). Un rendement bas ici n'est pas un signal d'échec de recherche, c'est la réalité du canal.

### E — Associations de fonctions : **couverture partielle**
Les sources les plus prometteuses sont les moins accessibles. L'EBG annonce 120 événements par an avec une catégorie « IA & IAG » explicite : son agenda ne rend **aucun intitulé ni aucune date**, même avec rendu JavaScript. L'ANDRH renvoie « Aucun résultat ». Le CRiP et l'AFJE bloquent en 403. Le CIGREF, le CLUSIF et le CESIN renvoient des 404 sur leurs pages agenda.

### D — Fédérations sectorielles : **couverture partielle**
Sur 17 fédérations interrogées, **8 renvoient une erreur sur leur page agenda** (Syntec 404, SNITEM 404, Union TLF 500, France Supply Chain 404, FFB 404, Procos 404, LEEM injoignable, CroissancePlus 404). Ce n'est pas l'absence d'événements, c'est l'absence d'agenda publié : ces fédérations communiquent par newsletter adhérents.

### G — Incubateurs parisiens : **partielle**
Station F, Paris&Co, Wilco et French Tech Grand Paris n'exposent pas d'agenda scrapable. Les événements Station F captés le sont indirectement, via agenda-tech.

### Cause commune : le serveur MCP Playwright n'a pas pu démarrer
`playwright (ENOENT): "Executable not found in $PATH: cmd"` — le serveur configuré n'a pas démarré dans cet environnement. Sans navigateur pilotable, tout agenda rendu côté client est hors d'atteinte. Le contournement (rendu JavaScript via Apify) fonctionne page par page mais échoue sur les composants de liste chargés en asynchrone (EBG, ANDRH, APM, Station F, Meetup.com). **Relancer ce serveur MCP est le levier n°1 pour combler les familles E, G et K.**

---

## 4. Événements dont la date reste non confirmée

**Aucun.** Les 238 lignes de la base portent une date de début au format AAAA-MM-JJ issue d'une source consultable. Aucune ligne ne porte « date non confirmée ».

Ce n'est pas un hasard de calendrier : la collecte a eu lieu le 15 septembre 2026, soit **après** la publication de la quasi-totalité des agendas d'automne. Les événements dont la date n'était pas publiée n'ont pas été datés à l'estime — ils ont été versés dans `a_surveiller.csv` (17 lignes), conformément à la règle 4.

### En revanche : 4 événements sans département identifié

Ces lignes portent `departement = "non identifié publiquement"` plutôt qu'une valeur inférée :

| Événement | Ce qui manque |
|---|---|
| Programme d'accélération Business (CCI Paris) | Aucun lieu publié par l'organisateur |
| Convention annuelle CPME 2026 (5-6 nov.) | Lieu non publié — **et la convention CPME se tient historiquement en région** : son rattachement à l'IDF n'est pas établi. Ligne à vérifier avant exploitation. |
| Grands Prix de l'Industrie (25 nov.) | Cérémonie sur plateau BFM Business, adresse non publiée |
| RegTech Day 2026 (24 sept.) | Page dédiée de Finance Innovation en 404 |

Et **25 lignes** portent `lieu_nom = "non identifié publiquement"` avec une commune connue — typiquement les événements annonçant « Paris » sans adresse, ou ceux qui communiquent l'adresse aux seuls inscrits.

---

## 5. Écarts entre sources, signalés et non tranchés en silence

Sept conflits ont été détectés en recoupant les sources. Dans chaque cas la source retenue est indiquée **et l'écart est tracé dans la colonne `notes`** de la ligne concernée :

| Événement | Conflit | Arbitrage |
|---|---|---|
| Solutions CSE | CCI : 16-17 **octobre** / Viparis + organisateur : 16-17 **septembre** | Organisateur retenu |
| Red Hat Summit Connect | agenda-tech : 4 nov. / site officiel : **5 nov.** | Site officiel retenu |
| France Digitale Day | agenda-tech porte deux fiches (15 et 16 sept.) | fdday.eu + Eventbrite : **16 sept.** retenu |
| Intelligent Building Systems | CCI : 14-15 oct. / agenda-tech : 13-14 oct. | CCI retenu, écart signalé |
| GreenTech Forum | CCI : 5-6 nov. au Palais des Congrès / agenda-tech : 4-5 nov. à Station F | CCI retenu, écart signalé |
| SATIS | CCI : Docks de Paris (Aubervilliers) / agenda-tech : « Plaine Royale » | CCI retenu, écart signalé |
| InsurDay | vignette agrégateur : 19 nov. / fiche détaillée : **20 nov.** | Fiche détaillée retenue |

Trois erreurs de la source CCI ont par ailleurs été corrigées après vérification : **Renodays** y est classé « ouvert au public » alors qu'il est réservé aux professionnels ; **Salon de la Photo** et **Salon BABY** y sont classés « réservé aux professionnels » alors qu'ils sont grand public.

---

## 6. Zones d'ombre connues

1. **Les formats courts non institutionnels.** Meetups, petits déjeuners éditeurs, afterworks : six communautés IA parisiennes actives ont été identifiées (Paris NLP, MLOps Paris, Paris AI, Generative AI Paris, Machine Learning Paris, Paris AI Developers Group) sans qu'aucune de leurs dates n'ait pu être extraite — meetup.com est intégralement rendu en JavaScript. Le plancher de collecte annoncé en Phase 0 (page publique avec intitulé, date et lieu) exclut de toute façon les annonces LinkedIn sans page dédiée.

2. **Les conventions clients d'éditeurs annoncées par CRM.** La famille H est bien couverte pour les gros éditeurs (SAP, Cegid, Red Hat, Dell, Snowflake, Databricks…) mais les petits déjeuners et user groups d'intégrateurs français (Talan, Micropole, Keyrus, Viseo, Prodware, Absys Cyborg, TVH Consulting) restent invisibles : ils se diffusent par email et LinkedIn.

3. **Une fiche CCI sans intitulé.** Le répertoire CCI Paris IDF porte une fiche datée des 9-10 décembre 2026 au Carreau du Temple, visitorat « réservé aux professionnels », dont le champ titre contient l'identifiant interne `763952` au lieu d'un nom. Impossible à qualifier sans inventer : versée dans `a_surveiller.csv`.

4. **Texcare France.** Le répertoire CCI annonce une plage « du 7 novembre 2026 au 9 novembre 2027 », incohérente. Le salon est biennal et sa dernière édition connue est celle de novembre 2025 (Messe Frankfurt). Aucune édition 2026 confirmée : versée dans `a_surveiller.csv`.

5. **Le 94 et le 77.** Un seul événement identifié dans le Val-de-Marne, deux en Seine-et-Marne. Les agglomérations et CCI territoriales de ces départements n'ont pas été balayées individuellement.

6. **Les arbitrages GATE_3 discutables.** Onze exclusions portent la mention « ARBITRAGE DISCUTABLE » dans leur justification — principalement les forums emploi (où les entreprises sont présentes comme recruteurs) et les salons de professions structurellement TPE (buralistes, commerçants de proximité). La règle appliquée est : **le public annoncé est le critère**, pas la présence d'entreprises comme exposants. Ces lignes sont faciles à rebasculer si tu juges la cible pertinente.

---

## 7. Ce que la base dit, au-delà du comptage

Trois observations qui relèvent du tri, donc de ta décision, mais qui sautent aux yeux en construisant la base :

**La CCI Paris Île-de-France a industrialisé une offre IA pour PME sur la période.** BOOST Camp IA (900 € HT), Boost Agent IA en deux sessions, BOOST CAMP Agents IA, Masterclass IA & Performance (450 € HT), quatre formations « agents IA » à 495 € TTC, Les Rendez-vous de l'IA. C'est à la fois un terrain de prospection dense et un **concurrent direct** installé, avec une marque et un réseau territorial. Chaque ligne concernée porte cette note.

**L'IA est devenue le thème de tête des congrès de professions réglementées.** Les 37es Assises des Commissaires aux Comptes ont pour thème « AI Innovation & Audit ». La Conférence IFACI porte sur les risques IA et cyber. Financium consacre une séquence à « IA et finance ». Les Rencontres de l'Ingénierie programment « l'IA pour la réindustrialisation ». Ce sont des publics de prescripteurs auprès des PME, pas des acheteurs finaux — mais ils sont en demande.

**Huit événements concentrent l'essentiel du volume de dirigeants.** BIG 2026 (75 000 inscrits), EquipHotel (80 000), SMCL (65 672), SIMI (26 052), Tech for Retail (15 000), Big Data & AI Paris (~15 000), NRF Big Show Europe (12 000), Heavent (20 000). Seuls 15 événements sur 238 publient une taille ; les 223 autres portent « non identifié publiquement » plutôt qu'une estimation de confort.
