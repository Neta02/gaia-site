import type { Metadata } from "next";
import { ArrowRight, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "Design System — GAIA (interne)",
  robots: { index: false, follow: false },
};

// ---- données de référence (tokens Sovereign, valeurs oklch calculées au script) ----
const swatches: { name: string; token: string; cls: string; oklch: string }[] = [
  { name: "background", token: "bone", cls: "bg-background", oklch: "oklch(0.9258 0.0198 87.52)" },
  { name: "foreground", token: "ink", cls: "bg-foreground", oklch: "oklch(0.1939 0.0162 256.83)" },
  { name: "primary", token: "ink", cls: "bg-primary", oklch: "oklch(0.1939 0.0162 256.83)" },
  { name: "accent", token: "brass", cls: "bg-accent", oklch: "oklch(0.7299 0.1143 85.57)" },
  { name: "secondary", token: "bone−", cls: "bg-secondary", oklch: "oklch(0.8613 0.0172 88.01)" },
  { name: "muted", token: "bone−", cls: "bg-muted", oklch: "oklch(0.8868 0.0175 84.59)" },
  { name: "muted-foreground", token: "ink+", cls: "bg-muted-foreground", oklch: "oklch(0.4586 0.0026 197.07)" },
  { name: "border", token: "ink→bone", cls: "bg-border", oklch: "oklch(0.8082 0.0145 88.70)" },
  { name: "input", token: "ink→bone", cls: "bg-input", oklch: "oklch(0.7698 0.0130 91.55)" },
  { name: "ring", token: "brass", cls: "bg-ring", oklch: "oklch(0.7299 0.1143 85.57)" },
  { name: "card", token: "bone", cls: "bg-card", oklch: "oklch(0.9258 0.0198 87.52)" },
  { name: "destructive", token: "—", cls: "bg-destructive", oklch: "oklch(0.577 0.245 27.325)" },
];

const contrasts: { pair: string; ratio: string; verdict: "AAA" | "AA" | "FAIL" }[] = [
  { pair: "foreground (ink) / background (bone)", ratio: "14.73:1", verdict: "AAA" },
  { pair: "primary-fg (bone) / primary (ink)", ratio: "14.73:1", verdict: "AAA" },
  { pair: "accent-fg (ink) / accent (brass)", ratio: "7.61:1", verdict: "AAA" },
  { pair: "muted-foreground / muted", ratio: "5.10:1", verdict: "AA" },
  { pair: "muted-foreground / background", ratio: "5.76:1", verdict: "AA" },
  { pair: "brass / bone", ratio: "1.93:1", verdict: "FAIL" },
  { pair: "brass / ink", ratio: "7.61:1", verdict: "AAA" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[var(--content-max)] px-[var(--content-gutter)] py-16">
      <h2 className="font-display mb-8 text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* En-tête */}
      <header className="mx-auto w-full max-w-[var(--content-max)] px-[var(--content-gutter)] pt-16 pb-4">
        <p className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Sovereign · radix-nova
        </p>
        <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight">
          Design System
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Fondations visuelles — palette, typographie, composants. Page interne
          (noindex), hors navigation. Aucun copy éditorial : le hero ci-dessous
          est en Lorem ipsum.
        </p>
      </header>

      <Separator className="mx-auto max-w-[var(--content-max)]" />

      {/* 1. Couleurs */}
      <Section title="Couleurs">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="flex flex-col gap-2 rounded-lg border border-border p-3"
            >
              <div
                className={`h-16 w-full rounded-md ring-1 ring-foreground/10 ${s.cls}`}
              />
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.token}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {s.oklch}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Separator className="mx-auto max-w-[var(--content-max)]" />

      {/* 2. Typographie */}
      <Section title="Typographie">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">H1 · Fraunces · display</p>
            <h1 className="font-display text-6xl font-semibold tracking-tight">
              Aa — Fraunces
            </h1>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">H2 · Fraunces · display</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight">
              Aa — Fraunces
            </h2>
          </div>
          <Separator />
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">H3 · Geist Sans</p>
            <h3 className="text-2xl font-semibold">Aa — Geist Sans</h3>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">H4 · Geist Sans</p>
            <h4 className="text-xl font-semibold">Aa — Geist Sans</h4>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Body · Geist Sans</p>
            <p className="max-w-2xl text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Small / UI · Geist Sans</p>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet — texte secondaire (muted-foreground).
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Mono · Geist Mono</p>
            <p className="font-mono text-sm">oklch(0.7299 0.1143 85.57)</p>
          </div>
        </div>
      </Section>

      <Separator className="mx-auto max-w-[var(--content-max)]" />

      {/* 3. Règles d'usage couleur */}
      <Section title="Règles d'usage couleur">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="max-w-prose text-sm leading-relaxed">
              <span className="font-semibold">Contrainte noir-sur-blanc.</span>{" "}
              Le brass (accent) échoue le contraste AA sur le fond bone
              (1,93:1). Il est donc <span className="font-semibold">interdit
              en texte sur fond bone</span> et réservé aux aplats, bordures,
              rings, et au texte <span className="font-semibold">sur ink
              uniquement</span> (accent-foreground = ink).
            </p>

            {/* Exemple autorisé : brass sur ink */}
            <div className="rounded-lg bg-primary p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <Check className="size-4" />
                brass sur ink — autorisé (7,61:1, AAA)
              </div>
            </div>

            {/* Exemple interdit : brass sur bone */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <X className="size-4" />
                brass sur bone — interdit (1,93:1, échec AA)
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                ↑ illustration de l'anti-pattern : ce texte serait illisible en
                production.
              </p>
            </div>

            {/* Usages corrects du brass */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                aplat + texte ink
              </span>
              <span className="rounded-full border-2 border-accent px-3 py-1 text-xs font-medium">
                bordure brass
              </span>
              <span className="rounded-full px-3 py-1 text-xs font-medium ring-2 ring-ring">
                ring brass
              </span>
            </div>
          </div>

          {/* Tableau des ratios */}
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="px-3 py-2 font-medium">Paire</th>
                  <th className="px-3 py-2 font-medium">Ratio</th>
                  <th className="px-3 py-2 font-medium">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {contrasts.map((c) => (
                  <tr key={c.pair} className="border-t border-border">
                    <td className="px-3 py-2">{c.pair}</td>
                    <td className="px-3 py-2 font-mono text-xs">{c.ratio}</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          "rounded px-1.5 py-0.5 text-xs font-medium " +
                          (c.verdict === "FAIL"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-accent text-accent-foreground")
                        }
                      >
                        {c.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Separator className="mx-auto max-w-[var(--content-max)]" />

      {/* 4. Composants */}
      <Section title="Composants">
        <div className="space-y-10">
          {/* Navigation menu */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">NavigationMenu</p>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Lorem</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Ipsum</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Dolor</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Button — variants</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button>
                Suite <ArrowRight />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icône">
                <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Card</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Lorem ipsum</CardTitle>
                  <CardDescription>Dolor sit amet consectetur</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Lorem
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ut enim ad minim</CardTitle>
                  <CardDescription>Quis nostrud exercitation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Duis aute irure</CardTitle>
                  <CardDescription>Reprehenderit in voluptate</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Accordion</p>
            <Accordion
              type="single"
              collapsible
              defaultValue="a1"
              className="max-w-2xl"
            >
              <AccordionItem value="a1">
                <AccordionTrigger>Lorem ipsum dolor sit amet ?</AccordionTrigger>
                <AccordionContent>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="a2">
                <AccordionTrigger>Ut enim ad minim veniam ?</AccordionTrigger>
                <AccordionContent>
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="a3">
                <AccordionTrigger>Duis aute irure dolor ?</AccordionTrigger>
                <AccordionContent>
                  In reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Separator */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Separator</p>
            <div className="max-w-md">
              <p className="text-sm">Lorem ipsum</p>
              <Separator className="my-3" />
              <div className="flex h-5 items-center gap-3 text-sm">
                <span>Lorem</span>
                <Separator orientation="vertical" />
                <span>Ipsum</span>
                <Separator orientation="vertical" />
                <span>Dolor</span>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Marquee (Magic UI)</p>
            <div className="relative overflow-hidden rounded-lg border border-border">
              <Marquee pauseOnHover className="[--duration:20s]">
                {["ink", "bone", "brass", "Fraunces", "Geist", "Sovereign"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  )
                )}
              </Marquee>
            </div>
          </div>
        </div>
      </Section>

      <Separator className="mx-auto max-w-[var(--content-max)]" />

      {/* 5. Hero factice — LOREM UNIQUEMENT */}
      <Section title="Hero (gabarit — Lorem uniquement)">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Lorem ipsum
            </span>
            <h1 className="font-display mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
              Lorem ipsum dolor sit amet consectetur
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam quis nostrud exercitation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">
                Lorem ipsum <ArrowRight />
              </Button>
              <Button size="lg" variant="outline">
                Dolor sit
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
