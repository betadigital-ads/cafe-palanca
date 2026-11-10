# Navbar

**Finalidade**: marca e navegação principal, fixa no topo.

## Anatomia
`Logótipo (emblema de cobre + texto "Café Palanca")` · `Ligações (Início, Menu, Sobre nós, Loja, Contactos)` · `Pesquisa` `Pedido (n)` · `Botão "Reservar mesa"`.

## Especificação
| Propriedade | Valor |
|---|---|
| Altura | 72px (≥ md), 64px (móvel) |
| Fundo | `fundo` a 80% com `backdrop-blur`; ao rolar, contorno inferior `contorno` |
| Posição | `sticky top-0`, `z-navbar` |
| Ligações | `text-sm` peso 500; ativa com sublinhado cobre 2px a 6px por baixo |
| Ações | Botão `icone` (pesquisa), `icone` com contador (pedido), `Botao` contorno "Reservar mesa" |

## Responsivo
- **≥ md**: ligações em linha, centradas no espaço restante.
- **< md**: logótipo + botão do pedido + botão de menu. Menu abre em painel de ecrã inteiro (`z-menu`), `superficie`, ligações em `text-2xl` Display, botão principal no fim.

## Estados
| Elemento | Estados |
|---|---|
| Ligação | repouso `texto-suave` → hover `texto` → ativa `texto` + sublinhado, `aria-current="page"` |
| Menu móvel | fechado/aberto, 200ms `ease-padrao` (opacidade + translação 8px) |
| Contador do pedido | oculto em 0; ≥ 1 selo cobre 18px com número, `aria-label="Pedido: 2 artigos"` |

## Acessibilidade
- `<header>` com `<nav aria-label="Principal">`.
- Menu móvel: botão com `aria-expanded` e `aria-controls`; foco preso no painel aberto; `Esc` fecha e devolve foco ao botão; corpo sem *scroll* enquanto aberto.
- Ligação "Saltar para o conteúdo" visível ao receber foco.

## Tipo
Client Component (estado do menu). Extrair só o menu móvel para um Client e manter o resto do `Navbar` em Server se possível.

## Esqueleto
```tsx
// components/sections/navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Botao } from "@/components/ui/botao";
import { Logotipo } from "@/components/ui/logotipo";

const ligacoes = [
  { href: "/", rotulo: "Início" },
  { href: "/menu", rotulo: "Menu" },
  { href: "/sobre", rotulo: "Sobre nós" },
  { href: "/loja", rotulo: "Loja" },
  { href: "/contactos", rotulo: "Contactos" },
];

export function Navbar() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);
  return (
    <header className="sticky top-0 z-navbar border-b border-contorno bg-fundo/80 backdrop-blur">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-campo focus:bg-superficie-elevada focus:px-3 focus:py-2">
        Saltar para o conteúdo
      </a>
      <div className="mx-auto flex h-16 max-w-pagina items-center justify-between gap-6 px-4 md:h-18 md:px-8 xl:px-12">
        <Link href="/" className="flex items-center gap-3 font-serif text-2xl">
          <Logotipo className="h-11 px-3 py-1.5" />Café Palanca
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-8 text-sm font-medium">
            {ligacoes.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={caminho === l.href ? "page" : undefined}
                  className="py-2 text-texto-suave transition-colors duration-base hover:text-texto aria-[current=page]:text-texto aria-[current=page]:underline aria-[current=page]:decoration-acao aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Botao href="/reservas" variante="contorno" tamanho="sm" className="hidden md:inline-flex">Reservar mesa</Botao>
          <Botao variante="fantasma" className="md:hidden" aria-expanded={aberto} aria-controls="menu-movel"
            onClick={() => setAberto((v) => !v)}>Menu</Botao>
        </div>
      </div>
      {/* Painel móvel: id="menu-movel", hidden quando !aberto */}
    </header>
  );
}
```
