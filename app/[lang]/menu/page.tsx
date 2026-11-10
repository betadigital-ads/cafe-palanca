import type { Metadata } from "next";
import Image from "next/image";
import { Revelar } from "@/components/ui/revelar";
import { Chapa } from "@/components/ui/chapa";
import { ProdutoAmpliavel } from "@/components/ui/produto-ampliavel";
import { formatarPreco } from "@/lib/formatar";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";
import { getMenu } from "@/lib/menu";
import { metadataPagina } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return metadataPagina(locale, "/menu", dict.meta.menuTitle, dict.meta.menuDescription);
}

export default async function PaginaMenu() {
  const locale = await getLocale();
  const [dict, menu] = await Promise.all([getDictionary(locale), getMenu(locale)]);

  return (
    <>
      <header className="mx-auto w-full max-w-pagina px-4 pb-8 pt-16 md:px-8 lg:pt-24 xl:px-12">
        <h1 className="entrada font-serif text-4xl font-light">{dict.menu.title}</h1>
        <p className="entrada mt-4 max-w-leitura text-lg text-texto-suave [--atraso:150ms]">{dict.menu.intro}</p>
      </header>

      {/* Índice: folheia-se o menu por categorias */}
      <nav aria-label={dict.menu.index} className="entrada [--atraso:300ms] sticky top-16 z-navbar border-y border-contorno bg-fundo/95 backdrop-blur">
        <ul className="mx-auto flex w-full max-w-pagina gap-2 overflow-x-auto px-4 py-2 md:px-8 xl:px-12">
          {menu.map((c, i) => (
            <li key={c.nome} className="shrink-0">
              <a
                href={`#categoria-${i}`}
                className="inline-flex h-11 items-center rounded-chapa border border-contorno-forte px-5 text-sm font-medium tracking-rotulo text-texto transition-[background-color,transform] duration-base ease-padrao hover:-translate-y-0.5 hover:bg-superficie-elevada active:scale-95"
              >
                {c.nome}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto w-full max-w-pagina px-4 py-12 md:px-8 lg:py-20 xl:px-12">
        {/* Uma única folha de papel para todo o menu (regra: uma faixa de papel por página) */}
        <div className="rounded-painel bg-superficie-papel px-5 py-4 text-texto-papel md:px-12">
          {menu.map((categoria, c) => (
            <section
              key={categoria.nome}
              id={`categoria-${c}`}
              aria-labelledby={`categoria-titulo-${c}`}
              className="scroll-mt-36 border-b border-texto-papel-suave/30 py-10 last:border-b-0"
            >
              <Revelar>
                <h2
                  id={`categoria-titulo-${c}`}
                  className="font-serif text-3xl text-texto-papel"
                >
                  {categoria.nome}
                </h2>
                <span aria-hidden className="linha-desenhar mt-4 block h-0.5 w-full bg-texto-papel-acento" />
              </Revelar>

              <ul className="lista-destaque mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
                {categoria.itens.map((item, n) => (
                  <li key={item.nome} className="item-destaque">
                    <Revelar className="flex gap-4" atraso={(n % 2) * 100}>
                    <ProdutoAmpliavel
                      imagem={item.imagem}
                      nome={item.nome}
                      descricao={item.descricao}
                      preco={formatarPreco(item.preco, locale)}
                      rotulo={item.rotulo}
                      fechar={dict.menu.close}
                      className="h-32 w-24 shrink-0 rounded-cartao sm:h-36 sm:w-28"
                    >
                      <Image src={`/imagens/menu/${item.imagem}`} alt="" fill sizes="112px" className="imagem-zoom object-cover" />
                    </ProdutoAmpliavel>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-serif text-xl">{item.nome}</h3>
                        <span
                          aria-hidden
                          className="min-w-4 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-texto-papel-suave/60"
                        />
                        <span className="text-lg font-semibold tabular-nums">{formatarPreco(item.preco, locale)}</span>
                      </div>
                      <p className="mt-1 text-sm text-texto-papel-suave">{item.descricao}</p>
                      {item.rotulo && <Chapa className="mt-3">{item.rotulo}</Chapa>}
                    </div>
                    </Revelar>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
