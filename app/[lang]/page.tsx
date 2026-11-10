import type { Metadata } from "next";
import { Suspense } from "react";
import { Eventos } from "@/components/sections/eventos";
import { FaixaValores } from "@/components/sections/faixa-valores";
import { Heroi } from "@/components/sections/heroi";
import { Populares } from "@/components/sections/populares";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";
import { metadataPagina } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return { ...metadataPagina(locale, "", dict.meta.title, dict.meta.description), title: { absolute: dict.meta.title } };
}

export default async function Inicio() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <>
      <Heroi locale={locale} dict={dict} />
      <Suspense>
        <Populares locale={locale} dict={dict.popular} fechar={dict.menu.close} />
      </Suspense>
      <Suspense>
        <Eventos locale={locale} dict={dict.events} />
      </Suspense>
      <FaixaValores dict={dict.values} />
    </>
  );
}
