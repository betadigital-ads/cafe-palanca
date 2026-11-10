# Carrossel do menu

**Finalidade**: mostrar cartões de produto numa faixa horizontal com controlo por setas, ao lado de um título de secção e de "Ver menu completo".

## Anatomia
```
Título da secção                  [Ver menu completo]  (‹) (›)
▢ cartão   ▢ cartão   ▢ cartão   ▢ cartão  →
```

## Especificação
- Faixa `flex` com `overflow-x-auto`, `snap-x snap-mandatory`, cada cartão `snap-start` e `basis` 80% (móvel), 45% (`sm`), 23.5% (`lg`).
- Intervalo 24px. Barra de rolagem oculta visualmente (`[scrollbar-width:none]`), mantendo rolagem por toque e roda.
- Setas: `Botao variante="icone"`, `aria-label="Anterior"` / `"Seguinte"`. Desativadas nos extremos.
- **Sem avanço automático.** Sem pontos de paginação (a rolagem natural dispensa-os).
- Cabeçalho: título `text-3xl` Display; ligação `Botao contorno` à direita.

## Estados
| Elemento | Estado |
|---|---|
| Seta | hover cobre; desativada a 45% quando no início/fim |
| Cartão | ver [cartao-produto.md](cartao-produto.md) |

## Acessibilidade
- `<section aria-roledescription="carrossel" aria-label="Menu de assinatura">`; cada cartão `role="group"` com `aria-label="Item 2 de 8"` se for útil.
- Rolável por teclado (`tabIndex={0}` na faixa, setas do teclado nativas) e botões focáveis.
- Cartões fora de vista continuam acessíveis a leitores de ecrã (sem `aria-hidden`).

## Tipo
Client Component (refs e rolagem). Os cartões vêm como `children` de Server Components.

## Esqueleto
```tsx
// components/sections/carrossel-menu.tsx
"use client";
import { useRef, useState } from "react";
import { Botao } from "@/components/ui/botao";

export function CarrosselMenu({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  const faixa = useRef<HTMLUListElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  const mover = (d: 1 | -1) => {
    const el = faixa.current; if (!el) return;
    el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const atualizar = () => {
    const el = faixa.current; if (!el) return;
    setInicio(el.scrollLeft <= 4);
    setFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  return (
    <section aria-roledescription="carrossel" aria-label={titulo} className="mx-auto max-w-pagina px-4 py-16 md:px-8 lg:py-24 xl:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-serif text-3xl">{titulo}</h2>
        <div className="flex items-center gap-3">
          <Botao href="/menu" variante="contorno" tamanho="sm">Ver menu completo</Botao>
          <Botao variante="icone" aria-label="Anterior" disabled={inicio} onClick={() => mover(-1)}>‹</Botao>
          <Botao variante="icone" aria-label="Seguinte" disabled={fim} onClick={() => mover(1)}>›</Botao>
        </div>
      </div>
      <ul ref={faixa} onScroll={atualizar} tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&>li]:basis-[80%] [&>li]:shrink-0 [&>li]:snap-start sm:[&>li]:basis-[45%] lg:[&>li]:basis-[calc(25%-1.125rem)]">
        {children}
      </ul>
    </section>
  );
}
```
Os filhos devem ser `<li>` com `CartaoProduto`. Em `Botao variante="icone"` trocar `‹ ›` por `Icone`.
