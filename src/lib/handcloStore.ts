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

export type Categoria = "top" | "calça" | "vestido" | "jaqueta" | "sapato";

export interface Peca {
  id: string;
  nome: string;
  categoria: Categoria;
  img: string; // dataURL
  criadoEm: number;
}

export interface Look {
  id: string;
  label: string;
  img: string; // dataURL
  star: boolean;
  criadoEm: number;
}

/* ════════ cores por tag ════════ */
export const TAG_COR: Record<Tag, string> = {
  travel: "#D0DCEE",
  social: "#FDEAB8",
  "devolução": "#F6F6F0",
  closet: "#E8D4E8",
};

export const CATEGORIAS: Categoria[] = ["top", "calça", "vestido", "jaqueta", "sapato"];

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
      setPecas((prev) => [{ ...p, id: novoId(), criadoEm: Date.now() }, ...prev]),
    [setPecas],
  );

  const remover = useCallback(
    (id: string) => setPecas((prev) => prev.filter((p) => p.id !== id)),
    [setPecas],
  );

  return { pecas, adicionar, remover };
}

/* ════════ looks (arquivo de estilo) ════════ */
export function useLooks() {
  const [looks, setLooks] = useLocalState<Look[]>("handclo.looks", []);

  const adicionar = useCallback(
    (l: Omit<Look, "id" | "criadoEm">) =>
      setLooks((prev) => [{ ...l, id: novoId(), criadoEm: Date.now() }, ...prev]),
    [setLooks],
  );

  const remover = useCallback(
    (id: string) => setLooks((prev) => prev.filter((l) => l.id !== id)),
    [setLooks],
  );

  return { looks, adicionar, remover };
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