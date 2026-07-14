// Logos clients : détourage du fond blanc (seuil) -> PNG transparent rogné.
// Préserve toute transparence déjà présente (alpha final = min(existant, calculé)).
// Sources : public/clients/{slug}-src.{jpg,png} -> public/clients/{slug}.png
import sharp from "sharp";
import { existsSync } from "node:fs";

const DIR = "public/clients";
const T_HIGH = 238;
const T_LOW = 170;

const items = [
  { src: "celinni-src.jpg", out: "celinni.png" },
  { src: "vespera-src.png", out: "vespera.png" },
];

for (const it of items) {
  const src = `${DIR}/${it.src}`;
  if (!existsSync(src)) {
    console.log(`SKIP ${it.src}`);
    continue;
  }
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    const computed =
      m >= T_HIGH ? 0 : m <= T_LOW ? 255 : Math.round((255 * (T_HIGH - m)) / (T_HIGH - T_LOW));
    data[i + 3] = Math.min(data[i + 3], computed);
  }

  const buf = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .trim()
    .toBuffer();
  await sharp(buf).toFile(`${DIR}/${it.out}`);
  const meta = await sharp(buf).metadata();
  console.log(`OK ${it.out} ${meta.width}x${meta.height}`);
}
