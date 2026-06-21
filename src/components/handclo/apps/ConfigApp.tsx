import { useState } from "react";
import { useStore } from "../store-context";

const ABAS = ["conta", "closet", "notif.", "clō"];

const selStyle: React.CSSProperties = { fontSize: 9, padding: "2px 5px", border: "1.5px solid #000", borderRadius: 2, background: "#fff", fontFamily: "DM Mono, monospace" };

function LinhaSelect({ k, value, options, onChange }: { k: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
      <span style={{ fontSize: 9 }}>{k}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selStyle}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({ k, on, onToggle }: { k: string; on: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
      <span style={{ fontSize: 9 }}>{k}</span>
      <button onClick={onToggle} style={{ width: 28, height: 14, background: on ? "#81215B" : "#ccc", borderRadius: 7, border: "1.5px solid #000", position: "relative", cursor: "pointer", padding: 0 }}>
        <div style={{ width: 10, height: 10, background: "#fff", borderRadius: "50%", position: "absolute", top: 1, [on ? "right" : "left"]: 1 } as React.CSSProperties} />
      </button>
    </div>
  );
}

export default function ConfigApp() {
  const { config } = useStore();
  const c = config.config;
  const set = config.atualizar;
  const [aba, setAba] = useState(0);

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "2.5px solid #000" }}>
        {ABAS.map((t, i) => (
          <div
            key={t}
            onClick={() => setAba(i)}
            style={{ padding: "6px 10px", fontSize: 9, fontWeight: 700, cursor: "pointer", background: aba === i ? "#fff" : "#F6F6F0", borderRight: i < 3 ? "1.5px solid #000" : "none", color: aba === i ? "#000" : "#888" }}
          >
            {t}
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 12px" }}>
        {aba === 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: "1.5px solid rgba(0,0,0,.08)", marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#81215B", border: "2.5px solid #000", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "Anonymous Pro, monospace" }}>eduarda</div>
                <div style={{ fontSize: 8, color: "#888" }}>plano handclō pro</div>
              </div>
            </div>
            <LinhaSelect k="idioma" value={c.idioma} options={["pt-br", "en", "es"]} onChange={(v) => set({ idioma: v })} />
            <LinhaSelect k="moeda" value={c.moeda} options={["r$", "us$", "€"]} onChange={(v) => set({ moeda: v })} />
            <LinhaSelect k="tema" value={c.tema} options={["jeans claro", "jeans escuro"]} onChange={(v) => set({ tema: v })} />
          </>
        )}
        {aba === 1 && (
          <LinhaSelect k="peças por linha" value={String(c.pecasPorLinha)} options={["2", "3", "4"]} onChange={(v) => set({ pecasPorLinha: Number(v) })} />
        )}
        {aba === 2 && (
          <>
            <Toggle k="lembretes de uso" on={c.lembretes} onToggle={() => set({ lembretes: !c.lembretes })} />
            <Toggle k="alertas de viagem" on={c.alertasViagem} onToggle={() => set({ alertasViagem: !c.alertasViagem })} />
            <Toggle k="sugestões clō" on={c.sugestoesClo} onToggle={() => set({ sugestoesClo: !c.sugestoesClo })} />
            <Toggle k="resumo semanal" on={c.resumoSemanal} onToggle={() => set({ resumoSemanal: !c.resumoSemanal })} />
          </>
        )}
        {aba === 3 && (
          <LinhaSelect k="personalidade clō" value={c.personalidadeClo} options={["direta", "gentil", "divertida"]} onChange={(v) => set({ personalidadeClo: v })} />
        )}
      </div>
    </div>
  );
}