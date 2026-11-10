# Sistema de design — Café Palanca

Sistema de design para o site do Café Palanca, feito para a stack do projeto: **Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript**. Escrito em português de Portugal/Angola.

**Direção**: escuro espresso com cobre. O acento vem do logótipo (palanca-negra com folhas de café, em branco sobre cobre escovado) e a forma oval da placa de cobre das referências é a assinatura. Títulos serifados editoriais (Newsreader) com texto sóbrio (Instrument Sans), fotografia grande, uma faixa de papel creme por página.

Inspiração: `docs-design/design/referencias/`. Logótipo oficial em `public/marca/`.

## Documentos

| Ficheiro | Conteúdo |
|---|---|
| [01-guia-de-estilo.md](01-guia-de-estilo.md) | Ideia de marca, cor, tipografia, layout, imagem, movimento, voz, acessibilidade, fazer/não fazer |
| [02-design-tokens.md](02-design-tokens.md) | Valores, papéis e contrastes de cada token |
| [tokens.css](tokens.css) | Tokens para Tailwind v4, prontos a substituir `app/globals.css` |
| [tokens.json](tokens.json) | Os mesmos tokens em formato DTCG (ferramentas de design) |
| [03-componentes.md](03-componentes.md) | Catálogo, estrutura de pastas e convenções |
| [04-implementacao-nextjs.md](04-implementacao-nextjs.md) | Integração: fontes, CSS, Server/Client, imagens, ordem de trabalho |
| [componentes/](componentes/) | Especificação de cada componente, com estados, acessibilidade e esqueleto TSX |

## Começar em 5 passos

1. Copiar `tokens.css` para `app/globals.css`.
2. Atualizar `app/layout.tsx` com as fontes e `lang="pt-AO"` (ver `04-implementacao-nextjs.md`).
3. Criar `lib/cn.ts`.
4. Implementar os componentes pela ordem de `04-implementacao-nextjs.md`.
5. Compor `app/page.tsx` e rever contraste e responsivo.

## Regras que não mudam

- Usar tokens **semânticos** (`bg-fundo`, `text-texto`, `bg-acao`), não hexadecimais soltos.
- Um botão cobre principal por vista; uma faixa de papel por página.
- Raios diferentes por nível: campo, cartão, painel, chapa oval.
- Server Components por defeito; `"use client"` só onde há interação.
- Texto de interface em frases simples, verbos claros, sem exclamações.

## Decisões tomadas

- **Moeda**: kwanza (AOA), sem decimais; locale `pt-AO` (`2 500 Kz`, datas `09/11/2026`).
- **Ícones**: SVGs próprios em `components/ui/icone.tsx`, sem biblioteca (conjunto pequeno, traço 1.5px).
- **Logótipo**: oficial, branco sobre chapa de cobre (`CafePalanca11.jpg`), em `public/marca/palanca-chapa.jpg` (completo) e `palanca-emblema.jpg` (emblema). Mostra-se tal como está, sem chapa creme.

## Pendências

- Exportar o logótipo em SVG (os recortes atuais são JPG da maquete).
- Fotografia de produto própria, seguindo o estilo do guia (luz lateral quente, fundo escuro).
