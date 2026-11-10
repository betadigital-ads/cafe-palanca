import Image from "next/image";
import { Chapa } from "@/components/ui/chapa";
import { ProdutoAmpliavel } from "@/components/ui/produto-ampliavel";
import { formatarPreco } from "@/lib/formatar";
import type { Locale } from "@/lib/i18n/locales";
import type { ItemMenu } from "@/lib/menu";

export function CartaoProduto({ item, id, locale, fechar }: { item: ItemMenu; id: string; locale: Locale; fechar: string }) {
  const preco = formatarPreco(item.preco, locale);
  return (
    <article
      aria-labelledby={id}
      className="item-destaque cartao-destaque flex h-full flex-col overflow-hidden rounded-cartao border border-contorno bg-superficie-elevada shadow-cartao"
    >
      <ProdutoAmpliavel
        imagem={item.imagem}
        nome={item.nome}
        descricao={item.descricao}
        preco={preco}
        rotulo={item.rotulo}
        fechar={fechar}
        className="aspect-[4/5] w-full"
      >
        <Image
          src={`/imagens/menu/${item.imagem}`}
          alt=""
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 40vw, 75vw"
          className="imagem-zoom object-cover"
        />
        {item.rotulo && <Chapa className="absolute left-3 top-3">{item.rotulo}</Chapa>}
      </ProdutoAmpliavel>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 id={id} className="font-serif text-xl">
          {item.nome}
        </h3>
        <p className="line-clamp-2 text-sm text-texto-suave">{item.descricao}</p>
        <p className="mt-auto pt-3 text-lg font-semibold tabular-nums">{preco}</p>
      </div>
    </article>
  );
}
