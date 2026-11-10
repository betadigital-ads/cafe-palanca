# Implementação na stack

Stack atual: Next.js 16.4.5 (App Router, `cacheComponents` e `partialPrefetching` ligados em `next.config.ts`), React 19.3, Tailwind CSS 4 via `@tailwindcss/turbopack`, TypeScript estrito, alias `@/*` → raiz.

> O `AGENTS.md` do projeto avisa que esta versão do Next tem alterações face ao que é habitual. As APIs abaixo (`next/font/google`, `LayoutProps<"/">`) foram confirmadas no código instalado e em `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`. Antes de usar outras APIs (`next/image`, `Link`, *streaming*), ler o guia correspondente em `node_modules/next/dist/docs/`.

## 1. Tokens → `app/globals.css`

Substituir o conteúdo atual de `app/globals.css` pelo de [tokens.css](tokens.css). O ficheiro atual é o do *create-next-app* (variáveis `--background`/`--foreground`, Arial, modo escuro por `prefers-color-scheme`); passa a haver um só tema escuro permanente (`color-scheme: dark`).

Efeitos a ter em conta:
- Os utilitários `bg-fundo`, `text-texto`, `rounded-cartao`, `font-serif`… ficam disponíveis automaticamente.
- `app/page.tsx` atual usa classes como `bg-zinc-50`, `dark:bg-black`; será reescrito com a página real.

## 2. Fontes → `app/layout.tsx`

As variáveis CSS têm de coincidir com as de `tokens.css` (`--font-newsreader`, `--font-instrument`):

```tsx
import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],          // eixo ótico para títulos grandes
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Café Palanca", template: "%s · Café Palanca" },
  description: "Café de especialidade e pastelaria feitos ao balcão.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-AO" className={`${newsreader.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col bg-fundo text-texto antialiased">
        {children}
      </body>
    </html>
  );
}
```

Notas:
- `latin-ext` cobre os caracteres acentuados menos comuns.
- `axes: ["opsz"]` está documentado em `font.md` (secção `axes`) e a Newsreader declara o eixo `opsz` (6–72) nos dados de fontes do Next instalado. Como é fonte variável, não se indica `weight`.
- `tokens.css` compila com o Tailwind instalado (verificado), incluindo os utilitários `z-navbar` e `duration-base`, definidos com `@utility` porque o Tailwind v4 não tem espaço de nomes para z-index nem durações.
- Geist deixa de ser usado: remover `Geist`/`Geist_Mono` do layout.

## 3. Utilitário `cn()` (sem dependências)

```ts
// lib/cn.ts
export function cn(...partes: Array<string | false | null | undefined>) {
  return partes.filter(Boolean).join(" ");
}
```

Não há `clsx`, `tailwind-merge` ou `class-variance-authority` instalados. Para variantes usar mapas de objetos (ver [botao.md](componentes/botao.md)). Se a combinação de classes em conflito se tornar um problema, instalar `tailwind-merge` — decisão a tomar à parte, não necessária agora.

## 4. Server vs Client Components

| Precisa de… | Tipo |
|---|---|
| Só renderizar markup | Server (por defeito) |
| `useState`, `useEffect`, eventos, `window` | Client (`"use client"` no topo) |
| Menu móvel, carrossel, campo controlado, botão "+" | Client, pequenos e folhas da árvore |

Manter o Client mínimo: `CartaoProduto` é Server; só o botão de adicionar é Client. Com `cacheComponents` ligado, dados dinâmicos (pedido, carrinho) devem ficar atrás de `<Suspense>`; o menu estático pode ser *cached*. Ler `node_modules/next/dist/docs/01-app/` (secção sobre *cache components*) antes de implementar dados reais.

## 5. Imagens

Usar `next/image` com `fill` + `sizes` dentro de um contentor com proporção fixa (`aspect-[4/5]`) para evitar saltos de layout. Imagem acima da dobra (herói) com `priority`. `alt` sempre preenchido (vazio se decorativa). Fotografias em `public/imagens/` e formatos AVIF/WebP gerados pelo Next.

```tsx
<div className="relative aspect-[4/5] overflow-hidden rounded-cartao">
  <Image src="/imagens/bolo-chocolate.jpg" alt="Fatia de bolo de chocolate com ganache"
         fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 80vw" className="object-cover" />
</div>
```

## 6. Logótipo

Ficheiros em `public/marca/`: `palanca-chapa.jpg` (completo, 710×710) e `palanca-emblema.jpg` (emblema, 180×176), recortados de `docs-design/design/referencias/CafePalanca11.jpg`. São brancos sobre chapa de cobre, com fundo próprio: mostram-se tal como estão, sem chapa creme.

```tsx
// components/ui/logotipo.tsx
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logotipo({ variante = "emblema", className, priority }: { variante?: "emblema" | "completo"; className?: string; priority?: boolean }) {
  const completo = variante === "completo";
  return (
    <Image
      src={completo ? "/marca/palanca-chapa.jpg" : "/marca/palanca-emblema.jpg"}
      alt="Café Palanca"
      width={completo ? 710 : 180}
      height={completo ? 710 : 176}
      priority={priority}
      className={cn(completo ? "h-auto rounded-painel" : "w-auto rounded-chapa", className)}
    />
  );
}
```

Navbar: `<Logotipo className="h-11" />` ao lado do texto "Café Palanca" (visível a partir de 480px). Rodapé: `variante="completo"` com `w-44`.

## 7. Ligações e navegação

Usar `next/link` para navegação interna. O `Botao` com `href` renderiza `Link`; sem `href`, `button`. Ver [botao.md](componentes/botao.md).

## 8. Acessibilidade e qualidade

- ESLint já configurado (`eslint-config-next`); correr `npm run lint`.
- Verificar foco visível, contraste e navegação por teclado em cada componente antes de o dar por concluído.
- Testar a 360, 768, 1024 e 1440px; respeitar `prefers-reduced-motion`.

## 9. Ordem sugerida de implementação

1. `globals.css` + `layout.tsx` (tokens e fontes).
2. `lib/cn.ts`, `Icone`, `Botao`, `Chapa`.
3. `CartaoProduto`, `Depoimento`, `CampoFormulario`.
4. `Navbar`, `Heroi`, `FaixaValores`, `CarrosselMenu`, `Rodape`.
5. Compor `app/page.tsx`; rever contraste e responsivo.
