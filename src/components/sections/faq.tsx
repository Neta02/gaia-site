import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const faq: { q: string; r: string }[] = [
  {
    q: "C'est quoi, un agent IA ?",
    r: "C'est un programme qui exécute une tâche à votre place, de bout en bout. Selon les cas, il lit les mails entrants et prépare les réponses, il saisit les factures fournisseurs dans votre comptabilité, ou il relance les clients au bon moment. Vos équipes gardent la main sur ce qu'il produit.",
  },
  {
    q: "Comment savoir s'il nous faut une formation ou du conseil ?",
    r: "Cela dépend de votre besoin. Si l'enjeu est que vos équipes se servent mieux de l'IA dans leur travail de tous les jours, commencez par une formation. S'il s'agit d'automatiser un processus précis avec des agents, c'est une mission de conseil. Dans le doute, l'audit d'entrée sert à trancher.",
  },
  {
    q: "Nos équipes ne sont pas techniques. Vont-elles suivre ?",
    r: "Oui, c'est le cœur de notre travail. Les formations partent des dossiers réels de vos équipes plutôt que d'exemples théoriques, et à chaque outil déployé, nous formons les personnes qui s'en serviront. L'objectif est que vos équipes pilotent leurs agents sans nous.",
  },
  {
    q: "Faut-il changer nos logiciels ?",
    r: "Non. Nos agents se branchent sur vos logiciels existants : ERP, CRM, ou simplement vos fichiers.",
  },
  {
    q: "Où vont nos données ?",
    r: "Elles restent chez vous. Dès l'audit, nous cadrons noir sur blanc les accès et ce que l'agent a le droit de lire, et nos agents sont conformes au RGPD.",
  },
  {
    q: "Combien de temps avant de voir des résultats ?",
    r: "Après une formation, vos équipes appliquent dès le lendemain ce qu'elles ont appris. Pour les agents, comptez quelques semaines avant la mise en service. Ensuite, nous mesurons ce qu'ils vous font gagner, en continu et en chiffres.",
  },
  {
    q: "Combien ça coûte ?",
    r: "Chaque mission est chiffrée après l'audit, selon le périmètre et le nombre de jours d'intervention. Le devis est établi avant de commencer, et l'audit d'entrée est offert.",
  },
  {
    q: "Si nous arrêtons, qu'est-ce que nous gardons ?",
    r: "Tout reste chez vous. Le code développé pour vous vous appartient, avec sa documentation. Et comme vos équipes ont été formées, elles peuvent faire tourner les outils sans nous.",
  },
  {
    q: "Par où commence-t-on ?",
    r: "Par un audit de deux heures, que nous offrons. Nous passons en revue vos processus, vos outils et vos priorités, puis nous vous remettons une liste de cas concrets, classés par impact. Vous décidez ensuite, avec ou sans nous.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <h2
            id="faq-title"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Une question ?
          </h2>

          <Accordion
          type="single"
          collapsible
          defaultValue="q1"
          className="mt-10 max-w-3xl"
        >
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`q${i + 1}`}>
              <AccordionTrigger className="text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.r}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
