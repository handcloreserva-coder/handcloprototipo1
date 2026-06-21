import { useCallback, useEffect, useState } from "react";

/* ════════ tipos ════════ */
export type Tag = "travel" | "social" | "devolução" | "closet";

export interface Tarefa {
  id: string;
  titulo: string;
  data: string; // YYYY-MM-DD
  tag: Tag;
  nota: string;
  concluida: boolean;
}

export type Categoria =
  | "top"
  | "calça"
  | "vestido"
  | "saia"
  | "jaqueta"
  | "casaco"
  | "sapato"
  | "bolsa"
  | "acessório";

export type Estacao = "verão" | "inverno" | "meia-estação" | "todas";
export type Ocasiao = "casual" | "social" | "trabalho" | "viagem" | "festa";
export type LookTag = "casual" | "social" | "inverno" | "viagem" | "festa";

export interface Peca {
  id: string;
  nome: string;
  categoria: Categoria;
  img: string; // dataURL
  cor?: string;
  estacao?: Estacao;
  ocasiao?: Ocasiao;
  tags?: string[];
  usos?: number;
  favorita?: boolean;
  criadoEm: number;
}

export interface Look {
  id: string;
  label: string;
  img: string; // dataURL
  star: boolean;
  tag?: LookTag;
  pecaIds?: string[];
  origem?: "upload" | "provador" | "closet";
  criadoEm: number;
}

export interface ViagemItem {
  id: string;
  texto: string;
  pronta: boolean;
  pecaId?: string;
}

export interface Viagem {
  id: string;
  destino: string;
  inicio: string; // YYYY-MM-DD
  fim: string; // YYYY-MM-DD
  itens: ViagemItem[];
  criadoEm: number;
}

export interface Config {
  idioma: string;
  moeda: string;
  tema: string;
  pecasPorLinha: number;
  lembretes: boolean;
  alertasViagem: boolean;
  sugestoesClo: boolean;
  resumoSemanal: boolean;
  personalidadeClo: string;
}

/* ════════ cores por tag ════════ */
export const TAG_COR: Record<Tag, string> = {
  travel: "#D0DCEE",
  social: "#FDEAB8",
  "devolução": "#F6F6F0",
  closet: "#E8D4E8",
};

export const CATEGORIAS: Categoria[] = [
  "top",
  "calça",
  "vestido",
  "saia",
  "jaqueta",
  "casaco",
  "sapato",
  "bolsa",
  "acessório",
];

export const CORES: { nome: string; hex: string }[] = [
  { nome: "preto", hex: "#1a1a1a" },
  { nome: "branco", hex: "#f5f5f0" },
  { nome: "bege", hex: "#D8C4A8" },
  { nome: "azul", hex: "#D0DCEE" },
  { nome: "magenta", hex: "#81215B" },
  { nome: "verde", hex: "#D8E8D0" },
  { nome: "terracota", hex: "#C57B57" },
  { nome: "amarelo", hex: "#FDEAB8" },
];

export const ESTACOES: Estacao[] = ["verão", "inverno", "meia-estação", "todas"];
export const OCASIOES: Ocasiao[] = ["casual", "social", "trabalho", "viagem", "festa"];
export const LOOK_TAGS: LookTag[] = ["casual", "social", "inverno", "viagem", "festa"];
export const MARCADORES_SUGERIDOS = ["favorita", "nova", "alfaiataria", "estampada", "básica", "statement"];

/* ════════ helper genérico de localStorage ════════ */
function carregar<T>(chave: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function useLocalState<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => carregar(chave, inicial));

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      /* quota cheia — ignora */
    }
  }, [chave, valor]);

  return [valor, setValor] as const;
}

export const novoId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/* ════════ tarefas ════════ */
const TAREFAS_SEED: Tarefa[] = [
  { id: "seed-1", titulo: "viagem lisboa", data: "2026-06-27", tag: "travel", nota: "8 peças separadas", concluida: false },
  { id: "seed-2", titulo: "evento bossa nova", data: "2026-06-20", tag: "social", nota: "look salvo", concluida: false },
  { id: "seed-3", titulo: "devolução aluguel", data: "2026-06-17", tag: "devolução", nota: "2 peças", concluida: true },
];

export function useTarefas() {
  const [tarefas, setTarefas] = useLocalState<Tarefa[]>("handclo.tarefas", TAREFAS_SEED);

  const adicionar = useCallback(
    (t: Omit<Tarefa, "id" | "concluida">) =>
      setTarefas((prev) => [...prev, { ...t, id: novoId(), concluida: false }]),
    [setTarefas],
  );

  const atualizar = useCallback(
    (id: string, campos: Partial<Tarefa>) =>
      setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, ...campos } : t))),
    [setTarefas],
  );

  const alternarConcluida = useCallback(
    (id: string) =>
      setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))),
    [setTarefas],
  );

  const remover = useCallback(
    (id: string) => setTarefas((prev) => prev.filter((t) => t.id !== id)),
    [setTarefas],
  );

  return { tarefas, adicionar, atualizar, alternarConcluida, remover };
}

/* ════════ peças (closet) ════════ */
export function usePecas() {
  const [pecas, setPecas] = useLocalState<Peca[]>("handclo.pecas", []);

  const adicionar = useCallback(
    (p: Omit<Peca, "id" | "criadoEm">) =>
      setPecas((prev) => [{ usos: 0, tags: [], ...p, id: novoId(), criadoEm: Date.now() }, ...prev]),
    [setPecas],
  );

  const atualizar = useCallback(
    (id: string, campos: Partial<Peca>) =>
      setPecas((prev) => prev.map((p) => (p.id === id ? { ...p, ...campos } : p))),
    [setPecas],
  );

  const registrarUso = useCallback(
    (ids: string[]) =>
      setPecas((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, usos: (p.usos ?? 0) + 1 } : p))),
    [setPecas],
  );

  const remover = useCallback(
    (id: string) => setPecas((prev) => prev.filter((p) => p.id !== id)),
    [setPecas],
  );

  return { pecas, adicionar, atualizar, registrarUso, remover };
}

/* ════════ looks (arquivo de estilo) ════════ */
export function useLooks() {
  const [looks, setLooks] = useLocalState<Look[]>("handclo.looks", []);

  const adicionar = useCallback(
    (l: Omit<Look, "id" | "criadoEm">) =>
      setLooks((prev) => [{ ...l, id: novoId(), criadoEm: Date.now() }, ...prev]),
    [setLooks],
  );

  const alternarStar = useCallback(
    (id: string) =>
      setLooks((prev) => prev.map((l) => (l.id === id ? { ...l, star: !l.star } : l))),
    [setLooks],
  );

  const remover = useCallback(
    (id: string) => setLooks((prev) => prev.filter((l) => l.id !== id)),
    [setLooks],
  );

  return { looks, adicionar, alternarStar, remover };
}

/* ════════ viagens (travel) ════════ */
const VIAGENS_SEED: Viagem[] = [
  {
    id: "v-seed-1",
    destino: "lisboa",
    inicio: "2026-06-27",
    fim: "2026-07-04",
    criadoEm: Date.now(),
    itens: [
      { id: "vi-1", texto: "blazer acetinado", pronta: true },
      { id: "vi-2", texto: "calça pantalona preta", pronta: true },
      { id: "vi-3", texto: "vestido linho bege", pronta: true },
      { id: "vi-4", texto: "mule bico fino", pronta: true },
      { id: "vi-5", texto: "conjunto acetinado magenta", pronta: true },
      { id: "vi-6", texto: "jaqueta puffer bege", pronta: true },
      { id: "vi-7", texto: "vestido fluid midi", pronta: false },
      { id: "vi-8", texto: "tênis branco chunky", pronta: false },
    ],
  },
];

export function useViagens() {
  const [viagens, setViagens] = useLocalState<Viagem[]>("handclo.viagens", VIAGENS_SEED);

  const adicionar = useCallback(
    (v: Omit<Viagem, "id" | "criadoEm" | "itens"> & { itens?: ViagemItem[] }) =>
      setViagens((prev) => [
        { itens: [], ...v, id: novoId(), criadoEm: Date.now() },
        ...prev,
      ]),
    [setViagens],
  );

  const atualizar = useCallback(
    (id: string, campos: Partial<Viagem>) =>
      setViagens((prev) => prev.map((v) => (v.id === id ? { ...v, ...campos } : v))),
    [setViagens],
  );

  const remover = useCallback(
    (id: string) => setViagens((prev) => prev.filter((v) => v.id !== id)),
    [setViagens],
  );

  const addItem = useCallback(
    (viagemId: string, item: Omit<ViagemItem, "id" | "pronta"> & { pronta?: boolean }) =>
      setViagens((prev) =>
        prev.map((v) =>
          v.id === viagemId
            ? { ...v, itens: [...v.itens, { pronta: false, ...item, id: novoId() }] }
            : v,
        ),
      ),
    [setViagens],
  );

  const toggleItem = useCallback(
    (viagemId: string, itemId: string) =>
      setViagens((prev) =>
        prev.map((v) =>
          v.id === viagemId
            ? { ...v, itens: v.itens.map((i) => (i.id === itemId ? { ...i, pronta: !i.pronta } : i)) }
            : v,
        ),
      ),
    [setViagens],
  );

  const removeItem = useCallback(
    (viagemId: string, itemId: string) =>
      setViagens((prev) =>
        prev.map((v) => (v.id === viagemId ? { ...v, itens: v.itens.filter((i) => i.id !== itemId) } : v)),
      ),
    [setViagens],
  );

  return { viagens, adicionar, atualizar, remover, addItem, toggleItem, removeItem };
}

/* ════════ configurações ════════ */
const CONFIG_PADRAO: Config = {
  idioma: "pt-br",
  moeda: "r$",
  tema: "jeans claro",
  pecasPorLinha: 3,
  lembretes: true,
  alertasViagem: true,
  sugestoesClo: true,
  resumoSemanal: false,
  personalidadeClo: "direta",
};

export function useConfig() {
  const [config, setConfig] = useLocalState<Config>("handclo.config", CONFIG_PADRAO);

  const atualizar = useCallback(
    (campos: Partial<Config>) => setConfig((prev) => ({ ...prev, ...campos })),
    [setConfig],
  );

  return { config, atualizar };
}

/* ════════ leitura de arquivo -> dataURL ════════ */
export const LIMITE_IMG = 2 * 1024 * 1024; // 2MB

export function lerArquivoComoDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}