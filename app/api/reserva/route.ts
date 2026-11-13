import { HORA_ABERTURA, HORA_ULTIMA_RESERVA, MAX_GRUPO } from "@/lib/contacto";

// Recebe a reserva do formulário e reencaminha-a para o webhook do n8n.
// O segredo e o URL do webhook ficam só no servidor (variáveis sem NEXT_PUBLIC_).

const resposta = (corpo: Record<string, unknown>, status: number) => Response.json(corpo, { status });

const dataLocalHoje = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export async function POST(request: Request) {
  const url = process.env.N8N_RESERVA_URL;
  const segredo = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !segredo) {
    console.error("[reserva] N8N_RESERVA_URL ou N8N_WEBHOOK_SECRET em falta.");
    return resposta({ ok: false, error: "server_config" }, 500);
  }

  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return resposta({ ok: false, error: "invalid_json" }, 400);
  }

  const { name, group, date, time } = (corpo ?? {}) as Record<string, unknown>;
  const guestName = typeof name === "string" ? name.trim() : "";
  const groupSize = Number(group);
  const data = typeof date === "string" ? date : "";
  const hora = typeof time === "string" ? time : "";

  const valido =
    guestName.length > 0 &&
    guestName.length <= 100 &&
    Number.isInteger(groupSize) &&
    groupSize >= 1 &&
    groupSize <= MAX_GRUPO &&
    /^\d{4}-\d{2}-\d{2}$/.test(data) &&
    data >= dataLocalHoje() &&
    /^\d{2}:\d{2}$/.test(hora) &&
    hora >= HORA_ABERTURA &&
    hora <= HORA_ULTIMA_RESERVA;
  if (!valido) return resposta({ ok: false, error: "invalid_data" }, 400);

  try {
    const n8n = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-webhook-secret": segredo },
      body: JSON.stringify({ guestName, groupSize, bookingTime: `${data}T${hora}` }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!n8n.ok) {
      console.error(`[reserva] n8n respondeu ${n8n.status}`);
      return resposta({ ok: false, error: "upstream" }, 502);
    }
    return resposta({ ok: true }, 200);
  } catch (erro) {
    console.error("[reserva] falha ao contactar o n8n:", erro);
    return resposta({ ok: false, error: "upstream" }, 502);
  }
}
