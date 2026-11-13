"use client";

import { useEffect } from "react";
import { N8N_CHAT_URL } from "@/lib/contacto";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Chatbot do n8n. A biblioteca só corre no navegador, por isso é carregada depois da hidratação.
export function ChatbotN8n({ dict }: { dict: Dictionary["chat"] }) {
  useEffect(() => {
    let app: { unmount: () => void } | undefined;
    let cancelado = false;

    (async () => {
      const [{ createChat }] = await Promise.all([import("@n8n/chat"), import("@n8n/chat/style.css")]);
      if (cancelado) return;
      app = createChat({
        webhookUrl: N8N_CHAT_URL,
        mode: "window",
        showWelcomeScreen: false,
        loadPreviousSession: true,
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
    })();

    return () => {
      cancelado = true;
      app?.unmount();
    };
  }, [dict]);

  return null;
}
