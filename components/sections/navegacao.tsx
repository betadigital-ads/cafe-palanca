"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/locales";

// Ligações principais + seletor de idioma (mantém a página atual) + menu móvel.
// `children` é o botão de reserva (Client Component renderizado no servidor e passado aqui).
export function Navegacao({ locale, dict, children }: { locale: Locale; dict: Dictionary["nav"]; children: React.ReactNode }) {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);

  // Esc fecha o menu móvel e devolve o foco ao botão.
  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAberto(false);
      botaoMenu.current?.focus();
    };
    document.addEventListener("keydown", fechar);
    return () => document.removeEventListener("keydown", fechar);
  }, [aberto]);
  const [pathnameAnterior, setPathnameAnterior] = useState(pathname);

  // Fecha o menu móvel quando a rota muda (ajuste de estado durante a renderização, sem useEffect).
  if (pathname !== pathnameAnterior) {
    setPathnameAnterior(pathname);
    setAberto(false);
  }

  const resto = pathname.replace(/^\/[^/]+/, ""); // "/pt/menu" -> "/menu"
  const ligacoes = [
    { href: `/${locale}`, rotulo: dict.start, ativa: resto === "" },
    { href: `/${locale}/menu`, rotulo: dict.menu, ativa: resto.startsWith("/menu") },
    { href: `/${locale}/sobre`, rotulo: dict.about, ativa: resto.startsWith("/sobre") },
  ];

  const itens = (vertical: boolean) =>
    ligacoes.map((l) => (
      <li key={l.href}>
        <Link
          href={l.href}
          aria-current={l.ativa ? "page" : undefined}
          className={cn(
            "inline-flex h-11 items-center rounded-chapa px-4 text-sm font-medium tracking-rotulo transition-colors duration-base ease-padrao",
            vertical && "w-full",
            l.ativa ? "bg-superficie-elevada text-texto-acento" : "text-texto-suave hover:text-texto",
          )}
        >
          {l.rotulo}
        </Link>
      </li>
    ));

  const idiomas = (
    <ul className="flex items-center" aria-label={dict.language}>
      {(Object.keys(LOCALES) as Locale[]).map((l) => (
        <li key={l}>
          <Link
            href={`/${l}${resto}`}
            hrefLang={LOCALES[l]}
            lang={LOCALES[l]}
            aria-label={dict.languages[l]}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "inline-flex h-11 min-w-11 items-center justify-center rounded-chapa px-3 text-sm font-medium uppercase tracking-rotulo transition-colors duration-base ease-padrao",
              l === locale ? "bg-superficie-elevada text-texto-acento" : "text-texto-suave hover:text-texto",
            )}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Computador */}
      <nav aria-label={dict.label} className="hidden items-center gap-2 md:flex">
        <ul className="flex items-center gap-1">{itens(false)}</ul>
        {idiomas}
        {children}
      </nav>

      {/* Telemóvel */}
      <div className="flex items-center gap-1 md:hidden">
        {idiomas}
        <button
          ref={botaoMenu}
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
          className="inline-flex h-11 items-center rounded-chapa border border-contorno-forte px-4 text-sm font-medium"
        >
          {aberto ? dict.close : dict.open}
        </button>
      </div>
      {aberto && (
        <nav
          id="menu-movel"
          aria-label={dict.label}
          className="absolute inset-x-0 top-full border-b border-contorno bg-fundo px-4 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">{itens(true)}</ul>
          <div className="mt-4">{children}</div>
        </nav>
      )}
    </>
  );
}
