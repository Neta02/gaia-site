import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const faq: { q: string; r: string }[] = [
  {
    q: "Pourquoi normaliser avant d'automatiser ?",
    r: "Parce qu'un processus flou, automatisé, produit les mêmes erreurs, simplement plus vite. La normalisation le rend explicite, mesurable et stable : c'est ce qui rend son automatisation fiable et durable.",
  },
  {
    q: "Combien de temps avant un premier résultat ?",
    r: "Six semaines entre le début de l'audit et le premier agent en production, avec des livrables à chaque étape. Pourquoi pas deux ? Parce que les premières semaines servent à normaliser vos processus. Automatiser un processus flou en quinze jours, c'est possible, mais le résultat ne tient pas dans le temps.",
  },
  {
    q: "Nos processus sont très spécifiques. Est-ce vraiment adapté ?",
    r: "C'est précisément notre parti pris : un outil personnalisé vaut mieux qu'un outil générique. Nous partons de vos processus réels, jamais d'un template.",
  },
  {
    q: "Pourquoi écrire du code plutôt qu'utiliser du no-code ?",
    r: "Les plateformes no-code sont d'excellents outils d'exploration. Pour un outil que vous utiliserez tous les jours, qui doit durer et rester le vôtre, nous écrivons du code : il vous appartient, il est documenté, et il ne dépend pas de l'abonnement d'un tiers.",
  },
  {
    q: "Que possédons-nous à la fin de la mission ?",
    r: "Le code, la documentation, et des processus normalisés. Tout ce que nous construisons pendant la mission vous est remis.",
  },
  {
    q: "Faut-il changer tous nos outils pour intégrer l'IA ?",
    r: "Non. L'audit identifie les endroits où l'effort paie ; nous nous intégrons à l'existant et numérisons ce qui doit l'être, sans tout changer d'un coup.",
  },
  {
    q: "Qu'en est-il de nos données ?",
    r: "Vos données restent sous votre contrôle : les outils sont conçus pour vous appartenir et les accès sont maîtrisés. Les modalités exactes (hébergement, accès, périmètre) sont cadrées noir sur blanc dès l'audit.",
  },
  {
    q: "Nos équipes ne sont pas techniques. Vont-elles suivre ?",
    r: "La formation n'est pas une option chez GAIA, c'est le cœur de la dernière étape de la méthode. L'objectif est votre autonomie : des équipes qui pilotent les outils au quotidien.",
  },
  {
    q: "Comment démarre-t-on ?",
    r: "Par l'audit. Nous qualifions ensemble les problématiques à plus fort enjeu, nous cadrons, puis la mission démarre. Le premier audit dure deux heures et il est gratuit. Réservez un créneau.",
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
