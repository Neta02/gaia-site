// Pipeline photos équipe : recadrage carré centré 800x800 + optimisation webp.
// Photos EN COULEUR (pas de traitement N&B).
// Sources attendues : public/team/{netaniel,samuel,aaron,nils}.{jpg,jpeg,png}
// Sorties optimisées : public/team/{name}.webp
// Fichier source manquant => on saute (la carte gardera ses initiales).
//
// GATE CONTENU (manuelle, avant de lancer) : ouvrir chaque source et confirmer
// que c'est bien un portrait photographique d'une personne (pas une slide, un
// logo ou un document). Sinon : stop.
import sharp from "sharp";
import { existsSync } from "node:fs";

const DIR = "public/team";
const NAMES = ["netaniel", "samuel", "aaron", "nils"];
const SRC_EXT = ["jpg", "jpeg", "png"];

// Accepte "{name}_linkedin.{ext}" (nommage source) ou "{name}.{ext}".
const candidates = (name) =>
  SRC_EXT.flatMap((e) => [`${DIR}/${name}_linkedin.${e}`, `${DIR}/${name}.${e}`]);

for (const name of NAMES) {
  const src = candidates(name).find((p) => existsSync(p));
  if (!src) {
    console.log(`SKIP ${name} (aucune source)`);
    continue;
  }
  await sharp(src)
    .resize(800, 800, { fit: "cover", position: "centre" }) // carré centré
    .webp({ quality: 82 })
    .toFile(`${DIR}/${name}.webp`);
  console.log(`OK  ${src} -> ${DIR}/${name}.webp`);
}
