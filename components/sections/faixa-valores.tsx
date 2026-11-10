import type { Dictionary } from "@/lib/i18n/dictionaries";

// Única faixa de papel creme da página.
export function FaixaValores({ dict }: { dict: Dictionary["values"] }) {
  return (
    <section aria-label="Café Palanca" className="bg-superficie-papel text-texto-papel">
      <ul className="mx-auto grid w-full max-w-pagina gap-8 px-4 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-4 xl:px-12">
        {dict.items.map((v) => (
          <li key={v.title} className="revelar border-t-2 border-texto-papel-acento pt-4">
            <h3 className="font-serif text-xl">{v.title}</h3>
            <p className="mt-1 text-sm text-texto-papel-suave">{v.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
