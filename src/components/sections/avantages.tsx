import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const cards = [
  {
    title: "Une méthode pensée pour l'adoption réelle de l'IA en entreprise",
    body: "GAIA accompagne de l'acculturation à l'adoption concrète : formation des dirigeants et des équipes, ateliers métiers pour identifier les vrais cas d'usage, agents sur mesure intégrés aux processus. Chaque étape prépare la suivante : on ne déploie un outil que lorsque les équipes sont prêtes à s'en servir, sur un besoin qu'elles ont elles-mêmes identifié.",
    resultat:
      "une adoption durable et mesurable, ancrée dans les pratiques métiers. Une transformation réelle, pas un pilote abandonné au bout de trois mois.",
  },
  {
    title: "Le plus haut niveau d'expertise IA, rendu accessible aux équipes",
    body: "Une équipe issue des meilleures grandes écoles françaises, qui traduit des sujets techniques complexes en usages immédiatement actionnables, au rythme de vos équipes et dans le vocabulaire de vos métiers. Nous suivons l'état de l'art en continu, testons les modèles et les outils dès leur sortie, et n'apportons en entreprise que ce qui a fait ses preuves.",
    resultat:
      "des formations exigeantes et accessibles, qui font durablement monter les équipes en compétence, du dirigeant au collaborateur.",
  },
  {
    title: "Une souveraineté totale sur vos données, vos outils et vos compétences",
    body: "Vos données restent chez vous, le code développé vous appartient, et aucune dépendance ne se crée envers un éditeur, une plateforme ou des licences revendues. Vos équipes sont formées à utiliser et à faire vivre chaque outil en autonomie, y compris sans nous : la montée en compétence fait partie du livrable, pas des options.",
    resultat:
      "pas d'abonnement captif, pas de boîte noire, des équipes qui gardent la main sur leur système et savent le faire évoluer.",
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

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Card className="flex h-full flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-muted-foreground">{c.body}</p>
                  <p className="mt-6 border-t border-border pt-4 text-sm">
                    <span className="font-semibold text-foreground">
                      Résultat :
                    </span>{" "}
                    <span className="text-muted-foreground">{c.resultat}</span>
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
