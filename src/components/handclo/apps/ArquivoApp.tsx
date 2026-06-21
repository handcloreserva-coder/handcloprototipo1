import { useRef, useState } from "react";
import { LIMITE_IMG, lerArquivoComoDataURL, novoId } from "@/lib/handcloStore";
import { useStore } from "../store-context";

const SEED_LOOKS = [
  { id: "l1", bg: "#D0DCEE", label: "look 01 · casual", star: true },
  { id: "l2", bg: "#FDEAB8", label: "look 02 · social", star: false },
  { id: "l3", bg: "#E8D4E8", label: "look 03 · inverno", star: false },
  { id: "l4", bg: "#F5D0C0", label: "look 04 · viagem", star: false },
  { id: "l5", bg: "#D8E8D0", label: "look 05 · casual", star: false },
];

const FILTROS = ["todos", "inverno", "casual", "social"];

export default function ArquivoApp() {
  const { looks } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [filtro, setFiltro] = useState("todos");
  const [erro, setErro] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > LIMITE_IMG) {
      setErro("imagem muito grande (máx 2mb)");
      return;
    }
    setErro("");
    const img = await lerArquivoComoDataURL(file);
    const n = looks.looks.length + 1;
    looks.adicionar({ label: `look ${String(n).padStart(2, "0")} · novo`, img, star: false });
  }

  return (
    <div>
      <div style={{ padding: "8px 8px 4px", display: "flex", gap: 4, borderBottom: "1.5px solid rgba(0,0,0,.08)", background: "#F6F6F0", flexWrap: "wrap" }}>
        {FILTROS.map((f) => (
          <span
            key={f}
            onClick={() => setFiltro(f)}
            style={{ fontSize: 8, padding: "2px 8px", cursor: "pointer", background: filtro === f ? "#81215B" : "#fff", color: filtro === f ? "#fff" : "#000", border: filtro === f ? "1.5px solid #000" : "1.5px solid rgba(0,0,0,.2)", borderRadius: 2, fontWeight: filtro === f ? 700 : 400 }}
          >
            {f}
          </span>
        ))}
      </div>

      {erro && <div style={{ fontSize: 8, color: "#81215B", padding: "4px 10px 0" }}>{erro}</div>}

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

      <div style={{ padding: "10px 10px 6px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {/* looks enviados do dispositivo / closet */}
        {looks.looks.map((l) => (
          <div key={l.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "#fff", border: l.star ? "2.5px solid #81215B" : "2.5px solid #000", boxShadow: l.star ? "3px 3px 0 #81215B" : "3px 3px 0 #000", borderRadius: 2, width: "100%", padding: "4px 4px 18px", position: "relative" }}>
              <button onClick={() => looks.remover(l.id)} title="excluir" style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, fontSize: 8, lineHeight: 1, background: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>✕</button>
              <div style={{ aspectRatio: "3/4", width: "100%", borderRadius: 1, border: "1px solid rgba(0,0,0,.08)", overflow: "hidden", background: "#f3f3f3" }}>
                <img src={l.img} alt={l.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontSize: 7, fontWeight: 700, marginTop: 5, textAlign: "center", color: "#333" }}>{l.label}</div>
            </div>
          </div>
        ))}

        {/* looks padrão */}
        {SEED_LOOKS.map((l) => (
          <div key={l.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "#fff", border: l.star ? "2.5px solid #81215B" : "2.5px solid #000", boxShadow: l.star ? "3px 3px 0 #81215B" : "3px 3px 0 #000", borderRadius: 2, width: "100%", padding: "4px 4px 18px" }}>
              <div style={{ background: l.bg, aspectRatio: "3/4", borderRadius: 1, width: "100%", border: "1px solid rgba(0,0,0,.08)" }} />
              <div style={{ fontSize: 7, fontWeight: 700, marginTop: 5, textAlign: "center", color: "#333" }}>{l.label}</div>
            </div>
          </div>
        ))}

        {/* card + (upload do dispositivo) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div onClick={() => fileRef.current?.click()} style={{ background: "#fff", border: "2px dashed #ccc", borderRadius: 3, width: "100%", aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#ccc", cursor: "pointer" }}>+</div>
        </div>
      </div>
    </div>
  );
}

export { novoId };