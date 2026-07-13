// Traitement du logo GAIA : détourage du blanc par seuil (aplats) + déclinaisons.
// Ne modifie jamais les couleurs du logo (on ne touche que le canal alpha).
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";

const SRC = "public/brand/gaia-logo-source.jpg";
const BONE = { r: 0xec, g: 0xe6, b: 0xd8, alpha: 1 }; // #ECE6D8

// Seuils de détourage (sur min(R,G,B)) : quasi-blanc -> transparent, sombre ->
// opaque, rampe entre les deux pour lisser le liseré anti-aliasé (anti-halo).
const T_HIGH = 238;
const T_LOW = 170;

// 1) Détourage -> master PNG transparent (marges transparentes rognées).
const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const m = Math.min(data[i], data[i + 1], data[i + 2]);
  data[i + 3] =
    m >= T_HIGH ? 0 : m <= T_LOW ? 255 : Math.round((255 * (T_HIGH - m)) / (T_HIGH - T_LOW));
}

const trimmed = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .trim()
  .toBuffer();

await writeFile("public/brand/gaia-logo.png", trimmed);
const master = await sharp(trimmed).metadata();
console.log(`MASTER public/brand/gaia-logo.png ${master.width}x${master.height}`);

// 2) Composition du logo centré sur fond bone (icônes + OG).
async function onBone(W, H, padFrac, out) {
  const logo = await sharp(trimmed)
    .resize({
      width: Math.round(W * (1 - padFrac)),
      height: Math.round(H * (1 - padFrac)),
      fit: "inside",
    })
    .toBuffer();
  const buf = await sharp({
    create: { width: W, height: H, channels: 4, background: BONE },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
  if (out) await writeFile(out, buf);
  return buf;
}

// favicon.ico (multi-tailles, fond bone)
const faviconSrc = await onBone(256, 256, 0.24);
await writeFile("src/app/favicon.ico", await pngToIco([faviconSrc]));
console.log("WROTE src/app/favicon.ico");

// icon.png (fond bone) + apple-icon.png (fond bone)
await onBone(512, 512, 0.24, "src/app/icon.png");
console.log("WROTE src/app/icon.png 512x512");
await onBone(180, 180, 0.18, "src/app/apple-icon.png");
console.log("WROTE src/app/apple-icon.png 180x180");

// Open Graph 1200x630, logo centré sur bone
await onBone(1200, 630, 0.4, "src/app/opengraph-image.png");
console.log("WROTE src/app/opengraph-image.png 1200x630");
