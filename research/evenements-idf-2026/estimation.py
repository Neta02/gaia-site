# -*- coding: utf-8 -*-
"""Couche d'estimation. Ne modifie JAMAIS les champs sourcés : ajoute des colonnes *_complete
et *_origine. Chaque estimation porte sa base et son niveau de confiance."""
import json,re,unicodedata
NI='non identifié publiquement'
def n(s): return unicodedata.normalize('NFKD',(s or '')).encode('ascii','ignore').decode().lower()
TR=[(1,15,1),(16,40,2),(41,120,3),(121,400,4),(401,2000,5),(2001,10**12,6)]
def tranche(v):
    for lo,hi,c in TR:
        if lo<=v<=hi: return c
def parse_n(s):
    """extrait le nombre de participants d'un libellé de taille"""
    t=n(s).replace(' ',' ')
    m=re.search(r'([\d][\d  ]{2,9})\s*(?:visiteurs?|participants?|congressistes|inscrits|professionnels?|delegues|visites)',t)
    if not m: m=re.search(r'(?:plus de|environ|pres de|pres de)\s*([\d][\d  ]{2,9})',t)
    if not m:
        nums=[int(x.replace(' ','')) for x in re.findall(r'([\d][\d  ]{2,9})',t)]
        return max(nums) if nums else None
    return int(m.group(1).replace(' ',''))

# capacites publiques des lieux (bornes hautes, faits verifiables)
CAP=[(r'accor arena',20000),(r'paris la defense arena',40000),(r'porte de versailles|paris convention centre|parc des expositions de paris nord|le bourget',200000),
(r'palais des congres de paris',10000),(r'cnit',2500),(r'maison de la chimie',1200),(r'maison de la mutualite',1700),
(r'carrousel du louvre|salles du carrousel',5000),(r'grande halle de la villette',7000),(r'espace champerret',6000),
(r'espace charenton',2500),(r'station f',2000),(r'palais brongniart',1500),(r'dome de paris',4200),
(r'theatre de paris',1000),(r'docks de paris',5000),(r'paris event center',6000),(r'centquatre',2500),
(r'universcience|cite des sciences',1500),(r'folies bergere',1600),(r'parc floral',5000),(r'grand palais',10000),
(r'campus cyber',500),(r'cci ',120),(r'genethon|campus genopole',400),(r'ambassade',200),(r'musee des arts forains',1500),
(r'waldorf astoria|novotel|marriott|hotel|pullman',600),(r'mazarium',400),(r'ece -|insep',800),(r'comet',1000),(r'espace lumiere',1500),(r'palais des sports robert oubron',2000),(r'circuit jean-pierre beltoise',1500),(r'foodlab|technoparc',300),(r'le ciney',600),(r'villa m|flora danica|restaurant|crossfit',120),(r'theatre jean vilar',700),(r'harmonie mutuelle|webikeo',300),(r'maison de la radio',1000),(r'pavillons des etangs',400),(r'plaine royale',3000),(r'disney hotel new york',1200),(r'stade de france',5000),(r'auditorium les echos',400),(r'la fabrique de la connaissance',600),(r'chesnaie du roy',500),(r'palais des congres d.issy',1200),(r'palais des congres paris-saclay',1000),(r'cite internationale universitaire',800),(r'the hub paris',500)]
def cap(lieu):
    l=n(lieu)
    for rx,c in CAP:
        if re.search(rx,l): return c
    return None

# modele de format -> fourchette d'effectif (bornes basses/hautes plausibles)
FORMATS=[
 ("atelier ou formation en chambre de commerce", r'^(atelier|formation|masterclass|workshop|business cafe|cafe croissance|cafe entrepreneurs)|formation numerique|masterclass', (10,30)),
 ("parcours d'accompagnement sur candidature", r'boost camp|boost agent|boost pme|boost ta croissance|programme d.acceleration|parcours|appel a candidature|codeveloppement', (10,25)),
 ("apero, meetup ou afterwork communautaire", r'apero|meetup|afterwork|hyrox|coaching collectif', (40,150)),
 ("dejeuner, cercle ou club de dirigeants", r'dejeuner|petit-dejeuner|cercle des decideurs|inspirations', (20,60)),
 ("conference de cycle en chambre de commerce", r'^(conference|webinaire)|^(preparer|reussir|evaluation|sourcing|prendre en compte|tout comprendre|la psychologie|et la marque)', (40,120)),
 ("ceremonie de remise de prix", r'ceremonie|grands prix|prix ey|trophee|remise des prix', (200,800)),
 ("sommet de dirigeants sur invitation", r'summit|sommet', (150,500)),
 ("congres de societe savante", r'congres|journees (francophones|de l|nationales|dermatologiques|interactives)|assises|ricai|video-digest|colloque international', (1000,6000)),
 ("colloque ou journee thematique", r'colloque|forum|rencontres|journee', (150,600)),
 ("convention client d'editeur ou d'integrateur", r'connections|world tour|world forum|summit|\.next|experience|now ai tour|tour france|expo paris', (300,1500)),
 ("salon economique territorial", r'effervescence|salon .{0,20}(93|94|95|territorial)|remoove', (300,1500)),
 ("salon professionnel en parc d'exposition", r'salon|expo\b|show\b', (3000,30000)),
 ("conference technique ou sectorielle", r'conference|forum|days?\b|conf\b', (200,800)),
]
ORG_FALLBACK=[
 (r'rx france|comexposium|weyou|easyfairs|infopro|infopromotions|closerstill|reed', "salon professionnel d'un operateur de salons", (3000,30000)),
 (r'\bcci\b|chambre de commerce', "rendez-vous de chambre de commerce (atelier ou conference)", (15,60)),
 (r'cpme|medef|cjd|u2p', "rendez-vous d'organisation patronale", (25,80)),
 (r'systematic|genopole|cap digital|medicen|cosmetic valley|pole ', "rendez-vous de pole de competitivite ou de cluster", (50,250)),
 (r'groupe aef|les echos|infopro digital|la tribune|alliancy', "conference organisee par un media professionnel", (200,900)),
]
def fmt_of(e):
    t=n(e['nom_evenement']+' '+e['description_courte'])
    org=n(e['organisateur']); cci='cci' in org
    vendeur = e['famille_source']=='H'
    # une convention client d'editeur prime sur la lecture "sommet de dirigeants"
    if vendeur and re.search(r'summit|sommet|world tour|world forum|connections|\.next|now ai tour|experience|forum|expo|tour paris',t):
        return "convention client d'editeur ou d'integrateur",(300,1500)
    for lib,rx,rng in FORMATS:
        if 'chambre de commerce' in lib and not cci: continue
        if re.search(rx,t): return lib,rng
    for rx,lib,rng in ORG_FALLBACK:
        if re.search(rx,org): return lib,rng
    return "format non caracterise",(100,500)

d=[json.loads(l) for l in open('events_vect.jsonl',encoding='utf-8')]
research=json.load(open('research_taille.json',encoding='utf-8'))
at=json.load(open('at_extra.json',encoding='utf-8'))

def at_rec(e):
    return at.get(e['url_source'].rstrip('/').split('/')[-1]) if 'agenda-tech.com' in e['url_source'] else None

for e in d:
    a=at_rec(e)
    # ---------- TAILLE ----------
    t_src=e['taille_annoncee'] if e['taille_annoncee'] not in ('',NI) else ''
    origine,base,conf='constaté','',''
    if not t_src and e['nom_evenement'] in research:
        r=research[e['nom_evenement']]; t_src=r['t']
        e['taille_fiabilite']=r['f']; e['taille_source']=r['s']
        origine='constaté' if r['f']=='CONFIRME' else 'estimé'
        base=r['s']; conf='haute'
    if not t_src and a and a['participants']:
        v=a['participants'].replace(' ','').replace(' ','').replace('+','')
        mm=re.match(r'^(\d+)([kK])?$',v)
        if mm:
            val=int(mm.group(1))*(1000 if mm.group(2) else 1)
            t_src=f"environ {val} participants"
            e['taille_fiabilite']='ESTIME'
            e['taille_source']="Effectif attendu publie par l'agregateur specialise Agenda Tech pour cette edition"
            origine,base,conf='estimé',"Effectif attendu publie par Agenda Tech (agregateur specialise, chiffre de l'organisateur ou de l'agregateur)",'moyenne'
    if t_src:
        v=parse_n(t_src); e['taille_complete']=t_src; e['axe3_complete']=tranche(v) if v else e['axe3_nombre']
    else:
        lib,(lo,hi)=fmt_of(e); c=cap(e['lieu_nom'])
        if c: hi=min(hi,c); lo=min(lo,hi)
        mid=int((lo*hi)**0.5)  # moyenne geometrique : plus robuste sur des echelles log
        e['taille_complete']=f"estimation : {lo} a {hi} participants"
        e['axe3_complete']=tranche(mid)
        origine='estimé'
        base=f"Modele de format ({lib}), fourchette {lo}-{hi}"+(f", plafonnee par la capacite du lieu ({e['lieu_nom'][:40]} ~ {c})" if c else "")
        conf='faible' if lib=="format non caracterise" else 'moyenne'
    if origine=='constaté' and not conf: conf='haute'
    e['taille_origine']=origine; e['taille_base']=base or "Chiffre publie par l'organisateur (colonne taille_source)"; e['taille_confiance']=conf
    # ---------- AXE 5 : accessibilite ----------
    if e['axe5_accessibilite']!='':
        e['axe5_complete']=e['axe5_accessibilite']; e['axe5_origine']='constaté'; e['axe5_base']=''
    else:
        v,b=None,''
        if a and a['tarif']:
            tr_=n(a['tarif'])
            if 'invitation' in tr_: v,b=3,"Tarif 'Sur invitation' publie par Agenda Tech"
            elif 'gratuit' in tr_: v,b=1,"Tarif 'Gratuit' publie par Agenda Tech"
            elif 'payant' in tr_ or 'partir de' in tr_: v,b=2,"Tarif payant publie par Agenda Tech"
            elif 'voir tarifs' in tr_: v,b=2,"Billetterie en vente libre (mention 'Voir tarifs sur le site' chez Agenda Tech), sans gratuite confirmee"
        if v is None:
            v,b=2,"Par defaut : aucun filtre par un tiers identifie, acces presume en vente libre (niveau 2 conservateur, cf. iteration n1)"
        e['axe5_complete']=v; e['axe5_origine']='estimé'; e['axe5_base']=b
    # ---------- AXE 4 : type de participants ----------
    if e['axe4_participants']:
        e['axe4_complete']=e['axe4_participants']; e['axe4_origine']='constaté'; e['axe4_base']=''
    else:
        org=n(e['organisateur']); nom=n(e['nom_evenement']); des=n(e['description_courte']); fam=e['famille_source']
        if 'cci' in org: v,b=[1],"Organisateur CCI : public cible structurel de dirigeants et collaborateurs de TPE-PME"
        elif re.search(r'societe francaise|federation francaise|association .*(francaise|dentaire)|societe savante',org) or 7 in e['axe1_secteur']: v,b=[7],"Congres de societe savante ou d'association professionnelle du secteur sante"
        elif fam=='H' and re.search(r'summit|forum|world tour|connections|\.next|now ai tour',nom): v,b=[1,3],"Convention client d'editeur : decideurs IT et utilisateurs metier"
        elif fam in ('G',) or re.search(r'startup|scale-?up|investisseur',des): v,b=[5,6],"Evenement d'ecosysteme startup : acteurs de l'offre et investisseurs"
        elif fam=='M' or 16 in e['axe1_secteur']: v,b=[3],"Conference technique IA : profils operationnels et utilisateurs metier"
        elif re.search(r'salon|expo',nom): v,b=[3,4],"Salon professionnel sectoriel : operationnels du secteur et prescripteurs"
        else: v,b=[1],"Par defaut, evenement B2B francilien : decideurs PME/ETI"
        e['axe4_complete']=v; e['axe4_origine']='estimé'; e['axe4_base']=b
    # ---------- AXE 2 : logiciel ----------
    if e['axe2_logiciel']!='':
        e['axe2_complete']=e['axe2_logiciel']; e['axe2_origine']='constaté' if e['axe2_statut']=='code' else 'déduit'
        e['axe2_base']='' if e['axe2_statut']=='code' else "Deduit du secteur (axe 1)"
    else:
        e['axe2_complete']=0 if e['axe2_statut']=='non_applicable' else 0
        e['axe2_origine']='estimé'
        e['axe2_base']=("Aucune dimension logicielle dans le positionnement de l'organisateur : rattache au 0 (sans dominante) "
                        "plutot que laisse vide, conformement a la demande de non-vide" if e['axe2_statut']=='non_applicable'
                        else "Dimension logicielle plausible mais non documentee : rattache au 0 (sans dominante)")
open('events_estim.jsonl','w',encoding='utf-8').write("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in d))
from collections import Counter
print("TAILLE  origine:",Counter(e['taille_origine'] for e in d),"| confiance:",Counter(e['taille_confiance'] for e in d))
print("AXE 3   tranches:",dict(sorted(Counter(e['axe3_complete'] for e in d).items())))
print("AXE 4   origine:",Counter(e['axe4_origine'] for e in d))
print("AXE 5   origine:",Counter(e['axe5_origine'] for e in d),"| valeurs:",dict(sorted(Counter(e['axe5_complete'] for e in d).items())))
print("AXE 2   origine:",Counter(e['axe2_origine'] for e in d))
print("\nVIDES RESTANTS:",{k:sum(1 for e in d if e[k] in ('',[],None)) for k in ['axe1_secteur','axe2_complete','axe3_complete','axe4_complete','axe5_complete','taille_complete']})
