const ITENS = [
  { txt: "blazer acetinado", ok: true },
  { txt: "calça pantalona preta", ok: true },
  { txt: "vestido linho bege", ok: true },
  { txt: "mule bico fino", ok: true },
  { txt: "conjunto acetinado magenta", ok: true },
  { txt: "jaqueta puffer bege", ok: true },
  { txt: "vestido fluid midi", ok: false },
  { txt: "tênis branco chunky", ok: false },
];

export default function TravelApp() {
  return (
    <div>
      <div style={{ padding: "10px 12px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "Anonymous Pro, monospace" }}>lisboa</div>
            <div style={{ fontSize: 8, color: "#888" }}>27 jun – 4 jul · 7 noites</div>
          </div>
          <div style={{ fontSize: 8, background: "#D0DCEE", padding: "2px 8px", borderRadius: 2, border: "1.5px solid rgba(0,0,0,.15)", fontWeight: 700 }}>6 / 8 prontas</div>
        </div>
        <div style={{ height: 5, background: "#eee", borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ width: "75%", height: "100%", background: "#81215B", borderRadius: 3 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {ITENS.map((i) => (
            <div key={i.txt} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: i.ok ? "#F6F6F0" : "#fff", borderRadius: 3, border: `1.5px solid ${i.ok ? "rgba(0,0,0,.08)" : "#000"}`, boxShadow: i.ok ? "none" : "2px 2px 0 #000" }}>
              <div style={{ width: 14, height: 14, borderRadius: 2, flexShrink: 0, background: i.ok ? "#81215B" : "#fff", border: `2px solid ${i.ok ? "#81215B" : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i.ok && <svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
              </div>
              <span style={{ fontSize: 9, textDecoration: i.ok ? "line-through" : "none", color: i.ok ? "#aaa" : "#000", fontWeight: i.ok ? 400 : 500 }}>{i.txt}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "8px 12px", borderTop: "1.5px solid rgba(0,0,0,.08)", marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
        <button style={{ padding: "5px 14px", background: "#000", color: "#fff", border: "none", borderRadius: 3, fontSize: 8, fontWeight: 700, cursor: "pointer", boxShadow: "2px 2px 0 #444" }}>ver mala completa →</button>
      </div>
    </div>
  );
}