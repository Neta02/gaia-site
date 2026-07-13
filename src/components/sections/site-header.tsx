"use client";

import Image from "next/image";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";

const navLinks = [
  { href: "#methode", label: "La méthode" },
  { href: "#equipe", label: "Équipe" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--content-max)] items-center justify-between px-[var(--content-gutter)]">
        <a href="#top" className="flex items-center">
          <Image
            src="/brand/gaia-logo.png"
            alt="GAIA"
            width={938}
            height={253}
            priority
            className="h-7 w-auto"
          />
        </a>

        <nav
          aria-label="Navigation principale"
          className="flex items-center gap-8"
        >
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button asChild>
              <a href={CALENDLY_URL} {...EXTERNAL_LINK}>
                Réserver votre audit gratuit
              </a>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-[var(--content-max)] flex-col gap-1 px-[var(--content-gutter)] py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <Button asChild className="w-full">
                <a
                  href={CALENDLY_URL}
                  {...EXTERNAL_LINK}
                  onClick={() => setOpen(false)}
                >
                  Réserver votre audit gratuit
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
