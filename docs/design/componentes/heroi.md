# Herói

**Finalidade**: primeira vista da página. Mostra o que a casa serve (a chávena, o café) e leva a uma ação: ver o menu.

## Anatomia
```
┌───────────────────────────────────────────┐
│ Título display (3 linhas)       ┌────────┐│
│ Texto de apoio (≤ 2 linhas)     │ imagem ││  ◔ selo oval (sobreposto)
│ [Ver menu]  [Ver a nossa história]│       ││
└───────────────────────────────────────────┘
```

## Especificação
| Propriedade | Valor |
|---|---|
| Layout | ≥ lg: 2 colunas (5/7), imagem sangra à direita; < lg: texto, depois imagem |
| Título | `text-5xl`, Display peso 300, `max-w-[12ch]`/3 linhas, cor `texto`; **sem** palavra destacada |
| Texto | `text-lg`, `texto-suave`, `max-w-leitura` (≤ 45 caracteres por linha) |
| Ações | `Botao principal` + `Botao contorno`; intervalo 16px |
| Imagem | `next/image` `priority`, fotografia de chávena com luz lateral, fundo desfocado escuro; `rounded-painel` ou recorte orgânico |
| Selo | `Chapa variante selo` sobreposto no canto da imagem, rotação 0° |
| Fundo | `fundo`; opcional: textura de grão a 3% (imagem pequena repetida) |
| Altura | `min-h-[min(48rem,100dvh-4.5rem)]` |

## Movimento (o único momento orquestrado)
Entrada única ao carregar: título → texto → botões → imagem, 480ms, atraso 80ms entre elementos, `ease-saida`, opacidade 0→1 e translação Y 12px→0. Com `prefers-reduced-motion` aparece tudo de imediato.

```css
/* globals.css */
@keyframes entrada { from { opacity: 0; transform: translateY(12px); } }
.entrada { animation: entrada var(--duration-lenta) var(--ease-saida) both; animation-delay: calc(var(--i, 0) * 80ms); }
```

## Acessibilidade
- Um único `<h1>` na página.
- Imagem com `alt` descritivo ("Chávena de café com arte de leite em forma de coração").
- Contraste de texto sobre imagem: nunca texto sobre foto; texto sobre `fundo`.

## Tipo
Server Component.

## Esqueleto
```tsx
// components/sections/heroi.tsx
import Image from "next/image";
import { Botao } from "@/components/ui/botao";

export function Heroi() {
  return (
    <section aria-labelledby="titulo-heroi" className="mx-auto grid max-w-pagina items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-12 lg:py-24 xl:px-12">
      <div className="lg:col-span-5">
        <h1 id="titulo-heroi" className="entrada font-serif text-5xl font-light" style={{ "--i": 0 } as React.CSSProperties}>
          Cada chávena conta uma história.
        </h1>
        <p className="entrada mt-6 max-w-leitura text-lg text-texto-suave" style={{ "--i": 1 } as React.CSSProperties}>
          Café de especialidade e pastelaria feitos ao balcão, todos os dias.
        </p>
        <div className="entrada mt-10 flex flex-wrap gap-4" style={{ "--i": 2 } as React.CSSProperties}>
          <Botao href="/menu">Ver menu</Botao>
          <Botao href="/sobre" variante="contorno">A nossa história</Botao>
        </div>
      </div>
      <div className="entrada relative aspect-[4/3] overflow-hidden rounded-painel lg:col-span-7" style={{ "--i": 3 } as React.CSSProperties}>
        <Image src="/imagens/heroi-chavena.jpg" alt="Chávena de café com arte de leite em forma de coração" fill priority className="object-cover" sizes="(min-width:1024px) 58vw, 100vw" />
      </div>
    </section>
  );
}
```

## Copy
Títulos curtos, concretos, sem exclamações. Evitar "experiência premium", "momentos doces". Preferir o que se serve ("Café moído ao momento").
