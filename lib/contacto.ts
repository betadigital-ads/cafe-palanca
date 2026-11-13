// Dados de contacto do café. VALORES-MARCADOR: confirmar e substituir pelos verdadeiros.
export const WHATSAPP = "244900000000"; // indicativo + número, só dígitos (formato wa.me)
export const HORA_ABERTURA = "08:00";
export const HORA_ULTIMA_RESERVA = "20:30";
export const MAX_GRUPO = 12;

// Webhook do chatbot n8n (Chat Trigger de produção). Pode ser substituído com NEXT_PUBLIC_N8N_CHAT_URL.
export const N8N_CHAT_URL =
  process.env.NEXT_PUBLIC_N8N_CHAT_URL ?? "https://cebeta.app.n8n.cloud/webhook/1402409d-fb46-40ac-bebd-af6f4a8a117e/chat";
