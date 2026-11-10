import Link from "next/link";
import { Logotipo } from "@/components/ui/logotipo";
import { Reserva } from "@/components/reserva/reserva";
import { Navegacao } from "@/components/sections/navegacao";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-menu focus:rounded-campo focus:bg-superficie-elevada focus:px-3 focus:py-2"
    >
      {dict.nav.skip}
    </a>
    <header className="navbar-entrada navbar-scroll sticky top-0 z-navbar border-b border-contorno bg-fundo/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 w-full max-w-pagina items-center justify-between gap-4 px-4 md:px-8 xl:px-12">
        <Link href={`/${locale}`} aria-label={dict.nav.home} className="flex items-center gap-3">
          <Logotipo className="h-11" priority />
          <span className="hidden font-serif text-xl min-[480px]:inline">Café Palanca</span>
        </Link>
        <Navegacao locale={locale} dict={dict.nav}>
          <Reserva dict={dict.booking} localeTag={LOCALES[locale]} variante="contorno" className="h-11" />
        </Navegacao>
      </div>
    </header>
    </>
  );
}
