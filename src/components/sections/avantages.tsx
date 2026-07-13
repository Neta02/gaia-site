import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const cards = [
  {
    title: "La méthode avant les outils.",
    body: "Chaque mission commence par une lecture précise de vos processus. C'est ce travail de fond qui fait qu'une automatisation fonctionne encore six mois plus tard, et qu'elle vous fait vraiment gagner du temps.",
  },
  {
    title: "En production en six semaines.",
    body: "Pas de démonstration qui ne débouche sur rien : un premier agent réellement utilisé par vos équipes au bout de six semaines. Six semaines, parce que les premières servent à normaliser.",
  },
  {
    title: "Vous restez autonomes.",
    body: "Ce que nous construisons reste chez vous : les outils, leur documentation, et des équipes formées pour les faire vivre. Vous ne dépendez de personne, pas même de nous.",
  },
];

export function Avantages() {
  return (
    <section aria-labelledby="avantages-title" className="border-t border-border">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <h2
            id="avantages-title"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Pourquoi GAIA ?
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Card className="h-full transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{c.body}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
