import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";

export function Hero() {
  return (
    <section className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-20 lg:py-28">
      <Stagger on="load" className="mx-auto max-w-3xl text-center">
        <StaggerItem>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Transformez votre entreprise grâce à l&apos;IA
          </h1>
        </StaggerItem>
        <StaggerItem className="mt-6">
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Le vrai risque ? Laisser vos concurrents adopter l&apos;IA avant
            vous.
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href={CALENDLY_URL} {...EXTERNAL_LINK}>
                Prendre rendez-vous
              </a>
            </Button>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
