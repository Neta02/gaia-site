// Pipeline illustrations : recadrage au ratio des conteneurs (4:3) + compression.
// Sources attendues : public/illustrations/{hero,methode-01,methode-02,methode-03}.{png,jpg,jpeg}
// Sorties optimisées : public/illustrations/{name}.webp (1200x900, ratio 4:3)
// Fichier source manquant => on saute (le conteneur sobre reste).
//
// GATE CONTENU (manuelle, avant de lancer) : ouvrir chaque source et confirmer
// que c'est une illustration abstraite (pas un document ni une capture d'écran).
// Sinon : stop.
import sharp from "sharp";
import { existsSync } from "node:fs";

const DIR = "public/illustrations";
const NAMES = ["hero", "methode-01", "methode-02", "methode-03"];
const SRC_EXT = ["png", "jpg", "jpeg"];

// Ratio exact des conteneurs = 4:3 (aspect-[4/3]). 1200x900 couvre le retina.
const W = 1200;
const H = 900;

for (const name of NAMES) {
  const src = SRC_EXT.map((e) => `${DIR}/${name}.${e}`).find((p) => existsSync(p));
  if (!src) {
    console.log(`SKIP ${name} (aucune source)`);
    continue;
  }
  await sharp(src)
    .resize(W, H, { fit: "cover", position: "centre" }) // recadrage 4:3 centré
    .webp({ quality: 82 })
    .toFile(`${DIR}/${name}.webp`);
  console.log(`OK  ${src} -> ${DIR}/${name}.webp`);
}
