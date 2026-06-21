import { useMemo } from "react";
import { CATEGORIAS, type Peca } from "@/lib/handcloStore";
import { useStore } from "../store-context";

const BAR_CORES = ["#81215B", "#D0DCEE", "#FDEAB8", "#E8D4E8", "#F5D0C0", "#D8E8D0", "#C57B57", "#1a1a1a", "#D8C4A8"];

/* dados de exemplo plausíveis quando a store está vazia */
const SEED_PECAS: Pick<Peca, "categoria" | "usos">[] = [
  ...Array(24).fill({ categoria: "top", usos: 3 }),
  ...Array(16).fill({ categoria: "calça", usos: 0 }),
  ...Array(12).fill({ categoria: "vestido", usos: 2 }),
  ...Array(9).fill({ categoria: "jaqueta", usos: 0 }),
  ...Array(8).fill({ categoria: "sapato", usos: 5 }),
];

export default function AnalyticsApp() {
  const { pecas, looks, viagens, tarefas } = useStore();

  const dados = useMemo(() => {
    const reais = pecas.pecas;
    const usar = reais.length > 0 ? reais : (SEED_PECAS as Peca[]);
    const total = usar.length;
    const naoUsadas = usar.filter((p) => (p.usos ?? 0) === 0).length;
    const pctNao = total ? Math.round((naoUsadas / total) * 100) : 0;

    const porCat = CATEGORIAS.map((c) => ({ nome: c, n: usar.filter((p) => p.categoria === c).length }))
      .filter((c) => c.n > 0)
      .sort((a, b) => b.n - a.n);
    const maxCat = Math.max(1, ...porCat.map((c) => c.n));

    const topUsadas = [...usar].filter((p) => p.nome).sort((a, b) => (b.usos ?? 0) - (a.usos ?? 0)).slice(0, 4);

    return { total, pctNao, porCat, maxCat, topUsadas, exemplo: reais.length === 0 };
  }, [pecas.pecas]);

  const looksSalvos = looks.looks.length || 12;
  const pendentes = tarefas.filter((t) => !t.concluida).length;

  const METRICAS = [
    { n: String(dados.total), sub: "peças", c: "#81215B" },
    { n: `${dados.pctNao}%`, sub: "não usadas", c: "#000" },
    { n: String(looksSalvos), sub: "looks salvos", c: "#000" },
    { n: String(viagens.viagens.length), sub: "viagens", c: "#000" },
    { n: String(pendentes), sub: "tarefas", c: "#81215B" },
  ];

  return (
    <div style={{ padding: "10px 12px", background: "#F0EBE4" }}>
      {dados.exemplo && <div style={{ fontSize: 7, color: "#888", marginBottom: 6 }}>dados de exemplo · adicione peças no closet</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 10 }}>
        {METRICAS.map((m) => (
          <div key={m.sub} style={{ background: "#fff", border: "2px solid #000", borderRadius: 4, boxShadow: "2px 2px 0 #000", padding: "7px 6px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: m.c, fontFamily: "Anonymous Pro, monospace", lineHeight: 1 }}>{m.n}</div>
            <div style={{ fontSize: 7, color: "#888", marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1.5px solid rgba(0,0,0,.12)", borderRadius: 4, padding: "8px 10px" }}>
        <div style={{ fontSize: 8, fontWeight: 700, marginBottom: 7, color: "#333" }}>por categoria</div>
        {dados.porCat.map((b, i) => (
          <div key={b.nome} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <div style={{ fontSize: 7, width: 46, color: "#888", flexShrink: 0 }}>{b.nome}</div>
            <div style={{ flex: 1, height: 7, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${Math.round((b.n / dados.maxCat) * 100)}%`, height: "100%", background: BAR_CORES[i % BAR_CORES.length] }} />
            </div>
            <div style={{ fontSize: 7, color: "#888", width: 16, textAlign: "right" }}>{b.n}</div>
          </div>
        ))}
      </div>

      {dados.topUsadas.length > 0 && (
        <div style={{ background: "#fff", border: "1.5px solid rgba(0,0,0,.12)", borderRadius: 4, padding: "8px 10px", marginTop: 8 }}>
          <div style={{ fontSize: 8, fontWeight: 700, marginBottom: 7, color: "#333" }}>peças mais usadas</div>
          {dados.topUsadas.map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: "#666", marginBottom: 4 }}>
              <span>{p.nome ?? "—"}</span>
              <span style={{ color: "#81215B", fontWeight: 700 }}>{p.usos ?? 0}× usos</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}