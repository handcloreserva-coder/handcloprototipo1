import { useMemo, useRef, useState } from "react";
import { LIMITE_IMG, LOOK_TAGS, lerArquivoComoDataURL, type LookTag } from "@/lib/handcloStore";
import { useStore } from "../store-context";

const SEED_LOOKS = [
  { id: "l1", bg: "#D0DCEE", label: "look 01 · casual", star: true, tag: "casual" as LookTag },
  { id: "l2", bg: "#FDEAB8", label: "look 02 · social", star: false, tag: "social" as LookTag },
  { id: "l3", bg: "#E8D4E8", label: "look 03 · inverno", star: false, tag: "inverno" as LookTag },
  { id: "l4", bg: "#F5D0C0", label: "look 04 · viagem", star: false, tag: "viagem" as LookTag },
  { id: "l5", bg: "#D8E8D0", label: "look 05 · festa", star: false, tag: "festa" as LookTag },
];

const FILTROS: ("todos" | LookTag)[] = ["todos", ...LOOK_TAGS];

export default function ArquivoApp() {
  const { looks, pecas, config } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [filtro, setFiltro] = useState<"todos" | LookTag>("todos");
  const [tagUpload, setTagUpload] = useState<LookTag>("casual");
  const [erro, setErro] = useState("");

  const cols = config.config.pecasPorLinha;

  const looksFiltrados = useMemo(
    () => looks.looks.filter((l) => filtro === "todos" || l.tag === filtro),
    [looks.looks, filtro],
  );
  const seedFiltrados = SEED_LOOKS.filter((l) => filtro === "todos" || l.tag === filtro);

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
    looks.adicionar({ label: `look ${String(n).padStart(2, "0")} · ${tagUpload}`, img, star: false, tag: tagUpload, origem: "upload" });
  }

  return (
    <div>
      <div style={{ padding: "8px 8px 4px", display: "flex", gap: 4, borderBottom: "1.5px solid rgba(0,0,0,.08)", background: "#F6F6F0", flexWrap: "wrap", alignItems: "center" }}>
        {FILTROS.map((f) => (
          <span
            key={f}
            onClick={() => setFiltro(f)}
            style={{ fontSize: 8, padding: "2px 8px", cursor: "pointer", background: filtro === f ? "#81215B" : "#fff", color: filtro === f ? "#fff" : "#000", border: filtro === f ? "1.5px solid #000" : "1.5px solid rgba(0,0,0,.2)", borderRadius: 2, fontWeight: filtro === f ? 700 : 400 }}
          >
            {f}
          </span>
        ))}
        <select value={tagUpload} onChange={(e) => setTagUpload(e.target.value as LookTag)} title="tag do upload" style={{ marginLeft: "auto", fontSize: 8, padding: "2px 4px", border: "1.5px solid #000", borderRadius: 2 }}>
          {LOOK_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {erro && <div style={{ fontSize: 8, color: "#81215B", padding: "4px 10px 0" }}>{erro}</div>}

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

      <div style={{ padding: "10px 10px 6px", display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 8 }}>
        {/* looks enviados do dispositivo / closet */}
        {looksFiltrados.map((l) => {
          const compoe = (l.pecaIds ?? []).map((id) => pecas.pecas.find((p) => p.id === id)).filter(Boolean);
          return (
          <div key={l.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "#fff", border: l.star ? "2.5px solid #81215B" : "2.5px solid #000", boxShadow: l.star ? "3px 3px 0 #81215B" : "3px 3px 0 #000", borderRadius: 2, width: "100%", padding: "4px 4px 18px", position: "relative" }}>
              <button onClick={() => looks.alternarStar(l.id)} title="favoritar" style={{ position: "absolute", top: 2, left: 2, width: 14, height: 14, fontSize: 8, lineHeight: 1, background: l.star ? "#81215B" : "#fff", color: l.star ? "#fff" : "#000", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>★</button>
              <button onClick={() => looks.remover(l.id)} title="excluir" style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, fontSize: 8, lineHeight: 1, background: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>✕</button>
              <div style={{ aspectRatio: "3/4", width: "100%", borderRadius: 1, border: "1px solid rgba(0,0,0,.08)", overflow: "hidden", background: "#f3f3f3" }}>
                <img src={l.img} alt={l.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {compoe.length > 0 && (
                <div style={{ display: "flex", gap: 2, marginTop: 3, justifyContent: "center", flexWrap: "wrap" }}>
                  {compoe.map((p) => <img key={p!.id} src={p!.img} alt={p!.nome} style={{ width: 12, height: 14, objectFit: "cover", border: "1px solid #000", borderRadius: 1 }} />)}
                </div>
              )}
              <div style={{ fontSize: 7, fontWeight: 700, marginTop: 5, textAlign: "center", color: "#333" }}>{l.label}</div>
            </div>
          </div>
          );
        })}

        {/* looks padrão */}
        {seedFiltrados.map((l) => (
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