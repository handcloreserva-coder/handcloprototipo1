import { useRef, useState } from "react";
import {
  CATEGORIAS,
  CORES,
  ESTACOES,
  LIMITE_IMG,
  MARCADORES_SUGERIDOS,
  OCASIOES,
  lerArquivoComoDataURL,
  type Categoria,
  type Estacao,
  type Ocasiao,
} from "@/lib/handcloStore";
import { useStore } from "./store-context";

export default function ClosetDrawer({ aberto, onClose }: { aberto: boolean; onClose: () => void }) {
  const { pecas, looks } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendente, setPendente] = useState<string | null>(null); // dataURL aguardando metadados
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("top");
  const [cor, setCor] = useState(CORES[0].nome);
  const [estacao, setEstacao] = useState<Estacao>("todas");
  const [ocasiao, setOcasiao] = useState<Ocasiao>("casual");
  const [marcadores, setMarcadores] = useState<string[]>([]);
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
    setCor(CORES[0].nome);
    setEstacao("todas");
    setOcasiao("casual");
    setMarcadores([]);
    setParaEstilo(false);
  }

  function toggleMarcador(m: string) {
    setMarcadores((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  function salvar() {
    if (!pendente) return;
    const nomeFinal = nome.trim() || categoria;
    pecas.adicionar({ nome: nomeFinal, categoria, img: pendente, cor, estacao, ocasiao, tags: marcadores, favorita: marcadores.includes("favorita") });
    if (paraEstilo) {
      looks.adicionar({ label: `${nomeFinal} · ${categoria}`, img: pendente, star: false, origem: "closet" });
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
            <div style={{ display: "flex", gap: 4 }}>
              <select value={estacao} onChange={(e) => setEstacao(e.target.value as Estacao)} style={{ fontSize: 8, padding: "3px 5px", border: "1.5px solid #000", borderRadius: 2, flex: 1 }}>
                {ESTACOES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={ocasiao} onChange={(e) => setOcasiao(e.target.value as Ocasiao)} style={{ fontSize: 8, padding: "3px 5px", border: "1.5px solid #000", borderRadius: 2, flex: 1 }}>
                {OCASIOES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            {/* cor */}
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {CORES.map((co) => (
                <button key={co.nome} title={co.nome} onClick={() => setCor(co.nome)} style={{ width: 16, height: 16, borderRadius: "50%", background: co.hex, border: cor === co.nome ? "2px solid #81215B" : "1.5px solid #000", cursor: "pointer", padding: 0 }} />
              ))}
            </div>
            {/* marcadores */}
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {MARCADORES_SUGERIDOS.map((m) => {
                const on = marcadores.includes(m);
                return (
                  <button key={m} onClick={() => toggleMarcador(m)} style={{ fontSize: 7, padding: "1px 5px", borderRadius: 2, cursor: "pointer", background: on ? "#81215B" : "#fff", color: on ? "#fff" : "#000", border: "1.5px solid #000", fontWeight: on ? 700 : 400 }}>{m}</button>
                );
              })}
            </div>
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
              {(p.tags && p.tags.length > 0) && (
                <div style={{ fontSize: 6, color: "#81215B", textAlign: "center", maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.tags.join(" · ")}</div>
              )}
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  title="enviar pro arquivo de estilo"
                  onClick={() => looks.adicionar({ label: `${p.nome} · ${p.categoria}`, img: p.img, star: false, pecaIds: [p.id], origem: "closet" })}
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