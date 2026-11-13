import { N8N_CHAT_URL } from "@/lib/contacto";

// Só para desenvolvimento: o webhook do n8n só aceita pedidos vindos de cafe-palanca.vercel.app (CORS),
// por isso em localhost o navegador bloqueia-os ("Failed to fetch"). Aqui o pedido passa pelo servidor do Next.
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });

  const resposta = await fetch(N8N_CHAT_URL, {
    method: "POST",
    headers: { "content-type": request.headers.get("content-type") ?? "application/json" },
    body: await request.arrayBuffer(),
  });

  return new Response(resposta.body, {
    status: resposta.status,
    headers: { "content-type": resposta.headers.get("content-type") ?? "application/json" },
  });
}
