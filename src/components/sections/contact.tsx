"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion/reveal";

// Envoi via FormSubmit (AJAX, sans backend) vers la boite GAIA.
// La premiere soumission declenche un email d'activation a confirmer une fois.
const CONTACT_ENDPOINT =
  "https://formsubmit.co/ajax/toptrois.formation@gmail.com";

type Etat = "idle" | "envoi" | "ok" | "erreur";

export function Contact() {
  const [etat, setEtat] = useState<Etat>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: "Contact GAIA",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setEtat("ok");
    } catch {
      setEtat("erreur");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-title"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Contactez GAIA
          </h2>
          <p className="mt-6 text-muted-foreground">
            Réservez un premier échange pour comprendre comment l&apos;IA peut
            être intégrée concrètement dans votre entreprise.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          {etat === "ok" ? (
            <div
              role="status"
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-accent">
                <Check
                  className="size-6 text-accent-foreground"
                  aria-hidden="true"
                />
              </span>
              <p className="text-lg font-semibold">
                Merci, votre message est bien envoyé.
              </p>
              <p className="text-muted-foreground">
                Notre équipe vous recontacte rapidement.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              {/* Piege anti-robots (doit rester vide) */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="c-prenom">Prénom *</Label>
                  <Input
                    id="c-prenom"
                    name="Prénom"
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-nom">Nom *</Label>
                  <Input
                    id="c-nom"
                    name="Nom"
                    required
                    autoComplete="family-name"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="c-secteur">Secteur d&apos;activité</Label>
                  <Input id="c-secteur" name="Secteur d'activité" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-email">Email *</Label>
                  <Input
                    id="c-email"
                    name="Email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-tel">Téléphone</Label>
                  <Input
                    id="c-tel"
                    name="Téléphone"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="c-entreprise">Entreprise</Label>
                  <Input
                    id="c-entreprise"
                    name="Entreprise"
                    autoComplete="organization"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="c-sujet">Sujet</Label>
                  <Input id="c-sujet" name="Sujet" />
                </div>
              </div>

              <p className="mt-8 text-center font-semibold tracking-tight">
                Nos experts étudient vos priorités et vos processus, puis
                identifient les applications d&apos;IA les plus pertinentes à
                déployer dans votre activité.
              </p>

              <div className="mt-8 flex flex-col items-center">
                <Button type="submit" size="lg" disabled={etat === "envoi"}>
                  {etat === "envoi" ? "Envoi..." : "Envoyer"}
                </Button>
                {etat === "erreur" && (
                  <p role="alert" className="mt-3 text-sm text-destructive">
                    Une erreur est survenue. Réessayez dans un instant.
                  </p>
                )}
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  En envoyant ce formulaire, vous acceptez d&apos;être
                  recontacté par GAIA dans le cadre de votre demande.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
