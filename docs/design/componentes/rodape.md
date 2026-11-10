# Rodapé

**Finalidade**: navegação secundária, contactos, newsletter e informação legal.

## Anatomia
```
Café Palanca            Ligações    Menu       Ajuda        Newsletter
texto curto             Início      Cafés      Contactos    [ email        (→) ]
redes sociais           Sobre nós   Pastelaria Envios       
                                                Privacidade
─────────────────────────────────────────────────────────────────────────────
© 2026 Café Palanca. Todos os direitos reservados.
```

## Especificação
| Propriedade | Valor |
|---|---|
| Fundo | `superficie`, contorno superior `contorno` |
| Grelha | 1 coluna (móvel), 2 (`sm`), 5 colunas (≥ lg): marca (2) + 3 listas + newsletter |
| Títulos de coluna | `text-sm` peso 600, `texto` |
| Ligações | `text-sm`, `texto-suave`, hover `texto`; alvo ≥ 44px de altura em móvel |
| Newsletter | `Campo` variante oval com botão `icone` embutido; texto "Recebe novidades do menu. Sem spam." |
| Redes sociais | Botões `icone` 44px com `aria-label` ("Instagram do Café Palanca") |
| Linha final | `text-xs`, `texto-suave`, separada por contorno |

## Estados
Ligações: hover/foco como na navbar. Newsletter: estados do [campo](campo-formulario.md); após sucesso, o campo é substituído pela confirmação.

## Acessibilidade
- `<footer>` com blocos `<nav aria-label="Rodapé: …">` por lista.
- Newsletter em `<form>` com `<label>` (pode ser `sr-only`).
- Contraste: `texto-suave` sobre `superficie` 7.2:1.

## Tipo
Server Component; formulário da newsletter como Client ou Server Action.

## Esqueleto
```tsx
// components/sections/rodape.tsx
import Link from "next/link";
import { Campo } from "@/components/ui/campo";
import { Botao } from "@/components/ui/botao";
import { Logotipo } from "@/components/ui/logotipo";

const colunas = [
  { titulo: "Ligações", itens: [["Início", "/"], ["Sobre nós", "/sobre"], ["Contactos", "/contactos"]] },
  { titulo: "Menu", itens: [["Cafés", "/menu#cafes"], ["Pastelaria", "/menu#pastelaria"], ["Bebidas frias", "/menu#frias"]] },
  { titulo: "Ajuda", itens: [["Perguntas frequentes", "/faq"], ["Envios", "/envios"], ["Privacidade", "/privacidade"]] },
] as const;

export function Rodape() {
  return (
    <footer className="border-t border-contorno bg-superficie">
      <div className="mx-auto grid max-w-pagina gap-10 px-4 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-6 xl:px-12">
        <div className="lg:col-span-2">
          <Logotipo variante="completo" className="size-44 p-2" />
          <p className="mt-3 max-w-xs text-sm text-texto-suave">Café de especialidade e pastelaria feitos ao balcão.</p>
        </div>
        {colunas.map((c) => (
          <nav key={c.titulo} aria-label={`Rodapé: ${c.titulo}`}>
            <h2 className="font-sans text-sm font-semibold tracking-normal">{c.titulo}</h2>
            <ul className="mt-3 space-y-1">
              {c.itens.map(([r, h]) => (
                <li key={h}><Link href={h} className="inline-block py-2 text-sm text-texto-suave hover:text-texto">{r}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
        <form className="sm:col-span-2 lg:col-span-1" action="/api/newsletter" method="post">
          <Campo rotulo="Email" type="email" name="email" autoComplete="email" ajuda="Recebe novidades do menu. Sem spam." />
          <Botao type="submit" variante="contorno" tamanho="sm" className="mt-3">Subscrever</Botao>
        </form>
      </div>
      <p className="border-t border-contorno px-4 py-5 text-center text-xs text-texto-suave">
        © 2026 Café Palanca. Todos os direitos reservados.
      </p>
    </footer>
  );
}
```
