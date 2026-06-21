import { useMemo, useState } from "react";
import { LOOK_TAGS, type LookTag } from "@/lib/handcloStore";
import { useStore } from "../store-context";

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 9,
  padding: "4px 6px",
  border: "1.5px solid #000",
  borderRadius: 3,
  fontFamily: "DM Mono, monospace",
  background: "#fff",
};

export default function ProvadorApp() {
  const { pecas, looks } = useStore();
  const [sel, setSel] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [tag, setTag] = useState<LookTag>("casual");
  const [salvo, setSalvo] = useState(false);

  const selecionadas = useMemo(
    () => sel.map((id) => pecas.pecas.find((p) => p.id === id)).filter(Boolean),
    [sel, pecas.pecas],
  );

  function toggle(id: string) {
    setSalvo(false);
    setSel((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function salvar() {
    if (selecionadas.length === 0) return;
    const capa = selecionadas[0]!.img;
    const nomeFinal = nome.trim() || `look ${tag}`;
    looks.adicionar({ label: `${nomeFinal} · ${tag}`, img: capa, star: false, tag, pecaIds: sel, origem: "provador" });
    pecas.registrarUso(sel);
    setSalvo(true);
    setSel([]);
    setNome("");
  }

  return (
    <div style={{ padding: "8px 10px" }}>
      <div style={{ fontSize: 9, fontWeight: 700, fontFamily: "Anonymous Pro, monospace", marginBottom: 2 }}>
        provador
      </div>
      <div style={{ fontSize: 8, color: "#888", marginBottom: 8 }}>
        monte um look com as peças do closet e salve no arquivo de estilo
      </div>

      {/* prévia empilhada */}
      <div style={{ display: "flex", gap: 4, minHeight: 64, padding: 6, background: "#F6F6F0", border: "1.5px solid #000", borderRadius: 3, marginBottom: 8, overflowX: "auto" }}>
        {selecionadas.length === 0 ? (
          <div style={{ fontSize: 8, color: "#aaa", margin: "auto" }}>nenhuma peça escolhida</div>
        ) : (
          selecionadas.map((p) => (
            <img key={p!.id} src={p!.img} alt={p!.nome} style={{ width: 48, height: 56, objectFit: "cover", border: "1.5px solid #000", borderRadius: 2, flexShrink: 0 }} />
          ))
        )}
      </div>

      {/* grade de peças do closet */}
      {pecas.pecas.length === 0 ? (
        <div style={{ fontSize: 8, color: "#aaa", textAlign: "center", padding: "10px 0" }}>
          adicione peças no closet primeiro
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5, marginBottom: 8 }}>
          {pecas.pecas.map((p) => {
            const on = sel.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                title={p.nome}
                style={{ padding: 0, border: on ? "2.5px solid #81215B" : "1.5px solid #000", borderRadius: 3, cursor: "pointer", overflow: "hidden", background: "#fff", boxShadow: on ? "2px 2px 0 #81215B" : "none" }}
              >
                <img src={p.img} alt={p.nome} style={{ width: "100%", height: 44, objectFit: "cover", display: "block" }} />
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
        <input style={{ ...inputStyle, flex: 1 }} placeholder="nome do look" value={nome} onChange={(e) => setNome(e.target.value)} />
        <select style={{ ...inputStyle, flex: 1 }} value={tag} onChange={(e) => setTag(e.target.value as LookTag)}>
          {LOOK_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <button
        onClick={salvar}
        disabled={selecionadas.length === 0}
        style={{ width: "100%", fontSize: 9, fontWeight: 700, padding: "6px 0", background: selecionadas.length === 0 ? "#ccc" : "#81215B", color: "#fff", border: "1.5px solid #000", borderRadius: 3, cursor: selecionadas.length === 0 ? "default" : "pointer", boxShadow: selecionadas.length === 0 ? "none" : "2px 2px 0 #000" }}
      >
        salvar no arquivo de estilo
      </button>
      {salvo && <div style={{ fontSize: 8, color: "#81215B", marginTop: 5, textAlign: "center" }}>look salvo no arquivo de estilo ✓</div>}
    </div>
  );
}