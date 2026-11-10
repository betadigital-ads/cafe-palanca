# Guia de estilo — Café Palanca

## 1. Ideia central: a chapa de cobre

O logótipo oficial (`public/marca/palanca-chapa.jpg`, de `CafePalanca11.jpg`) é uma palanca-negra de perfil em branco sobre uma chapa de cobre escovado, com os cornos a fechar um arco que abraça folhas de café, uma chávena de porta-filtro, "CAFÉ PALANCA" em capitulares e "EST. 2024". Uma segunda referência (`docs-design/design/referencias/palanca-logo.png`) mostra o mesmo animal como letreiro de cobre em relevo sobre bronze, dentro de um oval. Dela vem a linguagem da interface:

- **Material**: cobre que apanha luz (ligeiro gradiente, rebordo claro em cima, sombra por baixo), como o gradiente do logótipo. Não é laranja plano.
- **Forma**: o oval (estádio) é a assinatura. Aparece em botões principais, selos, filtros e máscaras de imagem. Cartões e painéis usam raios mais pequenos, para a chapa se destacar. O arco dos cornos no logótipo reforça as formas curvas.
- **Cor**: o ecrã é escuro, como nas referências, e o cobre é o único acento. Uma faixa de papel creme por página dá o contraste.

Gasta-se a ousadia num sítio: a chapa de cobre. Tudo o resto é calmo.

## 2. Princípios

1. **Escuro e quente.** Fundo espresso, nunca preto puro nem cinzento neutro. Sombras e brilhos têm sempre tom castanho.
2. **Um acento.** Cobre para ação e destaque. Se tudo é cobre, nada é.
3. **Editorial.** Títulos serifados grandes e leves, muito espaço, texto alinhado à esquerda.
4. **Fotografia primeiro.** O produto (chávena, bolo, grão) manda. A interface é moldura.
5. **Movimento com razão.** Um momento de entrada no herói; o resto responde a ações.
6. **Legível sempre.** Contraste AA, foco visível, alvos de toque ≥ 44px.

## 3. Cor

Ver valores e contrastes em [02-design-tokens.md](02-design-tokens.md).

| Papel | Token | Uso |
|---|---|---|
| Fundo | `fundo` (espresso) | Página |
| Superfície | `superficie` (torra) / `superficie-elevada` (cacau) | Secções, cartões |
| Texto | `texto` (creme) / `texto-suave` (latte) | Corpo, legendas |
| Ação | `acao` (cobre) | Botão principal, ícones ativos, preço em destaque |
| Papel | `superficie-papel` (creme) | **Uma** faixa por página (ex.: valores da casa) |

Regras:
- Texto cobre sobre escuro usa `texto-acento` (cobre claro, 8.4:1). Sobre papel usa `texto-papel-acento` (cobre escuro, 5.2:1).
- O `bronze` (#4A3626) é decorativo. Contornos de campos usam `contorno-forte`.
- Estados (sucesso, aviso, erro) nunca dependem só da cor: levam ícone e texto.
- Sem gradientes decorativos em fundos. Os gradientes existem só no cobre metálico e na placa de bronze.

## 4. Tipografia

- **Display: Newsreader** (serifada com eixo ótico). Títulos em peso 300–400, tracking −0.02em, `text-wrap: balance`. Em tamanhos grandes o eixo `opsz` aumenta o contraste dos traços.
- **Corpo: Instrument Sans.** Peso 400 corpo, 500 botões e rótulos, 600 preços e ênfase.
- Duas famílias, claramente distintas. Itálico de Newsreader reservado a citações e depoimentos.

| Papel | Token | Família | Peso | Notas |
|---|---|---|---|---|
| Herói | `text-5xl` | Display | 300 | Máx. 3 linhas, ≈ 14 caracteres por linha em móvel |
| Título de secção | `text-3xl` / `text-4xl` | Display | 400 | |
| Título de cartão | `text-xl` | Display | 400 | |
| Corpo | `text-base`/`text-lg` | Corpo | 400 | Linha ≤ 65 caracteres (`max-w-leitura`) |
| Legenda | `text-sm` | Corpo | 400 | `texto-suave` |
| Rótulo | `text-sm` | Corpo | 500 | tracking +0.01em |
| Preço | `text-lg` | Corpo | 600 | Números tabulares (`tabular-nums`) |

Evitar: realçar só uma palavra de um título com outra cor ou itálico; rótulos em maiúsculas por todo o lado; um rótulo pequeno por cima de cada título. Um rótulo acima de um título só se classificar mesmo o conteúdo (ex.: "Menu de inverno"), em frase normal.

## 5. Layout

- **Contentor** 1200px (`max-w-pagina`), margens laterais 16px (móvel), 32px (≥ md), 48px (≥ xl).
- **Grelha** 12 colunas, intervalo 24px (16px em móvel). **Alinhamento à esquerda**; centrar só títulos curtos de secções independentes e o rodapé.
- **Ritmo vertical**: secções com `py-16` (móvel) a `py-28` (≥ lg). Dentro de uma secção, múltiplos de 4px; preferir 8, 16, 24, 48.
- **Faixa de papel**: uma por página, com borda superior rasgada (SVG/máscara). Contém quatro valores da casa com selos ovais.
- **Raios por hierarquia**: campos 8px, cartões 16px, painéis 28px, chapa oval. Nunca o mesmo raio em tudo.
- **Mobile primeiro**: coluna única; cartões de produto em carrossel horizontal com *snap*; 2 colunas em `sm`, 4 em `lg`.

```
Desktop                                  Móvel
┌──────────────────────────────┐         ┌───────────────┐
│ Logo   nav…     [Reservar]   │         │ Logo       ☰  │
├──────────────────────────────┤         ├───────────────┤
│ Título grande      ┌──────┐  │         │ Título grande │
│ texto curto        │ foto │  │         │ texto curto   │
│ [Ver menu]         └──────┘  │         │ [Ver menu]    │
│▒▒▒▒ faixa de papel ▒▒▒▒▒▒▒▒▒▒│         │ [   foto    ] │
│ ◉ valor ◉ valor ◉ valor ◉ valor│       │▒ papel (2×2) ▒│
├──────────────────────────────┤         ├───────────────┤
│ Título   [Ver tudo] ‹ ›      │         │ cartões →     │
│ ▢ cartão ▢ cartão ▢ ▢        │         └───────────────┘
```

## 6. Imagem e ícones

- **Fotografia**: luz lateral quente, fundo escuro desfocado, pouca saturação, grão visível. Proporções: produto 4:5, herói 4:3 ou 1:1, secção 3:2. Ver `next/image` em [04-implementacao-nextjs.md](04-implementacao-nextjs.md).
- **Máscaras**: imagens de secção podem usar a forma orgânica/oval das referências (`radius-painel` ou `clip-path`). Evitar molduras com sombra forte.
- **Ícones**: traço de 1.5px, cantos arredondados, 20/24px, cor `texto` ou `acao`. Conjunto único (ver [componentes/icones.md](componentes/icones.md)).
- **Logótipo** (ficheiros em `public/marca/`, recortados de `docs-design/design/referencias/CafePalanca11.jpg`):
  - É **branco sobre chapa de cobre escovado**, já com fundo próprio: a chapa de cobre da identidade é o próprio logótipo. Não é preciso superfície creme nem `mix-blend-multiply`.
  - `palanca-chapa.jpg`: versão completa (emblema, nome e "Est. 2024"), 710×710. Usar no rodapé e em ecrãs de abertura (`rounded-painel`).
  - `palanca-emblema.jpg`: só o emblema (animal, grão e porta-filtro), 180×176. Usar na navbar (`h-11`, `rounded-chapa`, fica circular) e em selos.
  - **Zona de respiro**: a largura do grão de café à volta de todo o logótipo. **Tamanho mínimo**: emblema 32px de altura; versão completa 160px de largura (abaixo disso "EST. 2024" fica ilegível; usar o emblema).
  - **Não fazer**: esticar, rodar, aplicar sombras, pôr sobre fotografia, mudar as cores, recortar a chapa.
  - `palanca-logo.png` e `palanca-simbolo.png` (creme/castanho) são a versão anterior e já não se usam.

## 7. Movimento

| Tipo | Duração | Curva | Onde |
|---|---|---|---|
| Resposta (hover, foco, premir) | 120–200ms | `ease-padrao` | Botões, cartões, ligações |
| Abrir/fechar | 200ms | `ease-padrao` | Menu móvel, acordeões |
| Entrada do herói (única) | 480ms, escalonada 80ms | `ease-saida` | Título → texto → botões → imagem |

Sem animações de entrada por secção, sem *parallax*, sem elevação em todos os cartões. `prefers-reduced-motion` desliga tudo (já incluído em `tokens.css`).

## 8. Voz e tom (português de Portugal / Angola)

- **Quente, direto, sem pressa.** Fala de café e comida como quem os serve.
- **Verbos simples**, tratamento por "tu" no copy corrente ("Prova", "Reserva"). Frases curtas.
- **Ações com nome fixo**: "Ver menu", "Reservar mesa", "Adicionar ao pedido". O mesmo verbo no botão e na confirmação ("Adicionado ao pedido").
- **Erros** dizem o que falhou e como resolver; não pedem desculpa nem culpam. Ex.: "Não foi possível enviar. Verifica o email e tenta outra vez."
- **Vazio** convida a agir: "O teu pedido está vazio. Escolhe uma bebida do menu."
- **Moeda e formatos (decidido)**: kwanza (AOA), sem casas decimais, formatado com `Intl.NumberFormat("pt-AO")`: `2 500 Kz`. Datas `09/11/2026`, hora de 24h. O espaço entre milhares e o símbolo `Kz` vêm do `Intl`; não escrever à mão.
- Frases com maiúscula só no início; sem ponto de exclamação em interface.

| Em vez de | Escreve |
|---|---|
| "Submeter" | "Enviar reserva" |
| "Click aqui" | "Ver menu completo" |
| "Oops! Algo correu mal" | "Não foi possível guardar. Tenta outra vez." |
| "Explora a nossa vasta seleção premium" | "Dez cafés, feitos ao balcão." |

## 9. Acessibilidade (mínimos)

- Contraste AA em texto (4.5:1) e em componentes interativos (3:1). Pares verificados em `02-design-tokens.md`.
- `:focus-visible` com contorno cobre claro de 2px e afastamento de 3px; nunca remover.
- Alvos de toque ≥ 44×44px. Carrosséis navegáveis por teclado e sem avanço automático.
- Imagens decorativas com `alt=""`; imagens de produto com `alt` descritivo ("Fatia de bolo de chocolate com ganache").
- `lang="pt-AO"` no `<html>`. Ordem de leitura = ordem visual.

## 10. Fazer e não fazer

| Fazer | Não fazer |
|---|---|
| Cobre num só botão principal por vista | Vários botões cobre lado a lado |
| Fundos espresso quentes | Preto #000 ou cinzentos neutros |
| Raios diferentes por nível | Mesmo raio e mesma sombra em tudo |
| Uma faixa de papel por página | Repetir a faixa de papel em cada secção |
| Fotografia grande, texto curto | Blocos de texto sobre imagem sem escurecimento |
| Frases de utilizador, verbos claros | Marketing vago ("experiência premium") |
