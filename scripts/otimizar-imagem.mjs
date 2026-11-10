// Descarrega uma imagem (Pexels ou URL direto), redimensiona-a e grava-a em WebP em public/imagens/.
// Uso individual:
//   node scripts/otimizar-imagem.mjs <url> --nome espresso [--pasta menu] [--largura 800] [--altura 1000]
//        [--fit cover|inside] [--qualidade 80]
// Uso em lote:
//   node scripts/otimizar-imagem.mjs --lote scripts/imagens-pexels.json
//   (JSON: [{ "url": "...", "nome": "...", "pasta": "menu", "largura": 800, "altura": 1000 }, ...])
// Requer `sharp` (instalado com o Next) e rede.
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const RAIZ = path.resolve(import.meta.dirname, "..", "public", "imagens");
const CREDITOS = path.join(RAIZ, "CREDITOS.md");
const LIMITE_BYTES = 40 * 1024 * 1024;
const CABECALHO_CREDITOS =
  "# Créditos das fotografias\n\nTodas as fotografias vêm do [Pexels](https://www.pexels.com) e usam a [licença Pexels](https://www.pexels.com/license/) (uso gratuito). Autor de cada foto na página indicada.\n\n";

// Pexels: aceita /photo/<id>/ e /photo/<slug>-<id>/ e devolve o URL do CDN e a página de origem.
function resolverOrigem(entrada, largura) {
  let url;
  try { url = new URL(entrada); } catch { throw new Error(`URL inválido: ${entrada}`); }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error(`Protocolo não suportado: ${url.protocol}`);
  const m = url.hostname.endsWith("pexels.com") && url.hostname !== "images.pexels.com"
    ? url.pathname.match(/\/photo\/(?:[^/]*-)?(\d+)\/?$/) : null;
  if (m) {
    const id = m[1];
    return {
      download: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${Math.max(largura ?? 0, 1200)}`,
      pagina: `https://www.pexels.com/photo/${id}/`,
    };
  }
  const cdn = url.hostname === "images.pexels.com" ? url.pathname.match(/\/photos\/(\d+)\//) : null;
  return { download: url.href, pagina: cdn ? `https://www.pexels.com/photo/${cdn[1]}/` : url.href };
}

function destino(nome, pasta = "") {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nome ?? "")) throw new Error(`--nome inválido "${nome}" (use kebab-case: a-z, 0-9, hífenes)`);
  const dir = path.resolve(RAIZ, pasta);
  if (dir !== RAIZ && !dir.startsWith(RAIZ + path.sep)) throw new Error(`--pasta "${pasta}" fica fora de public/imagens/`);
  return { dir, ficheiro: path.join(dir, `${nome}.webp`), publico: "/imagens/" + path.relative(RAIZ, path.join(dir, `${nome}.webp`)).split(path.sep).join("/") };
}

async function descarregar(url) {
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  const tipo = res.headers.get("content-type") ?? "";
  if (!tipo.startsWith("image/")) throw new Error(`O URL não devolveu uma imagem (content-type: ${tipo || "desconhecido"})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > LIMITE_BYTES) throw new Error(`Imagem demasiado grande (${(buf.length / 1048576).toFixed(1)} MB)`);
  return buf;
}

async function registarCredito(publico, pagina) {
  let texto;
  try { texto = await readFile(CREDITOS, "utf8"); } catch { texto = CABECALHO_CREDITOS; }
  const linha = `- \`${publico.replace("/imagens/", "")}\` — ${pagina}`;
  const linhas = texto.trimEnd().split("\n").filter((l) => !l.startsWith(`- \`${publico.replace("/imagens/", "")}\``));
  linhas.push(linha);
  await writeFile(CREDITOS, linhas.join("\n") + "\n");
}

export async function otimizar({ url, nome, pasta, largura, altura, fit, qualidade = 80 }) {
  const alvo = destino(nome, pasta);
  const origem = resolverOrigem(url, largura);
  const buf = await descarregar(origem.download);
  let img = sharp(buf).rotate();
  if (largura && altura) img = img.resize(largura, altura, { fit: fit ?? "cover" });
  else if (largura || altura) img = img.resize({ width: largura, height: altura, fit: fit ?? "inside", withoutEnlargement: true });
  await mkdir(alvo.dir, { recursive: true });
  const info = await img.webp({ quality: qualidade, effort: 5 }).toFile(alvo.ficheiro);
  if (/pexels\.com/.test(origem.pagina)) await registarCredito(alvo.publico, origem.pagina);
  return { publico: alvo.publico, antes: buf.length, depois: info.size, largura: info.width, altura: info.height };
}

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      nome: { type: "string" }, pasta: { type: "string" }, largura: { type: "string" }, altura: { type: "string" },
      fit: { type: "string" }, qualidade: { type: "string" }, lote: { type: "string" },
    },
  });
  const num = (v, nomeOpt) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    if (!Number.isInteger(n) || n <= 0) throw new Error(`--${nomeOpt} deve ser um inteiro positivo`);
    return n;
  };
  if (values.fit && !["cover", "inside"].includes(values.fit)) throw new Error("--fit deve ser cover ou inside");

  const pedidos = values.lote
    ? JSON.parse(await readFile(values.lote, "utf8"))
    : [{ url: positionals[0], nome: values.nome, pasta: values.pasta, largura: num(values.largura, "largura"), altura: num(values.altura, "altura"), fit: values.fit, qualidade: num(values.qualidade, "qualidade") }];
  if (!values.lote && !positionals[0]) throw new Error("Uso: node scripts/otimizar-imagem.mjs <url> --nome <slug> [--pasta p] [--largura n] [--altura n]");

  let falhas = 0, antes = 0, depois = 0;
  for (const p of pedidos) {
    try {
      const r = await otimizar(p);
      antes += r.antes; depois += r.depois;
      console.log(`ok   ${r.publico}  ${r.largura}x${r.altura}  ${kb(r.antes)} -> ${kb(r.depois)}`);
    } catch (e) {
      falhas++;
      console.error(`ERRO ${p.nome ?? p.url}: ${e.message}`);
    }
  }
  if (pedidos.length > 1) console.log(`\n${pedidos.length - falhas}/${pedidos.length} ok, ${falhas} falhas. Total ${kb(antes)} -> ${kb(depois)}`);
  process.exitCode = falhas ? 1 : 0;
}

if (import.meta.url === new URL(process.argv[1], "file://").href || process.argv[1]?.endsWith("otimizar-imagem.mjs")) {
  main().catch((e) => { console.error(`ERRO ${e.message}`); process.exit(1); });
}
