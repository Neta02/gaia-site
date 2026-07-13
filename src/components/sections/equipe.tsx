import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Fondateur = {
  name: string;
  initials: string;
  school: string;
};

// Noms, fonction (« Co-fondateur ») et école : fournis. rôle / spécialité /
// LinkedIn : placeholders à matérialiser, jamais à inventer.
const fondateurs: Fondateur[] = [
  { name: "Netaniel Afriat", initials: "NA", school: "ESSEC Business School" },
  { name: "Samuel Vrignon", initials: "SV", school: "ESCP Business School" },
  { name: "Aaron Bartin", initials: "AB", school: "HEC Paris" },
  { name: "Nils Dahan", initials: "ND", school: "Télécom SudParis" },
];

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded border border-dashed border-border px-1.5 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export function Equipe() {
  return (
    <section
      id="equipe"
      aria-labelledby="equipe-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <h2
          id="equipe-title"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Quatre fondateurs, une méthode.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fondateurs.map((f) => (
            <Card key={f.name}>
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
                    <CardDescription className="mt-1 flex flex-wrap items-center gap-1">
                      Co-fondateur <Placeholder>[rôle]</Placeholder>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">{f.school}</p>
                <div>
                  <Placeholder>[Spécialité]</Placeholder>
                </div>
                <div>
                  {/* TODO (sous-tâche 7 / données) : URL LinkedIn réelle à câbler */}
                  <a
                    href="#"
                    className="inline-block rounded border border-dashed border-border px-1.5 py-0.5 text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground"
                  >
                    [LinkedIn]
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
