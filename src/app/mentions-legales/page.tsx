import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales | GAIA",
  description: "Mentions légales du site GAIA.",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-[var(--content-gutter)] py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
          Mentions légales
        </h1>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Éditeur du site
            </h2>
            <p className="mt-3">
              Le présent site est édité par Top Trois Formation, société par
              actions simplifiée (SAS) au capital de [CAPITAL SOCIAL] euros,
              immatriculée au RCS de Paris sous le numéro 939 177 606, dont le
              siège social est situé 58 rue La Fayette, 75009 Paris, France.
            </p>
            <p className="mt-3">
              Directeur de la publication : Samuel Vrignon.
            </p>
            <p className="mt-3">Contact : [EMAIL DE CONTACT]</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Hébergement
            </h2>
            <p className="mt-3">
              Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133,
              Covina, CA 91723, États-Unis (vercel.com).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Propriété intellectuelle
            </h2>
            <p className="mt-3">
              L&apos;ensemble des contenus de ce site (textes, logo, identité
              visuelle) est la propriété de Top Trois Formation, sauf mention
              contraire. Toute reproduction sans autorisation préalable est
              interdite.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Données personnelles
            </h2>
            <p className="mt-3">
              Ce site ne dépose pas de cookies de suivi et ne collecte pas de
              données personnelles. La prise de rendez-vous s&apos;effectue via
              Calendly, dont le traitement des données est régi par sa propre
              politique de confidentialité.
            </p>
            <p className="mt-3">Pour toute question : [EMAIL DE CONTACT]</p>
          </section>
        </div>
      </div>
    </main>
  );
}
