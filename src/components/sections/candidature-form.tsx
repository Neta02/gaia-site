"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE_URL } from "@/lib/links";

// Envoi via FormSubmit (formulaire vers email, sans backend) : la première
// soumission déclenche un email d'activation vers la boîte de réception,
// à confirmer une fois. Ensuite chaque candidature arrive par email.
const FORM_ACTION = "https://formsubmit.co/toptrois.formation@gmail.com";

function SuccessBanner() {
  const params = useSearchParams();
  if (params.get("envoye") !== "1") return null;
  return (
    <div
      role="status"
      className="mb-8 flex items-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground"
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
        <Check className="size-3 text-accent-foreground" aria-hidden="true" />
      </span>
      Candidature bien envoyée. Nous vous recontactons.
    </div>
  );
}

export function CandidatureForm() {
  return (
    <div className="mx-auto max-w-2xl">
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>

      <form
        action={FORM_ACTION}
        method="POST"
        encType="multipart/form-data"
        className="rounded-xl border border-border bg-card p-6 sm:p-8"
      >
        {/* Configuration FormSubmit */}
        <input type="hidden" name="_subject" value="Candidature GAIA" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="hidden"
          name="_next"
          value={`${SITE_URL}/recrutement?envoye=1`}
        />
        {/* Piège anti-robots (doit rester vide) */}
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
            <Label htmlFor="prenom">Prénom *</Label>
            <Input id="prenom" name="Prénom" required autoComplete="given-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nom">Nom *</Label>
            <Input id="nom" name="Nom" required autoComplete="family-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="Email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              name="Téléphone"
              type="tel"
              autoComplete="tel"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="naissance">Date de naissance</Label>
            <Input id="naissance" name="Date de naissance" type="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="formation">Formation *</Label>
            <Input id="formation" name="Formation" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="linkedin">LinkedIn (optionnel)</Label>
            <Input id="linkedin" name="LinkedIn" type="url" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="cv">CV (PDF)</Label>
            <Input
              id="cv"
              name="CV"
              type="file"
              accept="application/pdf"
              className="pt-1.5"
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="message">Votre message</Label>
            <Textarea id="message" name="Message" rows={5} />
          </div>
        </div>

        <div className="mt-8">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Envoyer ma candidature
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            En envoyant ce formulaire, vous acceptez que GAIA utilise ces
            informations pour traiter votre candidature.
          </p>
        </div>
      </form>
    </div>
  );
}
