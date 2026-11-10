import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n/locales";

// Escolhe o locale pelo cabeçalho Accept-Language (ex.: "en-GB,en;q=0.9,pt;q=0.8"), por ordem de preferência.
function escolherLocale(cabecalho: string | null): Locale {
  if (!cabecalho) return DEFAULT_LOCALE;
  const preferidos = cabecalho
    .split(",")
    .map((parte) => {
      const [tag, q] = parte.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((p) => p.base && Number.isFinite(p.q))
    .sort((a, b) => b.q - a.q);
  return preferidos.find((p) => hasLocale(p.base))?.base as Locale | undefined ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const temLocale = pathname.split("/")[1] && hasLocale(pathname.split("/")[1]);
  if (temLocale) return;

  const locale = escolherLocale(request.headers.get("accept-language"));
  const destino = request.nextUrl.clone();
  destino.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(destino);
}

export const config = {
  // Ignora _next, ficheiros de public/ (qualquer caminho com extensão) e a API.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
