# -*- coding: utf-8 -*-
"""Vectorisation des événements Noezya sur 5 axes. Voir methodo_vectorisation.md."""
import json,re,unicodedata
NI='non identifié publiquement'
def n(s): return unicodedata.normalize('NFKD',(s or '')).encode('ascii','ignore').decode().lower()

# ---------------- AXE 1 : SECTEUR (0-16, max 2) ----------------
SEC=[ # (code, regex) — ordre = priorité de dominance
 (16, r'\bia\b|intelligence artificielle|\bai\b|genai|\bllm\b|machine learning|agents? ia|agentique|neurips|deep tech'),
 (1,  r'mode|textile|habillement|chaussure|maroquinerie|luxe|cosmetique|parfumerie|beaute|coiffure|pret-a-porter|joaillerie|lunetterie|optique'),
 (2,  r'batiment|construction|btp|immobilier|travaux publics|renovation|architect|copropriete|proptech|ameublement|amenagement|second oeuvre|habitat|urbanis'),
 (3,  r'industrie|manufactur|automobile|aeronautique|naval|spatial|defense|mecanique|emballage|metallurgie|reindustrialisation|robotique|embedded'),
 (4,  r'informatique|numerique|telecom|cloud|cyber|logiciel|\bit\b|\btech\b|open source|data cent|devops|saas|souverainete numerique|\bapi\b'),
 (5,  r'retail|commerce|distribution|e-commerce|ecommerce|vente|franchise|buraliste|grande conso|point de vente'),
 (6,  r'alimentation|agroalimentaire|agricult|\bfood\b|boisson|spiritueux|chocolat|vigneron'),
 (7,  r'sante|medecine|silver econom|grand age|services a la personne|vie sociale|medical|pharma|biotech|medtech|dentaire|radiolog|urolog|rhumatolog|dermatolog|orthoped|reeducation|medico-social|genomique|anesthesie|infectiolog|gyneco|psychanalyse|autisme|arthroscopie|puericulture'),
 (8,  r'\bfinanc\w*|banque|bancaire|assurance|fintech|courtage|courtier|paiement|tresorerie|regtech|insurtech|capital-risque|epargne'),
 (9,  r'juridique|\bdroit\b|avocat|comptab|audit|conseil|legaltech|compliance|conformite|expertise comptable|ingenierie|notaire|etudes\b|transmission|cession'),
 (10, r'supply chain|logistique|transport|\bwms\b|\btms\b|flux|fret|approvisionnement'),
 (11, r'energie|environnement|eolien|solaire|nucleaire|\beau\b|\brse\b|developpement durable|decarbonation|greentech|climat|transition ecologique|photovolt'),
 (12, r'education|edtech|pedagogi|enseignement|scolaire|universit|alternance|formation (?:initiale|continue|professionnelle)|organisme de formation'),
 (13, r'collectivite|secteur public|maires|territorial|achat public|institution|elus|commande publique|solidarites'),
 (14, r'hotellerie|restauration|tourisme|\bchr\b|voyage|hospitality|street food'),
 (15, r'\bmedias?\b|(?<!tele)communication|publicite|audiovisuel|broadcast|evenementiel|\bculture\b|culturel|patrimoine|spectacle|\bmarketing\b|photograph|journalis|\bedition de\b'),
]
GENERIQUE=r'tous secteurs|interprofession|multisector|transversal'
IA_STRICT=r'intelligence artificielle|\bIA\b|(?<![A-Z])AI\b|\bAI\b|\bA\.I\.|GenAI|\bLLM\b|machine learning|agentique|agents? IA|NeurIPS|\bdata science\b|\bIAG\b'
CCI_COMPOSITE={
 'informatique, telecommunications, audiovisuel et multimedia':'informatique numerique',
 'art graphique, publicite, communication, techniques de communication':'communication publicite',
 'commerce, relations internationales et services aux entreprises (voyages d\'affaires et de stimulation, etc.)':'commerce services aux entreprises',
}
def _sec_declare(e):
    """Le repertoire CCI utilise des libelles de rubrique composites qui ne refletent pas
    le positionnement de l'organisateur (ex : 'audiovisuel et multimedia' accole a 'informatique').
    On les normalise pour eviter des secteurs fantomes."""
    v=n(e['secteurs_apparents'])
    return CCI_COMPOSITE.get(v,v)
def axe1(e):
    """Dominance (regle 109) : seul le titre et le secteur declare par l'organisateur
    ouvrent droit a un code. L'accroche ne sert qu'a defaut, et jamais pour un 2e code."""
    # Iteration n4 : l'axe 16 exige que l'IA soit le SUJET (regle 35), pas un theme parmi d'autres.
    # Perimetre de declenchement = titre + secteur declare + amorce d'accroche (60 premiers caracteres),
    # jamais le corps de l'accroche ni un theme logiciel deduit.
    titre_raw=e['nom_evenement']+' | '+e['secteurs_apparents']+' | '+e['description_courte'][:60]  # casse conservee
    fort=n(e['nom_evenement'])+' | '+_sec_declare(e)
    faible=n(e['description_courte'])
    strong=[c for c,rx in SEC if re.search(rx,fort)]
    weak=[c for c,rx in SEC if c not in strong and re.search(rx,faible)]
    # Axe 16 : ne se declenche que sur une mention explicite d'IA dans le titre,
    # le secteur declare ou le theme logiciel (regle : l'IA doit etre le sujet, pas un theme parmi d'autres).
    ia = bool(re.search(IA_STRICT,titre_raw))
    strong=[c for c in strong if c!=16]; weak=[c for c in weak if c!=16]
    if ia:
        # la verticale accompagnant le 16 ne peut venir que du titre ou du secteur declare,
        # jamais de l'accroche (sinon 'construction d'un plan d'action IA' cree un secteur BTP)
        if re.search(GENERIQUE,_sec_declare(e)): return [16]
        vert=[c for c in strong if c!=4] or [c for c in strong if c==4]
        return [16]+vert[:1] if vert else [16]
    tit=n(e['nom_evenement'])
    in_titre=[c for c,rx in SEC if c!=16 and re.search(rx,tit)]
    # Quand l'organisateur ecrit lui-meme "tous secteurs", c'est sa dominance declaree : elle prime
    # sur un mot du titre qui n'est souvent qu'un nom de marque (Financium, BIG, Boost...).
    if re.search(GENERIQUE,n(e['secteurs_apparents'])): return [0]
    if in_titre:
        autres=[c for c in strong if c not in in_titre]
        if len(in_titre)>=2 and _deux_mis_en_avant(e,in_titre[:2]): return in_titre[:2]
        return [in_titre[0]]+(autres[:1] if autres and _deux_mis_en_avant(e,[in_titre[0],autres[0]]) else [])
    if strong: return strong[:2] if len(strong)>=2 and _deux_mis_en_avant(e,strong[:2]) else strong[:1]
    if re.search(GENERIQUE,fort+' '+faible): return [0]
    if weak: return weak[:1]
    # Libelle de fonction sans verticale (RH, commercial, gouvernance, international, networking...) :
    # l'evenement est transversal, ce qui est la definition du 0 — pas une absence de donnee.
    if re.search(r'\brh\b|recrutement|commercial|gouvernance|international|networking|prevention|developpement d.entreprise|mobilite|flottes',_sec_declare(e)):
        return [0]
    return []
def _deux_mis_en_avant(e,codes):
    """Regle 108 : 2e valeur seulement si l'organisateur met reellement les deux en avant,
    c'est-a-dire si chacun des deux secteurs est present dans le titre OU le secteur declare."""
    tit=n(e['nom_evenement'])
    d=dict(SEC)
    return all(re.search(d[c],tit) or re.search(d[c],_sec_declare(e)) for c in codes)

# ---------------- AXE 2 : LOGICIEL (0-12, valeur unique) ----------------
LOG_IA=(11, r'agents? ia|intelligence artificielle appliqu|ia generative|genai|automatisation|no-code|low-code|industrialisent l.ia|ia agentique|ia et |ia appliquee|\bia\b.{0,30}(performance|entreprise|metier|production)')
LOG=[
 (10, r'cybersecurite|cyber\b|securite des|securite du|rssi|appsec'),
 (9,  r'\bdata\b|\bbi\b|analytics|big data|data science|donnee|datavis|decisionnel'),
 (8,  r'\bplm\b|\bcao\b|simulation|conception|calcul haute performance|\bhpc\b|jumeau numerique|ingenierie numerique'),
 (7,  r'e-commerce|ecommerce|marketplace|commerce unifie|omnicanal|commerce digital'),
 (6,  r'supply chain|\bwms\b|\btms\b|achats|logistique|optimisation des flux|e-procurement'),
 (5,  r'\bged\b|dematerialisation|documentaire|gestion de contenu'),
 (4,  r'\bsirh\b|\brh\b|paie|recrutement|talent|gestion des talents'),
 (3,  r'facturation|comptab|tresorerie|finance d.entreprise|\bdaf\b|fiscal|reglementaire financier'),
 (2,  r'\bcrm\b|relation client|fidelisation|force de vente|sales enablement'),
 (1,  r'\berp\b|gestion integree|progiciel de gestion'),
 (12, r'gestion de projet|collaboratif|agilite|agile\b|product management'),
 LOG_IA,
]
MULTI=r'multi-editeur|toutes les applications|erp, crm|erp.{0,10}crm|bouquet|plusieurs solutions|sans dominante'
def axe2(e):
    tl=e['theme_logiciel_apparent']
    src=n(' | '.join([e['nom_evenement'],tl,e['description_courte'],e['secteurs_apparents']]))
    if tl in ('',NI):
        # pas de dimension logicielle déclarée par l'organisateur
        if re.search(r'informatique|numerique|logiciel|\bit\b|\btech\b|editeur|saas|cloud|digital',src):
            hits=[c for c,rx in LOG if re.search(rx,src)]
            if len(hits)>=3: return 0,'code'
            if len(hits)==1: return hits[0],'code'
            if len(hits)>1: return hits[0],'code'
            return '','non_trouve'
        return '','non_applicable'
    t=n(tl)
    if re.search(MULTI,t) or sum(1 for c,rx in LOG if re.search(rx,t))>=4: return 0,'code'
    for c,rx in LOG:
        if re.search(rx,t): return c,'code'
    return '','non_trouve'

# ---------------- AXE 3 : NOMBRE (1-6, ordinal) ----------------
def axe3(e):
    s=e['taille_annoncee']
    if s in ('',NI): return ''
    nums=[int(x.replace(' ','').replace(' ','')) for x in re.findall(r'(\d[\d   ]{0,9})',s.replace('+',''))]
    vis=re.search(r'([\d   ]{2,9})\s*(?:visiteurs|participants|congressistes|inscrits|professionnels|executives|decideurs|c-level)',n(s))
    v=int(vis.group(1).replace(' ','').replace(' ','')) if vis else (max(nums) if nums else None)
    if v is None: return ''
    for lo,hi,code in [(1,15,1),(16,40,2),(41,120,3),(121,400,4),(401,2000,5)]:
        if lo<=v<=hi: return code
    return 6

# ---------------- AXE 4 : TYPE DE PARTICIPANTS (1-10, max 2) ----------------
PART=[
 (9,  r'\belus?\b|maires|collectivite|decideurs publics|acheteurs publics|secteur public|institutionnel|territorial'),
 (6,  r'investisseur|\bvc\b|business angel|fonds|capital-risque'),
 (4,  r'prescripteur|integrateur|consultant|experts?-comptables|commissaires aux comptes|avocat|courtier|bureaux d.etudes|architecte|conseils?\b|partenaire|revendeur|distributeur'),
 (2,  r'grands comptes|grandes entreprises|c-level|executives|comite executif|\bcac ?40\b|multinational'),
 (1,  r'decideur|dirigeant|\bpme\b|\beti\b|\btpe\b|\bdaf\b|\bdsi\b|\bdrh\b|\bcdo\b|\bcto\b|directeur|direction metier|chef d.entreprise|entrepreneur|patron|responsable operationnel|head of'),
 (5,  r'fournisseurs? de solutions|editeurs?\b|exposants|acteurs de l.offre|startups?\b|scale-?up'),
 (7,  r'societe savante|chercheur|scientifique|expert|association professionnelle|universitaire|praticien de sante|profession (?:dentaire|medicale)'),
 (3,  r'operationnel|\butilisateurs?\b|utilisateur metier|installateur|artisan|technicien|collaborateur|professionnels? de (?:la |l.|sante|l.optique|la reeducation|l.orthopedie)'),
 (8,  r'journaliste|\bpresse\b|\bmedias?\b'),
 (10, r'etudiant|jeune diplome|ecole|lyceen'),
]
SAVANTE=r'congres|societe francaise|societe savante|journees (?:francophones|de l|nationales)|colloque|assises|rencontres scientifiques'
SANTE=r'sante|medecine|medical|dentaire|radiolog|urolog|rhumatolog|dermatolog|orthoped|anesthesie|infectiolog|gyneco|psychanalyse|autisme|arthroscopie|reeducation'
PRESCRIPT=r'expert-comptable|experts-comptables|commissaires aux comptes|avocat|notaire|juriste|courtier|ingenierie|bureaux d.etudes|architecte|conseil'
def axe4(e):
    pc=e['public_cible_annonce']
    pc_ok = pc not in ('',NI) and not pc.startswith('Visitorat')
    # dominance : public annoncé > titre+accroche
    t=n(pc if pc_ok else ' | '.join([e['nom_evenement'],e['description_courte'],e['secteurs_apparents']]))
    hits=[]
    for code,rx in PART:
        m=re.search(rx,t)
        if m: hits.append((m.start(),code))
    hits.sort(); hits=[c for _,c in hits]
    # itération n°2 : tranchage professions réglementées
    ctx=n(' | '.join([e['nom_evenement'],e['description_courte'],e['secteurs_apparents'],pc if pc_ok else '']))
    if re.search(PRESCRIPT,ctx) and re.search(r'congres|assises|conference annuelle|salon',n(e['nom_evenement'])):
        hits=[4]+[h for h in hits if h!=4]
    elif re.search(SANTE,ctx) and re.search(SAVANTE,n(e['nom_evenement'])):
        hits=[7]+[h for h in hits if h!=7]
    seen=[];[seen.append(h) for h in hits if h not in seen]
    return seen[:2]

# ---------------- AXE 5 : ACCESSIBILITE (1-3) ----------------
def axe5(e):
    m=e['modalite_acces']; p=n(e['prix']); r=e['acces_restreint']
    nat=n(e['nature_restriction'])
    if m in ('invitation','cooptation') or re.search(r'invitation|cooptation|accreditation|speaker|sponsor|delegation officielle|plateau de television|nominative',nat):
        return 3,'confirme'
    if m=='réservé adhérents' or re.search(r'reserve aux adherents|orientee? adherents|orientee? membres|membres du|tarif preferentiel',nat):
        # la grille classe l'adhesion payante OUVERTE en niveau 2 ; le 3 suppose un tiers qui decide
        if re.search(r'cooptation|parrainage|sur presentation|comite d.admission',nat): return 3,'confirme'
        return 2,'confirme'
    if m=='candidature': return 2,'confirme'
    if m in ('',NI): return '','—'
    if 'gratuit' in p and 'gratuit pour les membres' not in p: return 1,'confirme'
    if m=='billet payant': return 2,'confirme'
    if m=='inscription libre':
        if p not in ('',n(NI)) and re.search(r'\d',p): return 2,'confirme'
        return 2,'presume_prix_non_publie'   # itération n°1
    return '','—'

# ---------------- exécution ----------------
d=[json.loads(l) for l in open('events.jsonl',encoding='utf-8')]
for e in d:
    e['axe1_secteur']=axe1(e)
    l,st=axe2(e)
    # Iteration n3 (suite) : le 0 est une vraie categorie ("sans dominante fonctionnelle"),
    # reservee aux evenements dont l'organisateur positionne bien le logiciel/le SI comme sujet.
    # Un evenement code IA sans fonction dominante releve du 11, pas du 0.
    if l=='' and st!='non_applicable':
        if 16 in e['axe1_secteur']: l,st=11,'code_deduit_axe1'
        elif 4 in e['axe1_secteur']: l,st=0,'code_deduit_axe1'
    e['axe2_logiciel']=l; e['axe2_statut']=st
    e['axe3_nombre']=axe3(e)
    e['axe4_participants']=axe4(e)
    a5,c5=axe5(e); e['axe5_accessibilite']=a5; e['axe5_confiance']=c5
open('events_vect.jsonl','w',encoding='utf-8').write("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in d))
from collections import Counter
print("AXE 1 vide:",sum(1 for e in d if not e['axe1_secteur']),"| double codage:",sum(1 for e in d if len(e['axe1_secteur'])==2))
print("  top:",Counter(c for e in d for c in e['axe1_secteur']).most_common())
print("AXE 2:",Counter(e['axe2_statut'] for e in d),"| valeurs:",Counter(e['axe2_logiciel'] for e in d if e['axe2_logiciel']!='').most_common())
print("AXE 3 renseigné:",sum(1 for e in d if e['axe3_nombre']!=''),"|",Counter(e['axe3_nombre'] for e in d if e['axe3_nombre']!=''))
print("AXE 4 vide:",sum(1 for e in d if not e['axe4_participants']),"| double:",sum(1 for e in d if len(e['axe4_participants'])==2))
print("  top:",Counter(c for e in d for c in e['axe4_participants']).most_common())
print("AXE 5:",Counter(e['axe5_accessibilite'] for e in d),"| confiance:",Counter(e['axe5_confiance'] for e in d))
