import { cn } from "@/lib/cn";

const BASE =
  "inline-flex h-12 items-center justify-center rounded-chapa px-6 font-medium tracking-rotulo transition-[filter,background-color,border-color] duration-base ease-padrao disabled:cursor-not-allowed disabled:opacity-45";

const VARIANTES = {
  principal: "bg-[image:var(--gradiente-cobre)] text-acao-texto shadow-chapa hover:brightness-110 active:brightness-95",
  contorno: "border border-contorno-forte text-texto hover:bg-superficie-elevada",
} as const;

// Classes de botão, para usar em <button> e em <Link> (um botão principal por vista).
export function classesBotao(variante: keyof typeof VARIANTES = "principal", className?: string) {
  return cn(BASE, VARIANTES[variante], className);
}
