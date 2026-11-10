# Design tokens

Fonte de verdade: [tokens.css](tokens.css) (Tailwind v4). [tokens.json](tokens.json) espelha-o em formato DTCG para ferramentas de design. Este documento explica e justifica os valores.

Duas camadas:
1. **Primitivos** (`--color-espresso`, `--radius-chapa`…) — geram utilitários Tailwind.
2. **Semânticos** (`--color-fundo`, `--color-acao`…) — descrevem papéis. **Os componentes usam os semânticos.** Se um dia houver tema claro, só estes mudam.

## Cor

### Paleta primitiva

| Token | Hex | Função |
|---|---|---|
| `espresso` | `#15100C` | Fundo da página |
| `torra` | `#1F1813` | Superfície |
| `cacau` | `#2C2119` | Superfície elevada, cartões |
| `bronze` | `#4A3626` | Contornos decorativos |
| `bronze-claro` | `#86705B` | Contornos de campos e controlos |
| `cobre` | `#C9854A` | Acento principal |
| `cobre-claro` | `#DDA06A` | Hover, foco, texto de acento |
| `cobre-pressionado` | `#B87640` | Estado premido |
| `cobre-escuro` | `#8A4F22` | Texto de acento sobre papel |
| `creme` | `#EFE5D4` | Texto principal; faixa de papel |
| `papel` | `#E2D4BD` | Sombra/rasgão do papel |
| `latte` | `#B3A491` | Texto secundário |
| `sucesso` / `aviso` / `erro` | `#8FB07A` / `#E0B04F` / `#E5806A` | Estados |

O cobre vem do logótipo (tom médio do relevo). O gradiente metálico (`--gradiente-cobre`, `#E0A56F → #C9854A → #B87640`) imita a luz no metal; usa-se só em botão principal e selo.

### Semânticos

| Token | Aponta para | Utilitário |
|---|---|---|
| `fundo` | espresso | `bg-fundo` |
| `superficie` | torra | `bg-superficie` |
| `superficie-elevada` | cacau | `bg-superficie-elevada` |
| `superficie-papel` | creme | `bg-superficie-papel` |
| `texto` | creme | `text-texto` |
| `texto-suave` | latte | `text-texto-suave` |
| `texto-acento` | cobre-claro | `text-texto-acento` |
| `texto-papel` / `-suave` / `-acento` | espresso / bronze / cobre-escuro | texto sobre papel |
| `contorno` | bronze | `border-contorno` |
| `contorno-forte` | bronze-claro | `border-contorno-forte` |
| `acao` / `-hover` / `-ativa` / `-texto` | cobre / cobre-claro / cobre-pressionado / espresso | botão principal |

### Contrastes (WCAG 2.x, calculados)

| Texto | Fundo | Rácio | Resultado |
|---|---|---|---|
| creme | espresso | 15.1 | AAA |
| creme | cacau | 12.6 | AAA |
| latte | espresso | 7.8 | AAA |
| latte | cacau | 6.5 | AA |
| cobre | espresso | 6.2 | AA |
| cobre | cacau | 5.2 | AA |
| cobre-claro | espresso | 8.4 | AAA |
| erro / sucesso / aviso | espresso | 6.9 / 7.8 / 9.4 | AA |
| espresso (texto do botão) | cobre | 6.2 | AA |
| espresso | cobre-claro (hover) | 8.4 | AAA |
| espresso | cobre-pressionado | 5.1 | AA |
| espresso | creme (papel) | 15.1 | AAA |
| bronze | creme (papel) | 9.1 | AAA |
| cobre-escuro | creme (papel) | 5.2 | AA |
| cobre-escuro | papel (#E2D4BD) | 4.5 | AA (limite; só texto ≥ 18px ou 500+) |

Componentes (não texto, mínimo 3:1):

| Elemento | Fundo | Rácio |
|---|---|---|
| `bronze-claro` | espresso | 4.0 |
| `bronze-claro` | cacau | 3.4 |
| `bronze` | espresso | 1.7 — **só decorativo** (divisórias, contornos de cartão) |

Não usar: `latte` sobre papel (1.9), `cobre` sobre papel (2.4), `bronze` como contorno de campo.

## Tipografia

| Token | Valor |
|---|---|
| `font-display` (`font-serif`) | Newsreader, Iowan Old Style, Georgia, serif |
| `font-corpo` (`font-sans`) | Instrument Sans, Segoe UI, system-ui, sans-serif |

Ambas disponíveis em `next/font/google` (verificado na versão instalada). Newsreader tem eixo `opsz` 6–72 e peso 200–800; Instrument Sans tem eixo `wdth` 75–100 e peso 400–700.

| Token | Tamanho | Altura de linha | Uso |
|---|---|---|---|
| `text-xs` | 12px | 1.5 | Notas legais |
| `text-sm` | 14px | 1.55 | Legendas, rótulos |
| `text-base` | 16px | 1.6 | Corpo |
| `text-lg` | 18px | 1.6 | Corpo grande, preços |
| `text-xl` | 20→24px | 1.35 | Título de cartão |
| `text-2xl` | 24→32px | 1.2 | Subtítulos |
| `text-3xl` | 32→48px | 1.1 | Título de secção |
| `text-4xl` | 40→72px | 1.02 | Título de página |
| `text-5xl` | 48→96px | 0.98 | Herói |

Entre `→` o tamanho é fluido (`clamp`). Tracking: `display` −0.02em para títulos, `rotulo` +0.01em para rótulos pequenos.

Heurística: corpo a 16px, no mínimo; títulos em peso 300–400 (o contraste vem do tamanho e do eixo ótico, não do negrito).

## Espaço

Base de 4px (`--spacing: 0.25rem`): `p-1`=4px, `p-2`=8px, `p-4`=16px, `p-6`=24px, `p-12`=48px, `p-28`=112px. Contentores: `max-w-pagina` (1200px) e `max-w-leitura` (640px, ≈ 65 caracteres).

Escala preferida: 4, 8, 12, 16, 24, 32, 48, 64, 96, 112.

## Raios

| Token | Valor | Uso |
|---|---|---|
| `rounded-campo` | 8px | Inputs, tags pequenas |
| `rounded-cartao` | 16px | Cartões de produto, depoimentos |
| `rounded-painel` | 28px | Imagens de secção, painéis grandes |
| `rounded-chapa` | totalmente oval | Botões, selos, filtros — a assinatura |

## Sombras e elevação

| Token | Uso |
|---|---|
| `shadow-cartao` | Cartões em repouso (sombra escura + realce interior de 1px) |
| `shadow-elevada` | Menus, modais, cartão em hover |
| `shadow-chapa` | Botão principal e selo (realce de metal em cima, sombra cobre por baixo) |
| `shadow-foco` | Anel de foco alternativo para componentes sobre imagem |

Em fundo escuro, a elevação lê-se mais pela cor (`superficie` → `superficie-elevada`) do que pela sombra.

## Movimento

| Token | Valor |
|---|---|
| `duration-rapida` | 120ms |
| `duration-base` | 200ms |
| `duration-lenta` | 480ms |
| `ease-saida` | cubic-bezier(0.22, 1, 0.36, 1) |
| `ease-padrao` | cubic-bezier(0.4, 0.0, 0.2, 1) |

Redução de movimento tratada globalmente em `tokens.css`.

## Breakpoints (mobile-first)

| Token | Mínimo | Layout |
|---|---|---|
| (base) | 0 | 1 coluna, carrossel |
| `sm` | 640px | 2 colunas de cartões |
| `md` | 768px | navegação completa |
| `lg` | 1024px | 4 colunas de cartões, herói em 2 colunas |
| `xl` | 1280px | margens largas |

## Camadas (z-index)

`navbar` 40 · `menu` 50 · `modal` 60 · `toast` 70.

## Utilizar nos componentes

```tsx
// Certo — semântico
<div className="bg-superficie-elevada text-texto border border-contorno rounded-cartao shadow-cartao" />

// Errado — primitivo hexadecimal solto
<div className="bg-[#2C2119] text-[#EFE5D4]" />
```
