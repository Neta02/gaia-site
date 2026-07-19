import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";
import { publicAsset } from "@/lib/assets";
import { MethodeEtapes } from "@/components/sections/methode-etapes";

/**
 * Illustrations des étapes (personnage BD, ratio 4:5), fournies dans
 * public/illustrations/etape-01..06.{svg,png,webp}. Fichier absent =
 * placeholder sobre dans le panneau (fallback géré par MethodeEtapes).
 */
function etapeImages(): (string | null)[] {
  return [1, 2, 3, 4, 5, 6].map((i) => {
    const base = `illustrations/etape-0${i}`;
    return (
      publicAsset(`${base}.svg`) ??
      publicAsset(`${base}.png`) ??
      publicAsset(`${base}.webp`)
    );
  });
}

export function Methode() {
  return (
    <section
      id="methode"
      aria-labelledby="methode-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            LA MÉTHODE
          </p>
          <h2
            id="methode-title"
            className="font-display mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Vos process d&apos;abord, l&apos;IA ensuite.
          </h2>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            L&apos;IA générative ne répare pas un processus flou : elle
            l&apos;accélère. Selon la RAND Corporation, plus de 80 % des projets
            d&apos;IA échouent, soit deux fois plus que les projets informatiques
            classiques, et presque toujours pour des raisons d&apos;organisation
            plutôt que de technologie. Notre méthode s&apos;attaque à cette cause
            : une fois vos processus normalisés, ils deviennent automatisables ;
            une fois automatisés, vos équipes en gardent la maîtrise.
          </p>
        </Reveal>

        <MethodeEtapes images={etapeImages()} />

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <a href={CALENDLY_URL} {...EXTERNAL_LINK}>
              Réserver votre audit gratuit
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
