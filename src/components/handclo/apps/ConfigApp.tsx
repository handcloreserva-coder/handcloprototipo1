import { useState } from "react";

const ABAS = ["conta", "closet", "notif.", "clō"];

const CONTA: [string, string][] = [["idioma", "pt-br"], ["moeda", "r$"], ["tema", "jeans claro"], ["fuso", "gmt -3"]];
const CLOSET: [string, string][] = [["categorias visíveis", "7 de 9"], ["ordem dos carrosséis", "personalizar →"], ["peças por linha", "3"], ["mostrar preços", "sim"]];
const NOTIF: [string, string][] = [["lembretes de uso", "on"], ["alertas de viagem", "on"], ["sugestões clō", "on"], ["resumo semanal", "off"]];
const CLO: [string, string][] = [["personalidade clō", "direta"], ["idioma clō", "pt-br"], ["mostrar clō no desktop", "sempre"], ["clō.x acumulados", "42 pts"]];

function Linha({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
      <span style={{ fontSize: 9 }}>{k}</span>
      <span style={{ fontSize: 9, color: "#888" }}>{v}</span>
    </div>
  );
}

function Toggle({ k, on }: { k: string; on: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
      <span style={{ fontSize: 9 }}>{k}</span>
      <div style={{ width: 28, height: 14, background: on ? "#81215B" : "#ccc", borderRadius: 7, border: "1.5px solid #000", position: "relative" }}>
        <div style={{ width: 10, height: 10, background: "#fff", borderRadius: "50%", position: "absolute", top: 1, [on ? "right" : "left"]: 1 } as React.CSSProperties} />
      </div>
    </div>
  );
}

export default function ConfigApp() {
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
            {CONTA.map(([k, v]) => <Linha key={k} k={k} v={v} />)}
          </>
        )}
        {aba === 1 && CLOSET.map(([k, v]) => <Linha key={k} k={k} v={v} />)}
        {aba === 2 && NOTIF.map(([k, v]) => <Toggle key={k} k={k} on={v === "on"} />)}
        {aba === 3 && CLO.map(([k, v]) => <Linha key={k} k={k} v={v} />)}
      </div>
    </div>
  );
}