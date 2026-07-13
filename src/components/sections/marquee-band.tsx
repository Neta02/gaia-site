import { Marquee } from "@/components/ui/marquee";

const items = [
  "Normaliser → Automatiser → Former",
  "Premier agent en production en six semaines",
  "Des outils sur mesure qui restent chez vous",
  "Conçu pour les PME françaises",
];

export function MarqueeBand() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Marquee pauseOnHover className="py-4 [--duration:32s]">
        {items.map((t) => (
          <span
            key={t}
            className="flex items-center gap-8 text-sm font-medium tracking-wide"
          >
            <span>{t}</span>
            <span aria-hidden="true" className="text-accent">
              •
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
