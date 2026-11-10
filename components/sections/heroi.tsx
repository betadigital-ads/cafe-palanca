import Image from "next/image";
import Link from "next/link";
import { Reserva } from "@/components/reserva/reserva";
import { classesBotao } from "@/components/ui/botao";
import { cn } from "@/lib/cn";
import { WHATSAPP } from "@/lib/contacto";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

// Herói em ecrã inteiro: a barra de navegação sobrepõe-se à imagem (-mt-16 = altura da barra).
export function Heroi({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative isolate -mt-16 flex min-h-svh flex-col overflow-hidden">
      <Image src="/imagens/heroi.webp" alt={dict.hero.alt} fill priority sizes="100vw" className="heroi-imagem -z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-fundo/85 via-fundo/45 to-fundo/75" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent via-fundo/60 to-fundo md:h-64" />

      <div className="mx-auto flex w-full max-w-pagina flex-1 flex-col items-center justify-center px-4 pb-10 pt-28 text-center md:px-8 xl:px-12">
        <h1 className="entrada max-w-4xl text-balance font-serif text-4xl font-light leading-[1.08] text-texto/60 md:text-5xl lg:text-6xl">
          {dict.hero.title} <span className="font-normal text-texto">{dict.hero.titleBrand}</span>
        </h1>
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

      <div className="mx-auto flex w-full max-w-pagina items-end justify-between gap-6 px-4 pb-24 md:px-8 md:pb-10 xl:px-12">
        <p className="entrada max-w-sm text-sm leading-relaxed text-texto/75 [--atraso:400ms]">{dict.hero.text}</p>
        <div className="entrada hidden flex-col items-end gap-2 text-sm text-texto/75 sm:flex [--atraso:500ms]">
          <span>[ {dict.hero.connect} ]</span>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.whatsapp}
            className="inline-flex size-11 items-center justify-center rounded-full text-texto/75 transition-colors hover:text-texto"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-none stroke-current stroke-[1.6]">
              <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20Z" strokeLinejoin="round" />
              <path d="M9.5 8.8c.3 2.4 2.5 4.6 5 5l1-1.2-1.8-.9-.7.7c-.8-.3-1.6-1.1-1.9-1.9l.7-.7-.9-1.8-1.4 1.8Z" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
