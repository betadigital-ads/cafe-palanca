# Cartão de produto

**Finalidade**: apresentar uma bebida ou doce do menu e permitir adicioná-lo ao pedido.

## Anatomia
```
┌──────────────┐
│    imagem    │  aspect 4:5 (topo, raio do cartão)
├──────────────┤
│ Título       │  Display, text-xl
│ Descrição    │  text-sm, texto-suave, máx. 2 linhas
│ 2 500 Kz  (+)│  preço 600 tabular; botão ícone 44px
└──────────────┘
```

## Especificação visual
- Fundo `superficie-elevada`, contorno `contorno` 1px, `rounded-cartao`, `shadow-cartao`.
- Imagem a toda a largura, com escurecimento inferior subtil para fundir com o corpo.
- Corpo com `p-5`, intervalo 8px entre texto, preço e botão alinhados pela base.
- Largura fluida; mínimo 220px no carrossel.

## Estados
| Estado | Tratamento |
|---|---|
| Hover do cartão | Contorno → `contorno-forte`, `shadow-elevada`. Imagem sem *zoom* |
| Foco no botão "+" | Anel global |
| Adicionado | Botão "+" muda para ✓ por 1.5s e `aria-live` anuncia "Adicionado ao pedido" |
| Esgotado | Imagem a 60%, preço riscado substituído por "Esgotado", botão desativado |
| A carregar (imagem) | Fundo `superficie` com cor sólida; sem *shimmer* |

## Dados (tipo)
```ts
export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;          // kwanzas inteiros (AOA, sem decimais)
  imagem: { src: string; alt: string };
  esgotado?: boolean;
};
```

## Formatação de preço
```ts
// lib/formatar.ts
const kwanza = new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA", maximumFractionDigits: 0 });
export const formatarPreco = (kz: number) => kwanza.format(kz); // 2500 -> "2 500 Kz"
```

## Acessibilidade
- Estrutura `<article aria-labelledby>`; título em `h3`.
- O botão tem rótulo completo: `aria-label="Adicionar Chocolate Dream ao pedido"`.
- Preço em `<data value>` ou texto simples formatado com `formatarPreco()` (ver abaixo): `2 500 Kz`.
- Cartão inteiro **não** é uma ligação; só o título ou um "Ver detalhe" se existir página de produto.

## Esqueleto
```tsx
// components/ui/cartao-produto.tsx  (Server Component)
import Image from "next/image";
import { BotaoAdicionar } from "./botao-adicionar"; // "use client"
import type { Produto } from "@/lib/dados/menu";
import { formatarPreco } from "@/lib/formatar";

export function CartaoProduto({ produto }: { produto: Produto }) {
  const preco = formatarPreco(produto.preco);
  return (
    <article aria-labelledby={`p-${produto.id}`}
      className="group flex flex-col overflow-hidden rounded-cartao border border-contorno bg-superficie-elevada shadow-cartao transition-[border-color,box-shadow] duration-base ease-padrao hover:border-contorno-forte hover:shadow-elevada">
      <div className="relative aspect-[4/5]">
        <Image src={produto.imagem.src} alt={produto.imagem.alt} fill className="object-cover"
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 80vw" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 id={`p-${produto.id}`} className="font-serif text-xl">{produto.nome}</h3>
        <p className="line-clamp-2 text-sm text-texto-suave">{produto.descricao}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold tabular-nums">{preco}</span>
          <BotaoAdicionar produtoId={produto.id} nome={produto.nome} esgotado={produto.esgotado} />
        </div>
      </div>
    </article>
  );
}
```

## Copy
Descrição curta e concreta, uma linha por ingrediente-chave: "Camadas de chocolate e ganache de seda." Sem adjetivos vagos.
