import type { Locale } from "./i18n/locales";

// Kwanzas inteiros. O símbolo é sempre "Kz" (o Intl devolveria "AOA" em en-GB) e os milhares
// são sempre separados por vírgula (1,800 Kz), em PT e EN, por isso o número é formatado com "en-US".
// O locale já não altera o formato; o parâmetro mantém-se para não mexer nos sítios que chamam.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function formatarPreco(kz: number, _locale?: Locale) {
  const numero = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(kz);
  return `${numero} Kz`;
}
