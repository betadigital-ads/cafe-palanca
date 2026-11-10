# Faixa de valores (papel rasgado)

**Finalidade**: dizer em quatro frases o que distingue a casa. É o único bloco claro da página: o contraste cria a pausa.

## Anatomia
Borda superior rasgada (fundo escuro → papel) + 4 itens: `Chapa icone` + título + frase.

## Especificação
| Propriedade | Valor |
|---|---|
| Fundo | `superficie-papel` (creme) |
| Borda superior | Máscara/SVG com rasgão irregular, 24–32px de altura, cor `papel` por baixo para dar espessura |
| Padding | `py-10` (móvel) a `py-14` (≥ lg) |
| Grelha | 2×2 (móvel), 4 colunas (≥ lg) com divisórias verticais 1px `bronze` a 25% |
| Título do item | `text-base` peso 600, `texto-papel` |
| Frase | `text-sm`, `texto-papel-suave` (bronze, 9.1:1) |
| Selo | `Chapa tema="papel"` 56px |

## Acessibilidade
- Contraste: espresso 15.1:1, bronze 9.1:1. Não usar latte nem cobre sobre este fundo.
- Lista semântica `<ul>`; ícones `aria-hidden`.
- A borda rasgada é decorativa (`aria-hidden`, `role="presentation"`).

## Tipo
Server Component.

## Esqueleto
```tsx
// components/sections/faixa-valores.tsx
import { Chapa } from "@/components/ui/chapa";
import { Icone } from "@/components/ui/icone";

const valores = [
  { icone: "grao", titulo: "Grão de origem", texto: "Comprado a produtores que conhecemos." },
  { icone: "folha", titulo: "Torra semanal", texto: "Torrado aqui, moído quando pedes." },
  { icone: "chavena", titulo: "Baristas treinados", texto: "Cada bebida feita à mão ao balcão." },
  { icone: "coracao", titulo: "Feito com cuidado", texto: "Receitas da casa, sem atalhos." },
] as const;

export function FaixaValores() {
  return (
    <section className="relative bg-superficie-papel text-texto-papel" aria-label="Os nossos valores">
      <div aria-hidden className="rasgao-papel absolute inset-x-0 top-0 h-8 -translate-y-full bg-superficie-papel" />
      <ul className="mx-auto grid max-w-pagina grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 md:px-8 lg:grid-cols-4 lg:py-14 xl:px-12">
        {valores.map((v) => (
          <li key={v.titulo} className="flex items-start gap-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-bronze/25 lg:[&:not(:first-child)]:pl-6">
            <Chapa tema="papel"><Icone nome={v.icone} /></Chapa>
            <div>
              <h3 className="text-base font-semibold font-sans tracking-normal">{v.titulo}</h3>
              <p className="mt-1 text-sm text-texto-papel-suave">{v.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```css
/* globals.css — rasgão: máscara com polígono irregular (ajustar pontos a gosto) */
.rasgao-papel {
  clip-path: polygon(0 100%, 0 55%, 4% 40%, 9% 60%, 15% 35%, 22% 55%, 30% 30%, 38% 58%, 47% 38%, 55% 62%,
    63% 34%, 72% 56%, 80% 36%, 88% 60%, 95% 42%, 100% 55%, 100% 100%);
}
```

## Regra de uso
Uma vez por página. Não repetir em secções seguintes.
