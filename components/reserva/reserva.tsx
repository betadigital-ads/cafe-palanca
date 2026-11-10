"use client";

import { useId, useRef, useState } from "react";
import { classesBotao } from "@/components/ui/botao";
import { HORA_ABERTURA, HORA_ULTIMA_RESERVA, MAX_GRUPO, WHATSAPP } from "@/lib/contacto";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Erros = { name?: string; date?: string; time?: string };

const CAMPO =
  "mt-1 h-12 w-full rounded-campo border border-contorno-forte bg-superficie px-3 text-texto placeholder:text-texto-suave aria-[invalid=true]:border-erro";

// Meias horas entre a abertura e a última reserva.
function horas() {
  const [h0, m0] = HORA_ABERTURA.split(":").map(Number);
  const [h1, m1] = HORA_ULTIMA_RESERVA.split(":").map(Number);
  const lista: string[] = [];
  for (let m = h0 * 60 + m0; m <= h1 * 60 + m1; m += 30) {
    lista.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return lista;
}

const dataLocalHoje = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function Reserva({
  dict,
  localeTag,
  variante = "principal",
  className,
}: {
  dict: Dictionary["booking"];
  localeTag: string;
  variante?: "principal" | "contorno";
  className?: string;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const titulo = useId();
  const [erros, setErros] = useState<Erros>({});
  const [hoje, setHoje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function abrir() {
    setErros({});
    setEnviado(false);
    setHoje(dataLocalHoje());
    dialogo.current?.showModal();
  }

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get("name") ?? "").trim();
    const grupo = String(dados.get("group") ?? "1");
    const data = String(dados.get("date") ?? "");
    const hora = String(dados.get("time") ?? "");

    const novos: Erros = {};
    if (!nome) novos.name = dict.errorName;
    if (!data || data < dataLocalHoje()) novos.date = dict.errorDate;
    if (!hora) novos.time = dict.errorTime;
    setErros(novos);
    if (Object.keys(novos).length) return;

    const dataLegivel = new Intl.DateTimeFormat(localeTag, { dateStyle: "full" }).format(new Date(`${data}T12:00:00`));
    const texto = dict.message
      .replace("{name}", nome)
      .replace("{group}", grupo)
      .replace("{date}", dataLegivel)
      .replace("{time}", hora);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    setEnviado(true);
  }

  return (
    <>
      <button type="button" onClick={abrir} className={classesBotao(variante, className)}>
        {dict.button}
      </button>

      <dialog
        ref={dialogo}
        aria-labelledby={titulo}
        className="m-auto w-[min(32rem,calc(100%-2rem))] rounded-painel border border-contorno bg-superficie-elevada p-0 text-texto shadow-elevada backdrop:bg-fundo/80"
      >
        <div className="p-6 md:p-8">
          <h2 id={titulo} className="font-serif text-2xl">
            {enviado ? dict.done : dict.title}
          </h2>

          {enviado ? (
            <div role="status" className="mt-4">
              <p className="text-texto-suave">{dict.doneText}</p>
              <button type="button" onClick={() => dialogo.current?.close()} className={classesBotao("principal", "mt-6")}>
                {dict.close}
              </button>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="mt-4 flex flex-col gap-5">
              <p className="text-sm text-texto-suave">{dict.intro}</p>

              <div>
                <label htmlFor="reserva-nome" className="text-sm font-medium">
                  {dict.name}
                </label>
                <input
                  id="reserva-nome"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={!!erros.name}
                  aria-describedby={erros.name ? "reserva-nome-erro" : undefined}
                  className={CAMPO}
                />
                {erros.name && (
                  <p id="reserva-nome-erro" className="mt-1 text-sm text-erro">
                    {erros.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="reserva-grupo" className="text-sm font-medium">
                  {dict.group}
                </label>
                <select id="reserva-grupo" name="group" defaultValue="2" className={CAMPO}>
                  {Array.from({ length: MAX_GRUPO }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? dict.person : dict.people}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="reserva-data" className="text-sm font-medium">
                    {dict.date}
                  </label>
                  <input
                    id="reserva-data"
                    name="date"
                    type="date"
                    min={hoje}
                    required
                    aria-invalid={!!erros.date}
                    aria-describedby={erros.date ? "reserva-data-erro" : undefined}
                    className={CAMPO}
                  />
                  {erros.date && (
                    <p id="reserva-data-erro" className="mt-1 text-sm text-erro">
                      {erros.date}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="reserva-hora" className="text-sm font-medium">
                    {dict.time}
                  </label>
                  <select
                    id="reserva-hora"
                    name="time"
                    defaultValue=""
                    required
                    aria-invalid={!!erros.time}
                    aria-describedby={erros.time ? "reserva-hora-erro" : undefined}
                    className={CAMPO}
                  >
                    <option value="" disabled>
                      {dict.choose}
                    </option>
                    {horas().map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  {erros.time && (
                    <p id="reserva-hora-erro" className="mt-1 text-sm text-erro">
                      {erros.time}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => dialogo.current?.close()} className={classesBotao("contorno")}>
                  {dict.cancel}
                </button>
                <button type="submit" className={classesBotao("principal")}>
                  {dict.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
