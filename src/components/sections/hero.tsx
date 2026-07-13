import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[var(--content-max)] gap-10 px-[var(--content-gutter)] py-20 lg:grid-cols-2 lg:items-center lg:py-28">
      <Stagger on="load">
        <StaggerItem>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Améliorez vos processus grâce à l&apos;IA.
          </h1>
        </StaggerItem>
        <StaggerItem className="mt-6">
          <p className="max-w-xl text-lg text-muted-foreground">
            GAIA normalise vos processus, les automatise avec des outils
            construits sur mesure, et forme vos équipes à les piloter. Premier
            agent en production en six semaines.
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8">
          <div className="flex flex-wrap gap-3">
            {/* TODO (sous-tâche 7) : câbler le lien de prise de rendez-vous */}
            <Button asChild size="lg">
              <a href="#">Réserver votre audit gratuit</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#methode">Découvrir la méthode</a>
            </Button>
          </div>
        </StaggerItem>
      </Stagger>

      <Reveal fade on="load">
        <div
          aria-hidden="true"
          className="aspect-[4/3] w-full rounded-xl border border-border bg-muted"
        />
      </Reveal>
    </section>
  );
}
