// Segmento de URL → etiqueta BCP 47 usada em <html lang> e Intl.
export const LOCALES = {
  pt: "pt-AO",
  en: "en-GB",
} as const;

export type Locale = keyof typeof LOCALES;

export const DEFAULT_LOCALE: Locale = "pt";

export const hasLocale = (valor: string): valor is Locale => valor in LOCALES;
