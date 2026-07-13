import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBloc() {
  return (
    <section aria-labelledby="cta-title">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal className="rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h3
            id="cta-title"
            className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Votre premier agent en production dans six semaines.
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Tout commence par un audit gratuit de deux heures : une lecture
            précise de vos processus et des endroits où l&apos;IA peut réellement
            vous faire gagner du temps.
          </p>
          <div className="mt-8">
            {/* TODO (sous-tâche 7) : câbler le lien de prise de rendez-vous */}
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="#">Réserver votre audit gratuit</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
