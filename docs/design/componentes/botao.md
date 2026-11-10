# Botão

**Finalidade**: acionar uma ação ou navegar. O botão principal em cobre é o ponto de ação da vista; usar **um** por vista.

## Anatomia
`[ ícone? ] Rótulo [ ícone? ]` dentro de uma chapa oval (`rounded-chapa`).

## Variantes
| Variante | Aspeto | Quando |
|---|---|---|
| `principal` | Gradiente cobre, texto espresso, `shadow-chapa` | Ação principal ("Ver menu", "Reservar mesa") |
| `contorno` | Transparente, contorno `contorno-forte`, texto `texto` | Ação secundária ("Ver menu completo") |
| `fantasma` | Sem contorno, texto `texto`, hover `superficie-elevada` | Terciária, barras de ferramentas |
| `icone` | Círculo 44px, contorno `contorno-forte` | Setas do carrossel, "+" do cartão |

## Tamanhos
| Tamanho | Altura | Padding X | Texto |
|---|---|---|---|
| `md` (padrão) | 44px | 24px | `text-base` peso 500 |
| `sm` | 36px (alvo de toque 44px com margem) | 16px | `text-sm` |
| `lg` | 52px | 32px | `text-lg` |

## Estados
| Estado | Principal | Contorno |
|---|---|---|
| Repouso | `bg-[image:var(--gradiente-cobre)]` | `border-contorno-forte` |
| Hover | `bg-acao-hover` | `border-acao text-texto-acento` |
| Foco | Anel global cobre claro | Anel global |
| Premido | `bg-acao-ativa` | `bg-superficie-elevada` |
| Desativado | opacidade 45%, sem sombra | opacidade 45% |
| A carregar | `aria-busy`, indicador 16px, rótulo mantém-se | idem |

Transições: `transition-colors duration-base ease-padrao`.

## Tokens usados
`acao`, `acao-hover`, `acao-ativa`, `acao-texto`, `contorno-forte`, `texto`, `texto-acento`, `shadow-chapa`, `rounded-chapa`.

## Responsivo
Largura do conteúdo; em móvel, ações principais de formulário a 100% da largura. Em `Heroi`, os dois botões empilham abaixo de `sm`.

## Acessibilidade
- Elemento correto: `<a>` (via `Link`) para navegar, `<button type="button">` para agir.
- Botões só com ícone levam `aria-label` ("Seguinte", "Adicionar Chocolate Dream ao pedido").
- Ligação desativada: não usar `disabled`; usar `aria-disabled="true"` e `tabIndex={-1}`.
- Contraste: espresso sobre cobre 6.2:1.
- O ícone de seta (→) é decorativo (`aria-hidden`) e só se usa quando a ação avança uma página.

## Esqueleto
```tsx
// components/ui/botao.tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variante = "principal" | "contorno" | "fantasma" | "icone";
type Tamanho = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-chapa font-medium transition-colors " +
  "duration-base ease-padrao disabled:opacity-45 disabled:cursor-not-allowed aria-disabled:opacity-45";

const variantes: Record<Variante, string> = {
  principal:
    "bg-[image:var(--gradiente-cobre)] text-acao-texto shadow-chapa hover:bg-none hover:bg-acao-hover active:bg-acao-ativa",
  contorno:
    "border border-contorno-forte text-texto hover:border-acao hover:text-texto-acento active:bg-superficie-elevada",
  fantasma: "text-texto hover:bg-superficie-elevada",
  icone:
    "size-11 border border-contorno-forte text-texto hover:border-acao hover:text-texto-acento",
};

const tamanhos: Record<Tamanho, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

type Props = {
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
  | ({ href?: undefined } & Omit<React.ComponentProps<"button">, "className" | "children">)
);

export function Botao({ variante = "principal", tamanho = "md", className, children, ...resto }: Props) {
  const classes = cn(base, variantes[variante], variante !== "icone" && tamanhos[tamanho], className);
  if ("href" in resto && resto.href) {
    return <Link {...resto} className={classes}>{children}</Link>;
  }
  return <button type="button" {...(resto as React.ComponentProps<"button">)} className={classes}>{children}</button>;
}
```

## Copy
Verbos claros: "Ver menu", "Reservar mesa", "Adicionar ao pedido", "Enviar". Sem "Clica aqui". Máx. 3 palavras.
