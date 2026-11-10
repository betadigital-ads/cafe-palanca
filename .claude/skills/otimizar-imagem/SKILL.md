---
name: otimizar-imagem
description: Descarrega uma imagem a partir de um URL (Pexels ou outro site de stock), redimensiona-a para o site e converte-a para WebP em public/imagens/, para ser servida localmente. Usar quando o utilizador pedir para descarregar, otimizar, converter para WebP ou adicionar uma fotografia/imagem de stock ao site, ou der um URL do Pexels.
argument-hint: <url> --nome <slug> [--pasta menu] [--largura 1200] [--altura 800]
---

# Otimizar imagem (URL → WebP em `public/imagens/`)

Ferramenta: `scripts/otimizar-imagem.mjs` (usa `sharp`, já instalado com o Next, e `fetch`). Nunca referenciar `images.pexels.com` ou outro host externo nos componentes: a imagem final vive sempre em `public/imagens/`.

## Uma imagem
```bash
node scripts/otimizar-imagem.mjs <url> --nome <slug> [--pasta <subpasta>] [--largura N] [--altura N] [--fit cover|inside] [--qualidade 80]
```
- `<url>`: página do Pexels (`https://www.pexels.com/photo/1233528/` ou `.../photo/<titulo>-1233528/`), URL do CDN do Pexels, ou URL direto de qualquer imagem. Para páginas de outros sites que não são o ficheiro de imagem, obter primeiro o URL direto da imagem.
- `--nome`: kebab-case (`a-z`, `0-9`, `-`), sem extensão. Resultado: `public/imagens/<pasta>/<nome>.webp`.
- `--largura` + `--altura`: recorte `cover` a esse tamanho exato. Só `--largura`: mantém a proporção, sem ampliar.
- Sem tamanhos: só converte para WebP no tamanho original.

Tamanhos usados no site: itens de menu `--pasta menu --largura 800 --altura 1000`; eventos 1200×800; secções "sobre" 1200×900 (equipa 1000×1250); herói só `--largura 1920`.

## Várias imagens (lote)
Ficheiro JSON com uma lista de `{ "url", "nome", "pasta"?, "largura"?, "altura"?, "fit"?, "qualidade"? }` (exemplo real: `scripts/imagens-pexels.json`):
```bash
node scripts/otimizar-imagem.mjs --lote scripts/imagens-pexels.json
```
Uma falha não pára o lote; no fim há um resumo (ok/falhas, tamanho antes → depois) e o exit code é 1 se algo falhou.

## Depois de correr
1. O script imprime o caminho público (ex.: `/imagens/menu/espresso.webp`). Usá-lo em `next/image` com `fill` + `sizes` dentro de um contentor com proporção fixa; `alt` sempre preenchido; `priority` só acima da dobra.
2. Imagens de menu: o ficheiro vem das colunas `image` em `docs-design/design/menu-itens*.csv` — pôr aí o nome `.webp`.
3. Créditos: para URLs do Pexels, o script acrescenta a linha em `public/imagens/CREDITOS.md` (sem duplicar). Não editar à mão.
4. Se o ficheiro substitui um `.jpg`/`.png` antigo, atualizar as referências (`grep -rn "nome.jpg" app components lib docs-design`) e só então apagar o original.
5. Confirmar com `npm run lint` e `npm run build`; consultar `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` se houver dúvidas sobre `next/image` nesta versão do Next.

## Reportar ao utilizador
Caminho(s) criado(s), dimensões, redução de tamanho e os ficheiros de código que passaram a usar a imagem. Se o URL falhar (404, não é imagem, protegido), dizê-lo e pedir um URL direto; não contornar proteções do site.
