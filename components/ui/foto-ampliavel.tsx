"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  fechar: string; // texto acessível do botão de fechar
  orientacao?: "retrato" | "paisagem";
  sizes: string;
  className?: string; // proporção e tamanho da miniatura
};

// Fotografia com destaque: zoom ao passar o rato, movimento ligado ao scroll e ampliação num <dialog> nativo.
export function FotoAmpliavel({ src, alt, fechar, orientacao = "paisagem", sizes, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const retrato = orientacao === "retrato";

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={alt}
        className={cn("group/foto relative block w-full cursor-zoom-in overflow-hidden rounded-painel shadow-elevada", className)}
      >
        <div className="assentar absolute inset-0">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-saida group-hover/foto:scale-[1.06] group-focus-visible/foto:scale-[1.06]">
            <Image src={src} alt="" fill sizes={sizes} className="paralaxe object-cover" />
          </div>
        </div>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 inline-flex size-11 items-center justify-center rounded-chapa bg-fundo/70 text-texto opacity-0 backdrop-blur transition-opacity duration-base ease-padrao group-hover/foto:opacity-100 group-focus-visible/foto:opacity-100 max-md:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
          </svg>
        </span>
      </button>

      <dialog
        ref={ref}
        aria-label={alt}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        className={cn(
          "visor-produto m-auto max-h-[92dvh] overflow-hidden rounded-painel border border-contorno bg-superficie-elevada p-0 text-texto shadow-elevada",
          retrato ? "w-[min(92vw,28rem)]" : "w-[min(94vw,60rem)]",
        )}
      >
        <div className={cn("relative w-full max-h-[80dvh]", retrato ? "aspect-[4/5]" : "aspect-[4/3]")}>
          <Image src={src} alt={alt} fill sizes={retrato ? "(min-width:640px) 28rem, 92vw" : "(min-width:1024px) 60rem, 94vw"} className="object-cover" />
        </div>
        <p className="p-5 text-sm text-texto-suave">{alt}</p>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={fechar}
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-chapa bg-fundo/70 text-texto backdrop-blur transition-colors duration-base ease-padrao hover:bg-fundo"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
