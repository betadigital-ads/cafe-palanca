import { LOCALES, type Locale } from "./i18n/locales";

// Kwanzas inteiros. O símbolo é sempre "Kz": o Intl devolve "AOA" em en-GB, por isso o número
// é formatado pelo Intl (separador de milhares do locale) e o símbolo acrescentado depois.
export function formatarPreco(kz: number, locale: Locale) {
  const numero = new Intl.NumberFormat(LOCALES[locale], { maximumFractionDigits: 0 }).format(kz);
  return `${numero} Kz`;
}
