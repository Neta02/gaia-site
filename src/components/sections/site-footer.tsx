import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Reveal
        fade
        className="mx-auto flex max-w-[var(--content-max)] flex-col gap-8 px-[var(--content-gutter)] py-12 md:flex-row md:items-start md:justify-between"
      >
        <div>
          <a href="/#top" className="inline-flex items-center">
            <Image
              src="/brand/gaia-logo.png"
              alt="GAIA"
              width={938}
              height={253}
              className="h-7 w-auto"
            />
          </a>
          <p className="mt-3 text-base font-medium">
            GAIA, l&apos;IA au service des PME.
          </p>
        </div>

        <nav
          aria-label="Navigation de pied de page"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          <a
            href="/formation"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Formation
          </a>
          <a
            href="/gaia-lab"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            GAIA Lab
          </a>
          <a
            href="/#equipe"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Équipe
          </a>
          <a
            href="/#faq"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            FAQ
          </a>
          <a
            href="/recrutement"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Recrutement
          </a>
          {/* TODO : lien LinkedIn GAIA à ajouter quand la page entreprise sera créée */}
          <a
            href="/mentions-legales"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Mentions légales
          </a>
        </nav>

        <div>
          <Button asChild>
            <a href={CALENDLY_URL} {...EXTERNAL_LINK}>
              Réserver votre audit gratuit
            </a>
          </Button>
        </div>
      </Reveal>
    </footer>
  );
}
