import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Retourne le chemin public d'un asset s'il existe sur le disque, sinon null.
 * Utilisé côté serveur (au prérendu) pour un fallback gracieux : si le fichier
 * n'est pas fourni, on garde le conteneur sobre au lieu d'un lien cassé.
 */
export function publicAsset(relPath: string): string | null {
  const clean = relPath.replace(/^\/+/, "");
  return existsSync(join(process.cwd(), "public", clean)) ? `/${clean}` : null;
}
