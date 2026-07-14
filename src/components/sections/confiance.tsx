import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { publicAsset } from "@/lib/assets";

type Client = { name: string; slug: string };

const clients: Client[] = [
  { name: "Maison Celinni", slug: "celinni" },
  { name: "Vanessa Bruno", slug: "vanessa-bruno" },
  { name: "Vespera", slug: "vespera" },
];

/** Logo si un asset propre existe, sinon fallback wordmark (nom de la marque,
 *  Geist petites majuscules, teinte ink à 75 %, même hauteur ~40px). */
function ClientLogo({ c }: { c: Client }) {
  const logo = publicAsset(`clients/${c.slug}.png`);
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={200}
        height={40}
        className="h-10 w-auto opacity-75 grayscale"
      />
    );
  }
  return (
    <span className="flex h-10 items-center text-lg font-semibold tracking-wide text-foreground/75 uppercase">
      {c.name}
    </span>
  );
}

export function Confiance() {
  return (
    <section aria-labelledby="confiance-title" className="border-t border-border">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--content-gutter)] py-12">
        <Reveal>
          <p
            id="confiance-title"
            className="text-center text-xs font-semibold tracking-wider text-muted-foreground"
          >
            Ils nous ont fait confiance
          </p>
        </Reveal>

        {/* Marquee décoratif (motion) : masqué aux lecteurs d'écran ;
            la liste sr-only ci-dessous porte le contenu accessible. */}
        <div className="relative mt-8" aria-hidden="true">
          <Marquee pauseOnHover className="py-2 [--duration:45s]">
            {clients.map((c) => (
              <div key={c.slug} className="mx-10 flex items-center">
                <ClientLogo c={c} />
              </div>
            ))}
          </Marquee>
        </div>

        <ul className="sr-only">
          {clients.map((c) => (
            <li key={c.slug}>{c.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
