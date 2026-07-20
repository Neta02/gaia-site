"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/motion/reveal";

// Inscription via FormSubmit (AJAX, sans backend) vers la boite GAIA.
// La premiere soumission declenche un email d'activation a confirmer une fois.
const NEWSLETTER_ENDPOINT =
  "https://formsubmit.co/ajax/toptrois.formation@gmail.com";

type Etat = "ferme" | "ouvert" | "envoi" | "ok" | "erreur";

export function Newsletter() {
  const [etat, setEtat] = useState<Etat>("ferme");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "Inscription newsletter GAIA",
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
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal className="rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h2
              id="newsletter-title"
              className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              On fait la veille IA à votre place.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Des analyses claires et des usages concrets de l&apos;IA en
              entreprise, directement dans votre boîte mail.
            </p>

            <div className="mt-8">
              {etat === "ferme" && (
                <Button
                  type="button"
                  size="lg"
                  onClick={() => setEtat("ouvert")}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Je m&apos;abonne à la newsletter
                </Button>
              )}

              {(etat === "ouvert" || etat === "envoi" || etat === "erreur") && (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Votre adresse email
                  </label>
                  <Input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    disabled={etat === "envoi"}
                    className="flex-1 bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={etat === "envoi"}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {etat === "envoi" ? "Envoi..." : "S'inscrire"}
                  </Button>
                </motion.form>
              )}

              {etat === "erreur" && (
                <p role="alert" className="mt-3 text-sm text-primary-foreground/80">
                  Une erreur est survenue. Réessayez dans un instant.
                </p>
              )}

              {etat === "ok" && (
                <div
                  role="status"
                  className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-lg bg-background px-4 py-3 text-sm text-foreground"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check
                      className="size-3 text-accent-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  Merci, votre inscription est bien prise en compte.
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
