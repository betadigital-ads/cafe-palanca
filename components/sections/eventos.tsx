import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/locales";
import { proximasOcorrencias, type TipoEvento } from "@/lib/eventos";

const IMAGENS: Record<TipoEvento, string> = {
  openMic: "/imagens/evento-open-mic.webp",
  degustacao: "/imagens/evento-degustacao.webp",
};

export async function Eventos({ locale, dict }: { locale: Locale; dict: Dictionary["events"] }) {
  const ocorrencias = await proximasOcorrencias(4);
  // A data vem como YYYY-MM-DD (dia em Luanda): formata-se ao meio-dia UTC para não mudar de dia.
  const formatar = new Intl.DateTimeFormat(LOCALES[locale], { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

  return (
    <section aria-labelledby="eventos-titulo" className="bg-superficie py-16 lg:py-28">
      <div className="mx-auto w-full max-w-pagina px-4 md:px-8 xl:px-12">
        <h2 id="eventos-titulo" className="text-3xl">
          {dict.title}
        </h2>
        <p className="mt-3 max-w-leitura text-texto-suave">{dict.intro}</p>

        <ul className="lista-destaque mt-10 grid gap-4 sm:grid-cols-2">
          {ocorrencias.map((o) => {
            const info = o.tipo === "openMic" ? dict.openMic : dict.tasting;
            return (
              <li key={o.data + o.tipo} className="revelar">
                <article className="item-destaque cartao-destaque flex h-full flex-col overflow-hidden rounded-cartao border border-contorno bg-superficie-elevada shadow-cartao">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={IMAGENS[o.tipo]} alt={info.alt} fill sizes="(min-width:640px) 45vw, 100vw" className="imagem-zoom object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="font-medium capitalize text-texto-acento">
                      <time dateTime={`${o.data}T${o.hora}`}>
                        {formatar.format(new Date(`${o.data}T12:00:00Z`))} · {dict.at} {o.hora}
                      </time>
                    </p>
                    <h3 className="font-serif text-xl">{info.title}</h3>
                    <p className="text-sm text-texto-suave">{info.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
