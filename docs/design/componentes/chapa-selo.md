# Chapa / Selo

**Finalidade**: elemento de marca. Material de cobre em forma oval ou circular que contém um ícone, um número ou uma frase curta. É a assinatura visual do sistema (vem do letreiro de cobre).

## Anatomia
Placa (fundo bronze `--gradiente-bronze`) + rebordo de cobre 1.5px + conteúdo central.

## Variantes
| Variante | Forma | Tamanho | Uso |
|---|---|---|---|
| `icone` | Círculo | 56px (ícone 24px) | Valores da casa na faixa de papel |
| `oval` | Estádio | altura 40–64px | Etiqueta de produto ("Novo", "Da casa") |
| `selo` | Círculo | 120px, texto em arco | Selo "Feito com amor" no herói |

## Tema de fundo
- Sobre escuro: placa `--gradiente-bronze`, rebordo `cobre`, ícone `texto-acento`.
- Sobre papel: placa `espresso` ao 8%, rebordo `cobre-escuro`, ícone `texto-papel-acento`.

## Estados
Estático por defeito. Se for clicável, comporta-se como `Botao` variante `icone` (hover: rebordo `acao-hover`).

## Tokens
`rounded-chapa`, `shadow-chapa`, `bronze`, `cobre`, `cobre-escuro`, `texto-acento`.

## Acessibilidade
Decorativo: `aria-hidden`. Se tem significado sozinho (ex.: "Novo"), texto visível dentro. O texto em arco do selo é duplicado num `<span class="sr-only">`.

## Esqueleto
```tsx
// components/ui/chapa.tsx
import { cn } from "@/lib/cn";

export function Chapa({
  tema = "escuro", className, children,
}: { tema?: "escuro" | "papel"; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-chapa border-[1.5px]",
        tema === "escuro"
          ? "border-cobre bg-[image:var(--gradiente-bronze)] text-texto-acento shadow-cartao"
          : "border-cobre-escuro bg-espresso/10 text-texto-papel-acento",
        className,
      )}
    >
      {children}
    </span>
  );
}
```
