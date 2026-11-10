# Campo de formulário

**Finalidade**: recolher texto (email da newsletter, nome e telefone da reserva).

## Anatomia
`Rótulo` (sempre visível) · campo · texto de ajuda ou erro.

## Especificação
| Propriedade | Valor |
|---|---|
| Altura | 48px |
| Fundo | `superficie` |
| Contorno | 1px `contorno-forte` (4.0:1) |
| Raio | `rounded-campo` (8px). Variante `chapa` (oval) com botão embutido para a newsletter |
| Texto | `text-base` `texto`; *placeholder* `texto-suave` (nunca substitui o rótulo) |
| Rótulo | `text-sm` peso 500, acima do campo, 8px de intervalo |
| Ajuda/erro | `text-sm`; erro em `erro` com ícone e texto |

## Estados
| Estado | Tratamento |
|---|---|
| Repouso | contorno `contorno-forte` |
| Hover | contorno `latte` |
| Foco | contorno `cobre-claro` + anel global |
| Preenchido | igual a repouso |
| Erro | contorno `erro`, `aria-invalid="true"`, mensagem ligada por `aria-describedby` |
| Desativado | opacidade 45% |
| Sucesso | mensagem confirma o que aconteceu ("Inscrição feita. Vais receber um email.") |

## Acessibilidade
- `<label htmlFor>` sempre visível. Em campos de uma linha como a newsletter, o rótulo pode ficar `sr-only` se o botão tiver texto claro, mas o *placeholder* não conta como rótulo.
- `type`/`autoComplete`/`inputMode` corretos (`email`, `tel`).
- Mensagem de erro em `role="alert"` ou região `aria-live="polite"`.
- Erros dizem o que corrigir: "Escreve um email válido, por exemplo nome@exemplo.pt".

## Tipo
Client Component se controlado; pode ser Server com `<form action>` (Server Action) e validação nativa.

## Esqueleto
```tsx
// components/ui/campo.tsx
import { useId } from "react";
import { cn } from "@/lib/cn";

type Props = React.ComponentProps<"input"> & { rotulo: string; ajuda?: string; erro?: string };

export function Campo({ rotulo, ajuda, erro, className, ...input }: Props) {
  const id = useId();
  const descId = `${id}-d`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">{rotulo}</label>
      <input id={id} aria-invalid={!!erro || undefined} aria-describedby={erro || ajuda ? descId : undefined}
        className={cn(
          "h-12 rounded-campo border bg-superficie px-4 text-texto placeholder:text-texto-suave",
          "transition-colors duration-base hover:border-latte focus:border-cobre-claro",
          erro ? "border-erro" : "border-contorno-forte", className)}
        {...input} />
      {(erro || ajuda) && (
        <p id={descId} className={cn("text-sm", erro ? "text-erro" : "text-texto-suave")}>{erro ?? ajuda}</p>
      )}
    </div>
  );
}
```
