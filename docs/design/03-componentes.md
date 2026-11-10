# Catálogo de componentes

Todos usam apenas tokens semânticos de [tokens.css](tokens.css). Cada componente tem a sua especificação em `componentes/`.

## Inventário

| Componente | Camada | Tipo | Especificação | Inspirado em |
|---|---|---|---|---|
| Botão | `ui` | Server (ligação) / Client (ação) | [botao.md](componentes/botao.md) | "Explorar menu", "Reservar mesa" |
| Chapa/Selo | `ui` | Server | [chapa-selo.md](componentes/chapa-selo.md) | Selo "Feito com amor", ícones circulares |
| Campo de formulário | `ui` | Client | [campo-formulario.md](componentes/campo-formulario.md) | Newsletter do rodapé |
| Ícones | `ui` | Server | [icones.md](componentes/icones.md) | Ícones de traço |
| Logótipo | `ui` | Server | [04-implementacao-nextjs.md](04-implementacao-nextjs.md) (secção 6) | Logótipo oficial |
| Cartão de produto | `ui` | Server + botão Client | [cartao-produto.md](componentes/cartao-produto.md) | Cartões de bolo/bebida com "+" |
| Depoimento | `ui` | Server | [depoimento.md](componentes/depoimento.md) | "O que dizem os clientes" |
| Navbar | `sections` | Client (menu móvel) | [navbar.md](componentes/navbar.md) | Cabeçalho |
| Herói | `sections` | Server | [heroi.md](componentes/heroi.md) | Herói com chávena |
| Faixa de valores | `sections` | Server | [faixa-valores.md](componentes/faixa-valores.md) | Faixa de papel rasgado |
| Carrossel | `sections` | Client | [carrossel.md](componentes/carrossel.md) | "Menu de assinatura" |
| Rodapé | `sections` | Server + Client (newsletter) | [rodape.md](componentes/rodape.md) | Rodapé |

Camadas:
- `components/ui/` — primitivos reutilizáveis sem conhecimento do negócio.
- `components/sections/` — blocos de página que compõem primitivos.

## Estrutura de pastas proposta

```
my-app/
  app/
    layout.tsx            fontes, lang="pt-AO", metadata
    globals.css           = docs/design/tokens.css
    page.tsx              composição de secções
  components/
    ui/
      botao.tsx  chapa.tsx  campo.tsx  icone.tsx  logotipo.tsx  cartao-produto.tsx  depoimento.tsx
    sections/
      navbar.tsx  heroi.tsx  faixa-valores.tsx  carrossel-menu.tsx  rodape.tsx
  lib/
    cn.ts                 junta classes (sem dependências)
    formatar.ts           formatarPreco() em kwanzas (pt-AO)
    dados/menu.ts         dados tipados de exemplo
  public/
    marca/palanca-logo.png      logótipo completo (oficial)
    marca/palanca-simbolo.png   só o símbolo
    imagens/…
```

## Convenções

1. **Nomes em português**, ficheiros em `kebab-case`, componentes em `PascalCase` (ex.: `CartaoProduto` em `cartao-produto.tsx`).
2. **Server Components por defeito.** `"use client"` só quando há estado, eventos ou APIs do browser (menu móvel, carrossel, botão com ação, campos controlados).
3. **Props mínimas e tipadas.** Variantes como união de literais (`variante: "principal" | "contorno" | "fantasma"`), não *booleans* soltos.
4. **Estilos com utilitários Tailwind** e tokens semânticos. Sem CSS por componente; exceção: máscara do papel rasgado e animação do herói em `globals.css`.
5. **`className` aceite e fundido** com `cn()` para permitir ajustes pontuais de layout (nunca para mudar cores de marca).
6. **Estados completos**: repouso, hover, `focus-visible`, ativo, desativado, a carregar (quando aplicável).
7. **Texto de interface** em pt-AO, seguindo [01-guia-de-estilo.md](01-guia-de-estilo.md#8-voz-e-tom-português-de-portugal--angola).

## Composição de uma página (exemplo: início)

```
<Navbar />
<main>
  <Heroi />               título, texto, 2 botões, imagem, selo
  <FaixaValores />        papel rasgado, 4 selos + texto
  <CarrosselMenu />       título + "Ver menu completo" + cartões
  <SecaoFilosofia />      painel com imagem orgânica e texto curto
  <Depoimentos />         3 depoimentos
</main>
<Rodape />
```

## Estados de interação comuns

| Estado | Tratamento |
|---|---|
| Hover | Fundo/contorno um passo mais claro, 120–200ms |
| `focus-visible` | Contorno cobre claro 2px, afastamento 3px (global) |
| Ativo (premido) | `acao-ativa`; sem animação de escala |
| Desativado | 45% de opacidade, `cursor-not-allowed`, `aria-disabled` quando é ligação |
| A carregar | `aria-busy`, rótulo mantém-se, indicador de 16px à esquerda |
