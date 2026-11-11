// Converte as imagens de public/marca/ para WebP. Uso: node scripts/converter-webp.mjs
import sharp from "sharp";
import { join } from "node:path";

const pasta = join(import.meta.dirname, "..", "public", "marca");
const ficheiros = [
  ["palanca-logo.png", 600],
  ["palanca-simbolo.png", 400],
  ["palanca-chapa.jpg", 710],
  ["palanca-emblema.jpg", 180],
];

for (const [nome, largura] of ficheiros) {
  const saida = nome.replace(/\.(png|jpg)$/, ".webp");
  const info = await sharp(join(pasta, nome))
    .resize({ width: largura, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(join(pasta, saida));
  console.log(saida, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
}
