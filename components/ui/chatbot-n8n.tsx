"use client";

import { useEffect } from "react";
import { N8N_CHAT_URL } from "@/lib/contacto";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// O widget do n8n usa um <div> como botão de abrir e não dá nome a alguns controlos.
// Esta função ajusta o DOM do widget (é idempotente, por isso pode correr em cada mutação).
// Depois de o chat ser aberto uma vez, a etiqueta "Fala com a Zuri" deixa de aparecer nesta sessão.
function marcarVisto() {
  document.documentElement.setAttribute("data-chat-visto", "");
  try {
    sessionStorage.setItem("chat-visto", "1");
  } catch {}
}

function melhorarAcessibilidade(raiz: ParentNode, dict: Dictionary["chat"]) {
  const janela = raiz.querySelector<HTMLElement>(".chat-window");
  const abrir = raiz.querySelector<HTMLElement>(".chat-window-toggle");
  const aberta = !!janela && getComputedStyle(janela).display !== "none";

  if (janela) {
    janela.setAttribute("role", "dialog");
    janela.setAttribute("aria-label", dict.title);
  }

  if (abrir) {
    const rotulo = aberta ? dict.close : dict.open;
    if (abrir.getAttribute("role") !== "button") abrir.setAttribute("role", "button");
    if (abrir.getAttribute("tabindex") !== "0") abrir.setAttribute("tabindex", "0");
    if (abrir.getAttribute("aria-label") !== rotulo) abrir.setAttribute("aria-label", rotulo);
    abrir.setAttribute("aria-expanded", String(aberta));
    if (aberta) marcarVisto();
  }

  const campo = raiz.querySelector<HTMLElement>(".chat-inputs textarea");
  if (campo && !campo.hasAttribute("aria-label")) campo.setAttribute("aria-label", dict.placeholder);

  const enviar = raiz.querySelector<HTMLElement>(".chat-input-send-button");
  if (enviar && !enviar.hasAttribute("aria-label")) enviar.setAttribute("aria-label", dict.send);

  const fechar = raiz.querySelector<HTMLElement>(".chat-close-button");
  if (fechar && !fechar.hasAttribute("aria-label")) fechar.setAttribute("aria-label", dict.close);
}

// Chatbot do n8n (a assistente Zuri). A biblioteca só corre no navegador, por isso é carregada depois da hidratação.
export function ChatbotN8n({ dict }: { dict: Dictionary["chat"] }) {
  useEffect(() => {
    let app: { unmount: () => void } | undefined;
    let observador: MutationObserver | undefined;
    let cancelado = false;

    document.documentElement.style.setProperty("--chat-etiqueta", JSON.stringify(dict.label));
    try {
      if (sessionStorage.getItem("chat-visto")) document.documentElement.setAttribute("data-chat-visto", "");
    } catch {}

    // Teclado: Enter ou Espaço abrem/fecham (o botão de abrir é um <div>); Escape fecha a janela aberta.
    const aoTeclar = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null;
      if (!alvo) return;
      if ((e.key === "Enter" || e.key === " ") && alvo.matches(".chat-window-toggle")) {
        e.preventDefault();
        alvo.click();
      } else if (e.key === "Escape" && alvo.closest(".chat-window")) {
        const fechar = document.querySelector<HTMLElement>(".chat-window-wrapper .chat-window-toggle");
        const janela = document.querySelector<HTMLElement>(".chat-window-wrapper .chat-window");
        if (fechar && janela && getComputedStyle(janela).display !== "none") {
          fechar.click();
          fechar.focus();
        }
      }
    };

    (async () => {
      const [{ createChat }] = await Promise.all([import("@n8n/chat"), import("@n8n/chat/style.css")]);
      if (cancelado) return;
      app = createChat({
        // Em desenvolvimento passa pelo /api/chat (o n8n só aceita CORS do domínio de produção).
        webhookUrl: process.env.NODE_ENV === "development" ? `${window.location.origin}/api/chat` : N8N_CHAT_URL,
        mode: "window",
        showWelcomeScreen: false,
        loadPreviousSession: false,
        initialMessages: [dict.greeting],
        i18n: {
          en: {
            title: dict.title,
            subtitle: dict.subtitle,
            footer: "",
            getStarted: dict.open,
            inputPlaceholder: dict.placeholder,
            closeButtonTooltip: dict.close,
          },
        },
      });

      const contentor = document.getElementById("n8n-chat");
      if (contentor) {
        melhorarAcessibilidade(contentor, dict);
        observador = new MutationObserver(() => melhorarAcessibilidade(contentor, dict));
        observador.observe(contentor, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
        contentor.addEventListener("keydown", aoTeclar);
      }
    })();

    return () => {
      cancelado = true;
      document.documentElement.style.removeProperty("--chat-etiqueta");
      observador?.disconnect();
      document.getElementById("n8n-chat")?.removeEventListener("keydown", aoTeclar);
      app?.unmount();
    };
  }, [dict]);

  return null;
}
