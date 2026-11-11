import Image from "next/image";
import { cn } from "@/lib/cn";

// Logótipo oficial: branco sobre chapa de cobre (recortado de docs-design/design/referencias/CafePalanca11.jpg).
// "emblema" = só o animal e o grão (navbar); "completo" = emblema, nome e "Est. 2024" (rodapé, mín. 160px).
export function Logotipo({ variante = "emblema", className, priority }: { variante?: "emblema" | "completo"; className?: string; priority?: boolean }) {
  const completo = variante === "completo";
  return (
    <Image
      src={completo ? "/marca/palanca-chapa.webp" : "/marca/palanca-emblema.webp"}
      alt="Café Palanca"
      width={completo ? 710 : 180}
      height={completo ? 710 : 176}
      priority={priority}
      className={cn(completo ? "h-auto rounded-painel" : "w-auto rounded-chapa", className)}
    />
  );
}
