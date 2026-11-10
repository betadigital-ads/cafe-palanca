import { cacheLife } from "next/cache";

export type TipoEvento = "openMic" | "degustacao";

export type Ocorrencia = {
  tipo: TipoEvento;
  data: string; // YYYY-MM-DD (dia em Luanda)
  hora: string; // HH:mm
};

// Regras recorrentes. dia: 0 = domingo … 6 = sábado.
const REGRAS: { tipo: TipoEvento; dia: number; hora: string }[] = [
  { tipo: "openMic", dia: 5, hora: "20:00" }, // sextas à noite
  { tipo: "degustacao", dia: 6, hora: "10:00" }, // sábados de manhã
];

const OFFSET_LUANDA_H = 1; // WAT = UTC+1, sem hora de verão

// Próximas `n` ocorrências (ordenadas por data). Em cache por hora: com cacheComponents, ler a data atual
// directamente num Server Component tornaria a rota dinâmica.
export async function proximasOcorrencias(n: number): Promise<Ocorrencia[]> {
  "use cache";
  cacheLife("hours");

  const agora = new Date(Date.now() + OFFSET_LUANDA_H * 3600_000); // "relógio de parede" de Luanda em campos UTC
  const hoje = Date.UTC(agora.getUTCFullYear(), agora.getUTCMonth(), agora.getUTCDate());
  const minutosAgora = agora.getUTCHours() * 60 + agora.getUTCMinutes();

  const todas: Ocorrencia[] = [];
  for (const regra of REGRAS) {
    const [h, m] = regra.hora.split(":").map(Number);
    for (let semana = 0; semana < n; semana++) {
      for (let d = 0; d < 7; d++) {
        const dia = new Date(hoje + (semana * 7 + d) * 86_400_000);
        if (dia.getUTCDay() !== regra.dia) continue;
        const jaPassou = semana === 0 && d === 0 && minutosAgora >= h * 60 + m;
        if (!jaPassou) todas.push({ tipo: regra.tipo, data: dia.toISOString().slice(0, 10), hora: regra.hora });
        break;
      }
    }
  }
  return todas.sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora)).slice(0, n);
}
