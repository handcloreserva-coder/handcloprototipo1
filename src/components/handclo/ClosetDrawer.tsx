import { useRef, useState } from "react";
import { CATEGORIAS, LIMITE_IMG, lerArquivoComoDataURL, type Categoria } from "@/lib/handcloStore";
import { useStore } from "./store-context";

export default function ClosetDrawer({ aberto, onClose }: { aberto: boolean; onClose: () => void }) {
  const { pecas, looks } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendente, setPendente] = useState<string | null>(null); // dataURL aguardando metadados
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("top");
  const [paraEstilo, setParaEstilo] = useState(false);
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
    setPendente(img);
    setNome("");
    setCategoria("top");
    setParaEstilo(false);
  }

  function salvar() {
    if (!pendente) return;
    const nomeFinal = nome.trim() || categoria;
    pecas.adicionar({ nome: nomeFinal, categoria, img: pendente });
    if (paraEstilo) {
      looks.adicionar({ label: `${nomeFinal} · ${categoria}`, img: pendente, star: false });
    }
    setPendente(null);
  }

  return (
    <>
      <div className={`drawer-overlay${aberto ? " visivel" : ""}`} onClick={onClose} />
      <div className={`closet-drawer${aberto ? " aberto" : ""}`}>
        <div className="closet-drawer-header">
          <span className="closet-drawer-title">closet</span>
          <span className="closet-drawer-close" onClick={onClose}>✕</span>
        </div>

        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

        <div style={{ padding: "6px", borderBottom: "1px solid rgba(0,0,0,.08)" }}>
          <button
            onClick={() => fileRef.current?.click()}
            style={{ width: "100%", fontSize: 9, fontWeight: 700, padding: "5px 0", background: "#81215B", color: "#fff", border: "1.5px solid #000", borderRadius: 3, cursor: "pointer", boxShadow: "2px 2px 0 #000" }}
          >
            + peça
          </button>
          {erro && <div style={{ fontSize: 7, color: "#81215B", marginTop: 4 }}>{erro}</div>}
        </div>

        {/* mini-form ao adicionar */}
        {pendente && (
          <div style={{ padding: 8, background: "#F6F6F0", borderBottom: "1px solid rgba(0,0,0,.08)", display: "flex", flexDirection: "column", gap: 5 }}>
            <img src={pendente} alt="prévia" style={{ width: "100%", height: 70, objectFit: "contain" }} />
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" style={{ fontSize: 8, padding: "3px 5px", border: "1.5px solid #000", borderRadius: 2, width: "100%" }} />
            <select value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)} style={{ fontSize: 8, padding: "3px 5px", border: "1.5px solid #000", borderRadius: 2, width: "100%" }}>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <label style={{ fontSize: 7, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <input type="checkbox" checked={paraEstilo} onChange={(e) => setParaEstilo(e.target.checked)} />
              enviar pro arquivo de estilo
            </label>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => setPendente(null)} style={{ flex: 1, fontSize: 7, padding: "4px 0", background: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>cancelar</button>
              <button onClick={salvar} style={{ flex: 1, fontSize: 7, fontWeight: 700, padding: "4px 0", background: "#81215B", color: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>salvar</button>
            </div>
          </div>
        )}

        <div className="closet-drawer-body">
          {pecas.pecas.length === 0 && !pendente && (
            <div style={{ fontSize: 8, color: "#aaa", textAlign: "center", marginTop: 8 }}>adicione suas peças</div>
          )}
          {pecas.pecas.map((p) => (
            <div key={p.id} className="closet-peca-mini">
              <img src={p.img} alt={p.nome} />
              <div style={{ fontSize: 7, color: "#555", textAlign: "center", maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nome}</div>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  title="enviar pro arquivo de estilo"
                  onClick={() => looks.adicionar({ label: `${p.nome} · ${p.categoria}`, img: p.img, star: false })}
                  style={{ fontSize: 6, background: "#FDEAB8", border: "1px solid #000", borderRadius: 2, cursor: "pointer", padding: "1px 3px" }}
                >
                  → estilo
                </button>
                <button onClick={() => pecas.remover(p.id)} style={{ fontSize: 6, background: "#fff", border: "1px solid #000", borderRadius: 2, cursor: "pointer", padding: "1px 4px" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}