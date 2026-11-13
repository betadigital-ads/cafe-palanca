"use client";

import Image from "next/image";
import { useRef } from "react";
import { Chapa } from "@/components/ui/chapa";
import { cn } from "@/lib/cn";

type Props = {
  imagem: string;
  nome: string;
  descricao: string;
  preco: string; // já formatado
  rotulo: string | null;
  fechar: string; // texto acessível do botão de fechar
  className?: string;
  children: React.ReactNode; // miniatura que abre a ampliação
};

// Miniatura clicável que abre a fotografia ampliada, com os detalhes do item, num <dialog> nativo
// (foco preso, Esc para fechar e fundo inerte sem código adicional).
export function ProdutoAmpliavel({ imagem, nome, descricao, preco, rotulo, fechar, className, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={nome}
        className={cn("group/ampliar relative block cursor-zoom-in overflow-hidden", className)}
      >
        {children}
      </button>

      <dialog
        ref={ref}
        aria-label={nome}
        onClick={(e) => {
          // Clique no fundo (o próprio <dialog>) fecha; cliques no conteúdo não.
          if (e.target === ref.current) ref.current?.close();
        }}
        className="visor-produto m-auto w-[min(92vw,26rem)] overflow-hidden rounded-painel border border-contorno bg-superficie-elevada p-0 text-texto shadow-elevada"
      >
        <div className="relative aspect-[4/5] w-full">
          <Image src={`/imagens/menu/${imagem}`} alt={nome} fill sizes="(min-width:640px) 26rem, 92vw" className="object-cover" />
          {rotulo && <Chapa className="absolute left-4 top-4">{rotulo}</Chapa>}
        </div>
        <div className="flex flex-col gap-2 p-6">
          <h3 className="font-serif text-2xl">{nome}</h3>
          <p className="text-sm text-texto-suave">{descricao}</p>
          <p className="pt-2 font-serif text-xl tabular-nums">{preco}</p>
        </div>
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
