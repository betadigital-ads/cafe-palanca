import { Logotipo } from "@/components/ui/logotipo";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Rodape({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-contorno bg-superficie">
      <div className="mx-auto flex w-full max-w-pagina flex-col items-center gap-6 px-4 py-12 text-center md:px-8 xl:px-12">
        <Logotipo variante="completo" className="w-44" />
        <p className="text-texto-suave">
          {dict.location}
          {dict.hours.split(" · ").map((linha) => (
            <span key={linha} className="block">
              {linha}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
