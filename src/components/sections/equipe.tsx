import { ExternalLink } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EXTERNAL_LINK } from "@/lib/links";

type Fondateur = {
  name: string;
  initials: string;
  school: string;
  linkedin: string;
};

const fondateurs: Fondateur[] = [
  {
    name: "Netaniel Afriat",
    initials: "NA",
    school: "ESSEC Business School",
    linkedin:
      "https://www.linkedin.com/in/n%C3%A9taniel-afriat-09b9aa276",
  },
  {
    name: "Samuel Vrignon",
    initials: "SV",
    school: "ESCP Business School",
    linkedin: "https://www.linkedin.com/in/samuel-vrignon-escp/",
  },
  {
    name: "Aaron Bartin",
    initials: "AB",
    school: "HEC Paris",
    linkedin: "https://www.linkedin.com/in/aaronbartin/",
  },
  {
    name: "Nils Dahan",
    initials: "ND",
    school: "Télécom SudParis",
    linkedin: "https://www.linkedin.com/in/nilsdahan/",
  },
];

export function Equipe() {
  return (
    <section
      id="equipe"
      aria-labelledby="equipe-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal>
          <h2
            id="equipe-title"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Quatre fondateurs, une méthode.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fondateurs.map((f) => (
            <StaggerItem key={f.name} className="h-full">
              <Card className="h-full transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                    >
                      {f.initials}
                    </div>
                    <div>
                      <CardTitle className="text-base">{f.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Co-fondateur
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{f.school}</p>
                  <a
                    href={f.linkedin}
                    {...EXTERNAL_LINK}
                    aria-label={`LinkedIn de ${f.name}`}
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
