import Image from "next/image";
import Link from "next/link";
import { Reserva } from "@/components/reserva/reserva";
import { classesBotao } from "@/components/ui/botao";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

export function Heroi({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-center overflow-hidden">
      <Image src="/imagens/heroi.webp" alt={dict.hero.alt} fill priority sizes="100vw" className="heroi-imagem -z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-fundo/70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent via-fundo/60 to-fundo md:h-56" />
      <div className="mx-auto w-full max-w-pagina px-4 py-20 md:px-8 xl:px-12">
        <h1 className="entrada max-w-3xl font-serif text-5xl font-light">{dict.hero.title}</h1>
        <p className="entrada mt-6 max-w-leitura text-lg [--atraso:120ms]">{dict.hero.text}</p>
        <div className="entrada mt-10 flex flex-col gap-3 sm:flex-row [--atraso:240ms]">
          <Reserva dict={dict.booking} localeTag={LOCALES[locale]} variante="principal" />
          <Link href={`/${locale}/menu`} className={classesBotao("contorno")}>
            {dict.hero.ctaMenu}
          </Link>
        </div>
      </div>
    </section>
  );
}
