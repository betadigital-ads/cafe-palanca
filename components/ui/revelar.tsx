"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: "div" | "li" | "section" | "p" | "header";
  variante?: "subir" | "esquerda" | "direita" | "zoom" | "mascara" | "fade";
  atraso?: number; // ms
  className?: string;
  children: React.ReactNode;
};

// Revela o conteúdo uma vez, quando entra no ecrã. O estado escondido só existe com JavaScript ativo
// (ver `@media (scripting: enabled)` em globals.css), por isso sem JS o conteúdo fica sempre visível.
export function Revelar({ as: Tag = "div", variante = "subir", atraso = 0, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mostrar = () => el.setAttribute("data-visivel", "");
    if (typeof IntersectionObserver === "undefined") return mostrar();
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        mostrar();
        obs.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const T = Tag as "div";
  return (
    <T
      ref={ref as React.RefObject<HTMLDivElement>}
      data-revelar={variante}
      className={className}
      style={atraso ? ({ "--atraso": `${atraso}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </T>
  );
}
