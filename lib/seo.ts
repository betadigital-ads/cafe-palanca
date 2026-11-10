import type { Metadata } from "next";
import { LOCALES, type Locale } from "./i18n/locales";

// Metadados de uma página: título, descrição e alternativas por idioma (caminho: "", "/menu", "/sobre").
export function metadataPagina(locale: Locale, caminho: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${caminho}`,
      languages: Object.fromEntries(Object.entries(LOCALES).map(([l, tag]) => [tag, `/${l}${caminho}`])),
    },
  };
}
