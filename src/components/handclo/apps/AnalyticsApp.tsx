const METRICAS = [
  { n: "87", sub: "peças", c: "#81215B" },
  { n: "34%", sub: "não usadas", c: "#000" },
  { n: "12", sub: "looks salvos", c: "#000" },
];

const CATEGORIAS = [
  { nome: "tops", n: 24, pct: 60, c: "#81215B" },
  { nome: "calças", n: 16, pct: 40, c: "#D0DCEE" },
  { nome: "vestidos", n: 12, pct: 30, c: "#FDEAB8" },
  { nome: "jaquetas", n: 9, pct: 22, c: "#E8D4E8" },
  { nome: "sapatos", n: 8, pct: 20, c: "#F5D0C0" },
];

export default function AnalyticsApp() {
  return (
    <div style={{ padding: "10px 12px", background: "#F0EBE4" }}>
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
        {CATEGORIAS.map((b) => (
          <div key={b.nome} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <div style={{ fontSize: 7, width: 40, color: "#888", flexShrink: 0 }}>{b.nome}</div>
            <div style={{ flex: 1, height: 7, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${b.pct}%`, height: "100%", background: b.c, border: b.c !== "#81215B" ? "1px solid rgba(0,0,0,.1)" : "none" }} />
            </div>
            <div style={{ fontSize: 7, color: "#888", width: 16, textAlign: "right" }}>{b.n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}