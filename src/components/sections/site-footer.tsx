import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[var(--content-max)] flex-col gap-8 px-[var(--content-gutter)] py-12 md:flex-row md:items-start md:justify-between">
        <p className="text-base font-medium">GAIA, l&apos;IA au service des PME.</p>

        <nav
          aria-label="Navigation de pied de page"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          <a
            href="#methode"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            La méthode
          </a>
          <a
            href="#equipe"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Équipe
          </a>
          <a
            href="#faq"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            FAQ
          </a>
          {/* TODO (sous-tâche 7 / données) : URL LinkedIn GAIA réelle à câbler */}
          <a
            href="#"
            className="rounded border border-dashed border-border px-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            [LinkedIn GAIA]
          </a>
          {/* TODO : page Mentions légales à créer et à câbler */}
          <a
            href="#"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Mentions légales
          </a>
        </nav>

        <div>
          {/* TODO (sous-tâche 7) : câbler le lien de prise de rendez-vous */}
          <Button asChild>
            <a href="#">Réserver votre audit gratuit</a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
