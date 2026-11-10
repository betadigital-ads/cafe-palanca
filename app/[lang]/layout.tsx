import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import { Navbar } from "@/components/sections/navbar";
import { Rodape } from "@/components/sections/rodape";
import { WhatsappFlutuante } from "@/components/ui/whatsapp-flutuante";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";
import { LOCALES } from "@/lib/i18n/locales";
import "../globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return Object.keys(LOCALES).map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { default: dict.meta.title, template: `%s · ${dict.meta.title}` },
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return (
    <html lang={LOCALES[locale]} className={`${newsreader.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col bg-fundo text-texto antialiased">
        <Navbar locale={locale} dict={dict} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape dict={dict.footer} />
        <WhatsappFlutuante label={dict.nav.whatsapp} />
      </body>
    </html>
  );
}
