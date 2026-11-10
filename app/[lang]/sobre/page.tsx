import type { Metadata } from "next";
import Image from "next/image";
import { Reserva } from "@/components/reserva/reserva";
import { cn } from "@/lib/cn";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";
import { LOCALES } from "@/lib/i18n/locales";
import { metadataPagina } from "@/lib/seo";

const FOTOS = ["/imagens/sobre-equipa.webp", "/imagens/sobre-torra.webp", "/imagens/sobre-padaria.webp"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return metadataPagina(locale, "/sobre", dict.meta.aboutTitle, dict.meta.aboutDescription);
}

export default async function Sobre() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const { about } = dict;

  return (
    <>
      <header className="mx-auto w-full max-w-pagina px-4 pb-12 pt-16 md:px-8 lg:pt-24 xl:px-12">
        <h1 className="max-w-3xl font-serif text-4xl font-light">{about.title}</h1>
        <p className="mt-6 max-w-leitura text-lg text-texto-suave">{about.intro}</p>
      </header>

      <div className="mx-auto flex w-full max-w-pagina flex-col gap-16 px-4 pb-16 md:px-8 lg:gap-24 lg:pb-28 xl:px-12">
        {about.blocks.map((bloco, i) => (
          <section key={bloco.title} aria-labelledby={`bloco-${i}`} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className={cn("relative overflow-hidden rounded-painel", i === 0 ? "aspect-[4/5] max-w-md" : "aspect-[4/3]", i % 2 === 1 && "lg:order-2")}>
              <Image src={FOTOS[i]} alt={bloco.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div>
              <h2 id={`bloco-${i}`} className="text-3xl">
                {bloco.title}
              </h2>
              <p className="mt-4 max-w-leitura text-lg text-texto-suave">{bloco.text}</p>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="palanca-titulo" className="bg-superficie py-16 lg:py-28">
        <div className="mx-auto grid w-full max-w-pagina items-center gap-8 px-4 md:px-8 lg:grid-cols-2 lg:gap-16 xl:px-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-painel">
            <Image src="/imagens/sobre-balcao.webp" alt={about.counter.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 id="palanca-titulo" className="text-3xl">
              {about.palanca.title}
            </h2>
            <p className="mt-4 max-w-leitura text-lg text-texto-suave">{about.palanca.text}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="visita-titulo" className="py-16 text-center lg:py-28">
        <div className="mx-auto flex w-full max-w-pagina flex-col items-center px-4 md:px-8 xl:px-12">
          <h2 id="visita-titulo" className="text-3xl">
            {about.cta.title}
          </h2>
          <p className="mt-3 max-w-leitura text-texto-suave">{about.cta.text}</p>
          <Reserva dict={dict.booking} localeTag={LOCALES[locale]} variante="principal" className="mt-8" />
        </div>
      </section>
    </>
  );
}
