import Image from "next/image";
import Link from "next/link";
import { Reserva } from "@/components/reserva/reserva";
import { classesBotao } from "@/components/ui/botao";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

// Herói em ecrã inteiro: a barra de navegação sobrepõe-se à imagem (-mt-16 = altura da barra).
export function Heroi({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative isolate -mt-16 flex min-h-svh flex-col overflow-hidden">
      <Image src="/imagens/heroi-cafe.webp" alt={dict.hero.alt} fill priority sizes="100vw" className="heroi-imagem -z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-fundo/50 via-fundo/25 to-fundo/55" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent via-fundo/60 to-fundo md:h-64" />

      <div className="mx-auto flex w-full max-w-pagina flex-1 flex-col items-center justify-center px-4 pb-24 pt-28 text-center md:pb-16 md:px-8 xl:px-12">
        <h1 className="entrada max-w-4xl font-serif text-4xl font-normal leading-[1.08] text-texto drop-shadow-[0_2px_14px_rgb(0_0_0/0.5)] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">{dict.hero.title}</span>
          <span className="block">{dict.hero.titleLine2}</span>
        </h1>
        <p className="entrada mt-5 max-w-xl text-balance text-base leading-relaxed text-texto/90 drop-shadow-[0_1px_10px_rgb(0_0_0/0.6)] md:text-lg [--atraso:100ms]">
          {dict.hero.text}
        </p>
        <div className="entrada mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 [--atraso:200ms]">
          <Link
            href={`/${locale}/menu`}
            className={cn(classesBotao("contorno"), "gap-2 bg-fundo/30 backdrop-blur-sm hover:bg-fundo/50")}
          >
            {dict.hero.ctaMenu}
            <svg viewBox="0 0 20 20" aria-hidden className="size-4 fill-none stroke-current stroke-[1.6]">
              <path d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Reserva dict={dict.booking} localeTag={LOCALES[locale]} variante="principal" />
        </div>
      </div>
    </section>
  );
}
