import Link from "next/link";
import { CartaoProduto } from "@/components/ui/cartao-produto";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { getMenu } from "@/lib/menu";

// Itens com rótulo (coluna "batch": Popular / Favorito da casa) num carrossel com snap, sem JavaScript.
export async function Populares({ locale, dict, fechar }: { locale: Locale; dict: Dictionary["popular"]; fechar: string }) {
  const itens = (await getMenu(locale)).flatMap((c) => c.itens).filter((i) => i.rotulo);

  return (
    <section aria-labelledby="populares-titulo" className="py-16 lg:py-28">
      <div className="mx-auto w-full max-w-pagina px-4 md:px-8 xl:px-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 id="populares-titulo" className="text-3xl">
              {dict.title}
            </h2>
            <p className="mt-3 max-w-leitura text-texto-suave">{dict.intro}</p>
          </div>
          <Link href={`/${locale}/menu`} className="inline-flex min-h-11 items-center text-texto-acento underline underline-offset-4 hover:text-acao-hover">
            {dict.link}
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-pagina">
        <ul className="lista-destaque flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 py-4 md:scroll-px-8 md:px-8 xl:scroll-px-12 xl:px-12 [scrollbar-color:var(--color-bronze-claro)_transparent]">
          {itens.map((item, i) => (
            <li key={item.nome} className="w-[min(16rem,75vw)] shrink-0 snap-start">
              <CartaoProduto item={item} id={`pop-${i}`} locale={locale} fechar={fechar} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
