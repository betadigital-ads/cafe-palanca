# Depoimento

**Finalidade**: mostrar a opinião de um cliente, curta e com nome.

## Anatomia
Citação (Display itálico) · nome · classificação opcional (estrelas).

## Especificação
| Propriedade | Valor |
|---|---|
| Contentor | `superficie`, contorno `contorno`, `rounded-cartao`, `p-6` |
| Citação | Newsreader itálico, `text-xl`, `texto`, ≤ 160 caracteres, sem aspas decorativas gigantes |
| Autor | `text-sm` peso 500, `texto-suave`; formato "Nome, bairro/cidade" |
| Estrelas | 5 ícones 16px `acao`; os vazios `contorno-forte`. Texto equivalente "5 de 5" em `sr-only` |
| Grelha | 1 coluna (móvel), 3 colunas (≥ lg), alturas iguais |

## Estados
Estático, sem hover.

## Acessibilidade
- `<figure>` com `<blockquote>` e `<figcaption>`.
- Classificação por texto, não só por estrelas.

## Esqueleto
```tsx
// components/ui/depoimento.tsx
import { Icone } from "./icone";

export function Depoimento({ texto, autor, nota }: { texto: string; autor: string; nota?: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <figure className="flex h-full flex-col gap-5 rounded-cartao border border-contorno bg-superficie p-6">
      <blockquote className="font-serif text-xl italic">{texto}</blockquote>
      <figcaption className="mt-auto flex items-center justify-between text-sm text-texto-suave">
        <span className="font-medium">{autor}</span>
        {nota && (
          <span className="flex gap-0.5 text-acao">
            {Array.from({ length: 5 }, (_, i) => (
              <Icone key={i} nome="estrela" className={i < nota ? "" : "text-contorno-forte"} aria-hidden />
            ))}
            <span className="sr-only">{nota} de 5</span>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
```

## Copy
Citações reais de clientes, sem edição de sentido. Sem superlativos inventados.
