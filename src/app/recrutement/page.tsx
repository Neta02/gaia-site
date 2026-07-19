import type { Metadata } from "next";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Recrutement | GAIA",
  description:
    "Rejoignez l'équipe GAIA : conseil et ingénierie IA au plus près des PME françaises.",
  alternates: { canonical: "/recrutement" },
};

// Email de contact (celui des mentions légales) avec objet prérempli.
const CANDIDATURE_MAILTO =
  "mailto:toptrois.formation@gmail.com?subject=Candidature%20GAIA";

const raisons = [
  {
    title: "Du concret, dès la première semaine.",
    body: "Des missions réelles chez des PME, des livrables qui comptent, et un premier agent en production en six semaines.",
  },
  {
    title: "Au contact direct des dirigeants.",
    body: "Vous travaillez au plus près des équipes et des dirigeants, de l'audit des processus à la formation. Votre travail se voit, votre impact aussi.",
  },
  {
    title: "Une méthode, pas de flou.",
    body: "Cartographier, connecter, normaliser, automatiser : un cadre clair qui laisse toute leur place à l'initiative et à l'autonomie.",
  },
];

const attentes = [
  "L'envie de comprendre un métier avant de proposer un outil",
  "De la rigueur dans l'exécution et de la clarté à l'écrit",
  "Un goût pour l'automatisation, les données et l'IA appliquée",
  "L'aisance face à un dirigeant de PME comme face à un terminal",
];

export default function Recrutement() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-20 lg:py-28">
          <Stagger on="load">
            <StaggerItem>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                RECRUTEMENT
              </p>
            </StaggerItem>
            <StaggerItem className="mt-4">
              <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Rejoignez l&apos;équipe qui rend l&apos;IA utile.
              </h1>
            </StaggerItem>
            <StaggerItem className="mt-6">
              <p className="max-w-2xl text-lg text-muted-foreground">
                GAIA construit des outils IA sur mesure au plus près des équipes
                des PME françaises. Nous cherchons des gens concrets, curieux et
                exigeants pour construire avec nous.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-8">
              <Button asChild size="lg">
                <a href={CANDIDATURE_MAILTO}>Envoyer une candidature</a>
              </Button>
            </StaggerItem>
          </Stagger>
        </section>

        {/* Pourquoi nous rejoindre */}
        <section
          aria-labelledby="raisons-title"
          className="border-t border-border"
        >
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal>
              <h2
                id="raisons-title"
                className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Pourquoi nous rejoindre ?
              </h2>
            </Reveal>

            <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
              {raisons.map((r) => (
                <StaggerItem key={r.title} className="h-full">
                  <Card className="h-full transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{r.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{r.body}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Les profils qui nous intéressent */}
        <section
          aria-labelledby="profils-title"
          className="border-t border-border"
        >
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal>
              <h2
                id="profils-title"
                className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Les profils qui nous intéressent
              </h2>
              <p className="mt-6 max-w-2xl text-muted-foreground">
                Pas de fiche de poste figée : nous recrutons des personnalités
                avant des CV. Ce qui compte chez GAIA :
              </p>
              <ul className="mt-6 space-y-3">
                {attentes.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check
                        className="size-3 text-accent"
                        aria-hidden="true"
                      />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl text-muted-foreground">
                Conseil ou ingénierie, junior ou expérimenté : si vous vous
                reconnaissez, écrivez-nous.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CTA candidature */}
        <section aria-labelledby="candidature-title">
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
            <Reveal className="rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
              <h2
                id="candidature-title"
                className="font-display mx-auto max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Envie de construire avec nous ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Envoyez votre CV et quelques lignes sur ce que vous avez envie
                de construire chez GAIA.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <a href={CANDIDATURE_MAILTO}>Envoyer une candidature</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
