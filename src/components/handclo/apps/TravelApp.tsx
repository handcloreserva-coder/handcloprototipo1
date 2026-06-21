import { useEffect, useState } from "react";
import { useStore } from "../store-context";

const inputStyle: React.CSSProperties = {
  fontSize: 9,
  padding: "4px 6px",
  border: "1.5px solid #000",
  borderRadius: 3,
  fontFamily: "DM Mono, monospace",
  background: "#fff",
};

export default function TravelApp() {
  const { viagens, pecas } = useStore();
  const lista = viagens.viagens;
  const [ativaId, setAtivaId] = useState<string | null>(lista[0]?.id ?? null);
  const [novaViagem, setNovaViagem] = useState(false);
  const [destino, setDestino] = useState("");
  const [inicio, setInicio] = useState(new Date().toISOString().slice(0, 10));
  const [fim, setFim] = useState(new Date().toISOString().slice(0, 10));
  const [novoItem, setNovoItem] = useState("");
  const [pecaSel, setPecaSel] = useState("");

  useEffect(() => {
    if (!ativaId || !lista.find((v) => v.id === ativaId)) setAtivaId(lista[0]?.id ?? null);
  }, [lista, ativaId]);

  const ativa = lista.find((v) => v.id === ativaId) ?? null;
  const prontas = ativa ? ativa.itens.filter((i) => i.pronta).length : 0;
  const total = ativa ? ativa.itens.length : 0;
  const pct = total ? Math.round((prontas / total) * 100) : 0;

  function criarViagem() {
    if (!destino.trim()) return;
    viagens.adicionar({ destino: destino.trim(), inicio, fim });
    setDestino("");
    setNovaViagem(false);
  }

  function addManual() {
    if (!ativa || !novoItem.trim()) return;
    viagens.addItem(ativa.id, { texto: novoItem.trim() });
    setNovoItem("");
  }

  function addPeca() {
    if (!ativa || !pecaSel) return;
    const p = pecas.pecas.find((x) => x.id === pecaSel);
    if (!p) return;
    viagens.addItem(ativa.id, { texto: p.nome, pecaId: p.id });
    setPecaSel("");
  }

  return (
    <div style={{ padding: "8px 12px" }}>
      {/* seletor de viagem */}
      <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <select value={ativaId ?? ""} onChange={(e) => setAtivaId(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
          {lista.length === 0 && <option value="">sem viagens</option>}
          {lista.map((v) => <option key={v.id} value={v.id}>{v.destino}</option>)}
        </select>
        <button onClick={() => setNovaViagem((v) => !v)} style={{ fontSize: 8, fontWeight: 700, padding: "4px 8px", background: "#000", color: "#fff", border: "none", borderRadius: 2, cursor: "pointer", boxShadow: "2px 2px 0 #444" }}>{novaViagem ? "fechar" : "+ viagem"}</button>
        {ativa && <button onClick={() => viagens.remover(ativa.id)} title="excluir viagem" style={{ fontSize: 8, padding: "4px 7px", background: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>🗑</button>}
      </div>

      {novaViagem && (
        <div style={{ padding: 8, border: "1.5px solid #000", borderRadius: 3, background: "#F6F6F0", display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          <input style={inputStyle} placeholder="destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
          <div style={{ display: "flex", gap: 6 }}>
            <input type="date" style={{ ...inputStyle, flex: 1 }} value={inicio} onChange={(e) => setInicio(e.target.value)} />
            <input type="date" style={{ ...inputStyle, flex: 1 }} value={fim} onChange={(e) => setFim(e.target.value)} />
          </div>
          <button onClick={criarViagem} style={{ fontSize: 8, fontWeight: 700, padding: "4px 0", background: "#81215B", color: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer", boxShadow: "2px 2px 0 #000" }}>criar viagem</button>
        </div>
      )}

      {!ativa ? (
        <div style={{ fontSize: 9, color: "#aaa", textAlign: "center", padding: "12px 0" }}>crie sua primeira viagem</div>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "Anonymous Pro, monospace" }}>{ativa.destino}</div>
              <div style={{ fontSize: 8, color: "#888" }}>{ativa.inicio} – {ativa.fim}</div>
            </div>
            <div style={{ fontSize: 8, background: "#D0DCEE", padding: "2px 8px", borderRadius: 2, border: "1.5px solid rgba(0,0,0,.15)", fontWeight: 700 }}>{prontas} / {total} prontas</div>
          </div>
          <div style={{ height: 5, background: "#eee", borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "#81215B", borderRadius: 3 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {ativa.itens.length === 0 && <div style={{ fontSize: 8, color: "#aaa", textAlign: "center", padding: "6px 0" }}>adicione itens à mala</div>}
            {ativa.itens.map((i) => (
              <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: i.pronta ? "#F6F6F0" : "#fff", borderRadius: 3, border: `1.5px solid ${i.pronta ? "rgba(0,0,0,.08)" : "#000"}`, boxShadow: i.pronta ? "none" : "2px 2px 0 #000" }}>
                <button onClick={() => viagens.toggleItem(ativa.id, i.id)} style={{ width: 14, height: 14, borderRadius: 2, flexShrink: 0, background: i.pronta ? "#81215B" : "#fff", border: `2px solid ${i.pronta ? "#81215B" : "#ccc"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {i.pronta && <svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
                </button>
                <span style={{ flex: 1, fontSize: 9, textDecoration: i.pronta ? "line-through" : "none", color: i.pronta ? "#aaa" : "#000", fontWeight: i.pronta ? 400 : 500 }}>{i.texto}{i.pecaId ? " · closet" : ""}</span>
                <button onClick={() => viagens.removeItem(ativa.id, i.id)} style={{ fontSize: 8, background: "none", border: "none", color: "#999", cursor: "pointer" }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inputStyle, flex: 1 }} placeholder="novo item" value={novoItem} onChange={(e) => setNovoItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addManual()} />
              <button onClick={addManual} style={{ fontSize: 8, fontWeight: 700, padding: "0 10px", background: "#000", color: "#fff", border: "none", borderRadius: 2, cursor: "pointer" }}>+</button>
            </div>
            {pecas.pecas.length > 0 && (
              <div style={{ display: "flex", gap: 6 }}>
                <select style={{ ...inputStyle, flex: 1 }} value={pecaSel} onChange={(e) => setPecaSel(e.target.value)}>
                  <option value="">puxar peça do closet…</option>
                  {pecas.pecas.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
                <button onClick={addPeca} style={{ fontSize: 8, fontWeight: 700, padding: "0 10px", background: "#81215B", color: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>+</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}