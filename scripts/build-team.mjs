// Pipeline photos équipe : recadrage carré centré 800x800 + noir et blanc léger
// (grayscale + contraste doux) pour homogénéiser des photos d'origines diverses.
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

for (const name of NAMES) {
  const src = SRC_EXT.map((e) => `${DIR}/${name}.${e}`).find((p) => existsSync(p));
  if (!src) {
    console.log(`SKIP ${name} (aucune source)`);
    continue;
  }
  await sharp(src)
    .resize(800, 800, { fit: "cover", position: "centre" }) // carré centré
    .grayscale() // noir et blanc
    .linear(1.08, -10.24) // contraste doux (pente 1.08 autour de 128)
    .webp({ quality: 80 })
    .toFile(`${DIR}/${name}.webp`);
  console.log(`OK  ${src} -> ${DIR}/${name}.webp`);
}
