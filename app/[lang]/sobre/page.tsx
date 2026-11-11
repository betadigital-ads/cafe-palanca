import type { Metadata } from "next";
import { FotoAmpliavel } from "@/components/ui/foto-ampliavel";
import { Revelar } from "@/components/ui/revelar";
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
  const fechar = dict.menu.close;

  return (
    <>
      <header className="mx-auto w-full max-w-pagina px-4 pb-10 pt-12 md:px-8 lg:pb-14 lg:pt-16 xl:px-12">
        <h1 className="entrada max-w-3xl font-serif text-4xl font-light">{about.title}</h1>
        <span aria-hidden className="linha-entrada mt-6 block h-0.5 w-24 bg-acao" />
        <p className="entrada mt-6 max-w-leitura text-lg text-texto-suave [--atraso:200ms]">{about.intro}</p>
      </header>

      <div className="mx-auto flex w-full max-w-pagina flex-col gap-14 overflow-x-clip px-4 pb-12 md:px-8 lg:gap-20 lg:pb-16 xl:px-12">
        {about.blocks.map((bloco, i) => {
          const retrato = i === 0;
          const inverso = i % 2 === 1;
          return (
            <section key={bloco.title} aria-labelledby={`bloco-${i}`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-0">
              <div
                className={cn(
                  "relative lg:row-start-1",
                  retrato ? "lg:col-span-5" : "lg:col-span-7",
                  inverso ? "lg:col-start-6" : "lg:col-start-1",
                  retrato && "max-w-md",
                )}
              >
                <Revelar variante="fade" atraso={500} className="absolute inset-0">
                  <div
                    aria-hidden
                    className={cn("size-full rounded-painel border-2 border-acao/60", inverso ? "-translate-x-4 translate-y-4" : "translate-x-4 translate-y-4")}
                  />
                </Revelar>
                <Revelar variante="mascara" className="relative">
                  <FotoAmpliavel
                    src={FOTOS[i]}
                    prioridade={i < 2}
                    alt={bloco.alt}
                    fechar={fechar}
                    orientacao={retrato ? "retrato" : "paisagem"}
                    sizes={retrato ? "(min-width:1024px) 30vw, 90vw" : "(min-width:1024px) 55vw, 100vw"}
                    className={retrato ? "aspect-[4/5]" : "aspect-[4/3]"}
                  />
                </Revelar>
              </div>

              <Revelar
                variante={inverso ? "esquerda" : "direita"}
                atraso={350}
                className={cn(
                  "relative z-10 lg:row-start-1",
                  retrato ? "lg:col-span-7" : "lg:col-span-5",
                  inverso ? "lg:col-start-1 lg:-mr-24" : retrato ? "lg:col-start-6 lg:-ml-16" : "lg:col-start-8 lg:-ml-24",
                )}
              >
                <div className="rounded-painel border border-contorno bg-superficie-elevada p-6 shadow-cartao md:p-10">
                  <p aria-hidden className="font-serif text-5xl font-light text-texto-acento">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span aria-hidden className="linha-desenhar mt-3 block h-0.5 w-16 bg-acao" />
                  <h2 id={`bloco-${i}`} className="mt-5 text-3xl">
                    {bloco.title}
                  </h2>
                  <p className="mt-4 max-w-leitura text-lg text-texto-suave">{bloco.text}</p>
                </div>
              </Revelar>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="palanca-titulo" className="overflow-x-clip bg-superficie py-12 lg:py-16">
        <div className="mx-auto w-full max-w-pagina px-4 md:px-8 xl:px-12">
          <Revelar variante="mascara">
            <FotoAmpliavel
              src="/imagens/sobre-balcao.webp"
              alt={about.counter.alt}
              fechar={fechar}
              sizes="(min-width:1280px) 1100px, 100vw"
              className="aspect-[4/3] md:aspect-[16/9]"
            />
          </Revelar>
          <Revelar variante="subir" atraso={400} className="relative z-10 -mt-12 ml-auto max-w-xl px-2 sm:px-6 lg:-mt-20 lg:mr-8">
            <div className="rounded-painel border border-contorno bg-superficie-elevada p-6 shadow-elevada md:p-10">
              <h2 id="palanca-titulo" className="text-3xl">
                {about.palanca.title}
              </h2>
              <span aria-hidden className="linha-desenhar mt-4 block h-0.5 w-16 bg-acao" />
              <p className="mt-4 text-lg text-texto-suave">{about.palanca.text}</p>
            </div>
          </Revelar>
        </div>
      </section>

      <section aria-labelledby="visita-titulo" className="py-12 text-center lg:py-16">
        <Revelar variante="subir" className="mx-auto flex w-full max-w-pagina flex-col items-center px-4 md:px-8 xl:px-12">
          <h2 id="visita-titulo" className="text-3xl">
            {about.cta.title}
          </h2>
          <p className="mt-3 max-w-leitura text-texto-suave">{about.cta.text}</p>
          <Reserva dict={dict.booking} localeTag={LOCALES[locale]} variante="principal" className="mt-8" />
        </Revelar>
      </section>
    </>
  );
}
