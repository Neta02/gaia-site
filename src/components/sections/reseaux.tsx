import { Reveal } from "@/components/motion/reveal";

// lucide-react v1.24 ne fournit plus les icones de marque : SVG inline.
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zM10 8.98h3.84v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14v6.28h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-4v-12z" />
    </svg>
  );
}

// TODO : remplacer par les vraies URL (Instagram / LinkedIn GAIA) quand fournies.
const reseaux = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "LinkedIn", Icon: LinkedInIcon },
];

export function Reseaux() {
  return (
    <section
      id="reseaux"
      aria-labelledby="reseaux-title"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-[var(--section-py)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="reseaux-title"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Suivez-nous sur les réseaux sociaux
          </h2>
          <p className="mt-6 text-muted-foreground">
            Nos analyses, nos coulisses et l&apos;actualité de l&apos;IA en
            entreprise, au fil des semaines.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {reseaux.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
