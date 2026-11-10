import { cn } from "@/lib/cn";

// Selo oval de cobre (ex.: "Popular", "Favorito da casa").
export function Chapa({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-chapa bg-[image:var(--gradiente-cobre)] px-3 py-0.5 text-xs font-medium tracking-rotulo text-acao-texto shadow-chapa",
        className,
      )}
    >
      {children}
    </span>
  );
}
