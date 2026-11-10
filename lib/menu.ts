import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "./i18n/locales";

export type ItemMenu = {
  categoria: string;
  nome: string;
  descricao: string;
  preco: number; // kwanzas inteiros
  rotulo: string | null; // coluna "batch": Popular, Favorito da casa…
  imagem: string; // coluna "image": ficheiro em public/imagens/menu/
};

export type CategoriaMenu = { nome: string; itens: ItemMenu[] };

const FICHEIROS: Record<Locale, string> = {
  pt: "menu-itens.csv",
  en: "menu-itens.en-GB.csv",
};

// Parser mínimo de CSV (RFC 4180): campos entre aspas, "" como aspa escapada, quebras de linha dentro de aspas.
function lerCsv(texto: string): string[][] {
  const linhas: string[][] = [];
  let campo = "";
  let linha: string[] = [];
  let aspas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') {
        aspas = false;
      } else {
        campo += c;
      }
    } else if (c === '"') {
      aspas = true;
    } else if (c === ",") {
      linha.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      linha.push(campo);
      campo = "";
      if (linha.some((v) => v !== "")) linhas.push(linha);
      linha = [];
    } else {
      campo += c;
    }
  }
  linha.push(campo);
  if (linha.some((v) => v !== "")) linhas.push(linha);
  return linhas;
}

export async function getMenu(locale: Locale): Promise<CategoriaMenu[]> {
  "use cache"; // cacheComponents: a leitura de ficheiros conta como I/O dinâmico se não for cacheada
  const ficheiro = path.join(process.cwd(), "docs-design", "design", FICHEIROS[locale]);
  const texto = (await readFile(ficheiro, "utf8")).replace(/^﻿/, "");
  const [cabecalho, ...linhas] = lerCsv(texto);
  const col = (nome: string) => {
    const i = cabecalho.indexOf(nome);
    if (i < 0) throw new Error(`${FICHEIROS[locale]}: falta a coluna "${nome}"`);
    return i;
  };
  const [iCat, iNome, iDesc, iPreco, iBatch, iImagem] = ["category", "name", "description", "price", "batch", "image"].map(col);

  const categorias = new Map<string, ItemMenu[]>();
  for (const l of linhas) {
    const preco = Number(l[iPreco]);
    if (!Number.isFinite(preco)) throw new Error(`${FICHEIROS[locale]}: preço inválido em "${l[iNome]}"`);
    const item: ItemMenu = {
      categoria: l[iCat],
      nome: l[iNome],
      descricao: l[iDesc],
      preco,
      rotulo: l[iBatch]?.trim() || null,
      imagem: l[iImagem]?.trim(),
    };
    if (!item.imagem) throw new Error(`${FICHEIROS[locale]}: falta a imagem de "${item.nome}"`);
    categorias.set(item.categoria, [...(categorias.get(item.categoria) ?? []), item]);
  }
  return [...categorias].map(([nome, itens]) => ({ nome, itens }));
}
