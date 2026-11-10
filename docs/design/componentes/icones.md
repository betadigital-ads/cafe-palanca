# Ícones

**Finalidade**: conjunto único de ícones de traço, coerente com as referências (linha fina, cantos redondos).

## Especificação
| Propriedade | Valor |
|---|---|
| Grelha | 24×24, margem de 2px |
| Traço | 1.5px, `stroke-linecap="round"`, `stroke-linejoin="round"`, sem preenchimento |
| Tamanhos | 16 (estrelas, ligações), 20 (botões `sm`), 24 (padrão, selos) |
| Cor | `currentColor`; `texto`, `texto-suave` ou `acao` conforme o papel |
| Ícones precisos | seta direita, seta esquerda, mais, visto, pesquisa, pedido (saco), menu, fechar, estrela, grão, folha, chávena, coração, camião, cadeado, redes sociais |

## Origem
**Decidido**: SVGs próprios neste componente, sem biblioteca. O conjunto é pequeno (cerca de 16 ícones) e assim o traço fica igual em todos. Se passar de ~30 ícones, reavaliar.

## Acessibilidade
- Decorativo: `aria-hidden="true"` (por defeito).
- Com significado e sem texto ao lado: `role="img"` + `aria-label`.

## Esqueleto
```tsx
// components/ui/icone.tsx
const caminhos = {
  mais: <path d="M12 5v14M5 12h14" />,
  seta: <path d="M5 12h14M13 6l6 6-6 6" />,
  visto: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  estrela: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8L12 3.5z" />,
  // grao, folha, chavena, coracao… desenhar no mesmo estilo
} as const;

export type NomeIcone = keyof typeof caminhos;

export function Icone({ nome, tamanho = 24, className, ...resto }:
  { nome: NomeIcone; tamanho?: 16 | 20 | 24 } & Omit<React.SVGProps<SVGSVGElement>, "ref">) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...resto}>
      {caminhos[nome]}
    </svg>
  );
}
```
Nota: nas especificações de componentes, `Icone nome="grao"|"folha"|"chavena"|"coracao"` têm de existir no mapa `caminhos` antes de serem usados.
