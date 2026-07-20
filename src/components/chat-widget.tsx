"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send } from "lucide-react";

import { CALENDLY_URL, EXTERNAL_LINK } from "@/lib/links";

type Message = { from: "bot" | "user"; text: string };

const GREETING: Message = {
  from: "bot",
  text: "Bonjour, ici l'assistant GAIA. Dites-nous où vous en êtes avec l'IA, on vous oriente.",
};

// Reponse figee : aucun LLM branche pour l'instant.
// Pour brancher un modele plus tard, remplacer le corps de reponseBot().
function reponseBot(): Message {
  return {
    from: "bot",
    text: "Merci pour votre message. Pour aller vite, réservez un audit gratuit ou laissez vos coordonnées via le formulaire de contact, notre équipe vous répond.",
  };
}

const suggestions = [
  "Former mes équipes",
  "Explorer des cas d'usage",
  "Cadrer un projet IA",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [texte, setTexte] = useState("");
  const flux = useRef<HTMLDivElement>(null);

  useEffect(() => {
    flux.current?.scrollTo({ top: flux.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function envoyer(contenu: string) {
    const propre = contenu.trim();
    if (!propre) return;
    setMessages((m) => [...m, { from: "user", text: propre }, reponseBot()]);
    setTexte("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    envoyer(texte);
  }

  return (
    <>
      {/* Bulle flottante, toujours presente */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        aria-expanded={open}
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat avec l'assistant GAIA"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-5 bottom-24 z-50 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
          >
            {/* En-tete */}
            <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <span className="flex size-8 items-center justify-center rounded-full bg-accent">
                <MessageCircle
                  className="size-4 text-accent-foreground"
                  aria-hidden="true"
                />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Assistant GAIA</p>
                <p className="text-xs text-primary-foreground/70">
                  Répond en général sous 24 h
                </p>
              </div>
            </div>

            {/* Fil de messages */}
            <div ref={flux} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.from === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <p
                    className={
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm " +
                      (m.from === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground")
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => envoyer(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                  <a
                    href={CALENDLY_URL}
                    {...EXTERNAL_LINK}
                    className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    Prendre rendez-vous
                  </a>
                </div>
              )}
            </div>

            {/* Saisie */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Votre message
              </label>
              <input
                id="chat-input"
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                placeholder="Écrivez votre message..."
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                aria-label="Envoyer"
                className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
