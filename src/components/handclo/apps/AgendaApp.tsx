import { useMemo, useState } from "react";
import { TAG_COR, type Tag, type Tarefa } from "@/lib/handcloStore";
import { useStore } from "../store-context";

const TAGS: Tag[] = ["travel", "social", "devolução", "closet"];
const DIAS = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 9,
  padding: "4px 6px",
  border: "1.5px solid #000",
  borderRadius: 3,
  fontFamily: "DM Mono, monospace",
  background: "#fff",
};

function semanaAtual() {
  const hoje = new Date();
  const diaSemana = (hoje.getDay() + 6) % 7; // seg=0
  const segunda = new Date(hoje);
  segunda.setDate(hoje.getDate() - diaSemana);
  return DIAS.map((d, i) => {
    const dt = new Date(segunda);
    dt.setDate(segunda.getDate() + i);
    return { d, n: dt.getDate(), hoje: dt.toDateString() === hoje.toDateString() };
  });
}

export default function AgendaApp() {
  const { tarefas, adicionar, atualizar, alternarConcluida, remover } = useStore();
  const [aberto, setAberto] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<{ titulo: string; data: string; tag: Tag; nota: string }>({
    titulo: "",
    data: new Date().toISOString().slice(0, 10),
    tag: "travel",
    nota: "",
  });

  const semana = useMemo(() => semanaAtual(), []);
  const pendentes = tarefas.filter((t) => !t.concluida).length;
  const concluidas = tarefas.length - pendentes;

  const ordenadas = useMemo(
    () =>
      [...tarefas].sort((a, b) => {
        if (a.concluida !== b.concluida) return a.concluida ? 1 : -1;
        return a.data.localeCompare(b.data);
      }),
    [tarefas],
  );

  function abrirNovo() {
    setEditId(null);
    setForm({ titulo: "", data: new Date().toISOString().slice(0, 10), tag: "travel", nota: "" });
    setAberto(true);
  }

  function abrirEdicao(t: Tarefa) {
    setEditId(t.id);
    setForm({ titulo: t.titulo, data: t.data, tag: t.tag, nota: t.nota });
    setAberto(true);
  }

  function salvar() {
    if (!form.titulo.trim()) return;
    if (editId) atualizar(editId, form);
    else adicionar(form);
    setAberto(false);
    setEditId(null);
  }

  return (
    <div>
      {/* cabeçalho da semana */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "2px solid #000" }}>
        {semana.map((s) => (
          <div
            key={s.d}
            style={{
              padding: "5px 2px",
              textAlign: "center",
              background: s.hoje ? "#81215B" : "#fff",
              borderRight: "1px solid rgba(0,0,0,.08)",
            }}
          >
            <div style={{ fontSize: 7, color: s.hoje ? "rgba(255,255,255,.7)" : "#888" }}>{s.d}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.hoje ? "#fff" : "#000", fontFamily: "Anonymous Pro, monospace" }}>{s.n}</div>
          </div>
        ))}
      </div>

      {/* contador + botão */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px 4px" }}>
        <span style={{ fontSize: 8, color: "#888" }}>
          {pendentes} pendentes · {concluidas} concluídas
        </span>
        <button
          onClick={() => (aberto && !editId ? setAberto(false) : abrirNovo())}
          style={{ fontSize: 8, fontWeight: 700, padding: "3px 8px", background: "#000", color: "#fff", border: "none", borderRadius: 2, cursor: "pointer", boxShadow: "2px 2px 0 #444" }}
        >
          {aberto && !editId ? "fechar" : "+ tarefa"}
        </button>
      </div>

      {/* formulário inline */}
      {aberto && (
        <div style={{ margin: "4px 10px", padding: 8, border: "1.5px solid #000", borderRadius: 3, background: "#F6F6F0", display: "flex", flexDirection: "column", gap: 6 }}>
          <input style={inputStyle} placeholder="título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <div style={{ display: "flex", gap: 6 }}>
            <input type="date" style={{ ...inputStyle, flex: 1 }} value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
            <select style={{ ...inputStyle, flex: 1 }} value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value as Tag })}>
              {TAGS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 30 }} placeholder="nota" value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })} />
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <button onClick={() => { setAberto(false); setEditId(null); }} style={{ fontSize: 8, padding: "4px 10px", background: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer" }}>cancelar</button>
            <button onClick={salvar} style={{ fontSize: 8, fontWeight: 700, padding: "4px 12px", background: "#81215B", color: "#fff", border: "1.5px solid #000", borderRadius: 2, cursor: "pointer", boxShadow: "2px 2px 0 #000" }}>{editId ? "salvar" : "criar"}</button>
          </div>
        </div>
      )}

      {/* lista de tarefas */}
      <div style={{ padding: "8px 10px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        {ordenadas.length === 0 && (
          <div style={{ fontSize: 9, color: "#aaa", textAlign: "center", padding: "12px 0" }}>nenhuma tarefa ainda</div>
        )}
        {ordenadas.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "stretch",
              borderRadius: 3,
              overflow: "hidden",
              border: `1.5px solid ${t.concluida ? "rgba(0,0,0,.2)" : "#000"}`,
              boxShadow: t.concluida ? "none" : "2px 2px 0 #000",
              opacity: t.concluida ? 0.7 : 1,
            }}
          >
            <div style={{ width: 5, background: TAG_COR[t.tag], flexShrink: 0 }} />
            <button
              onClick={() => alternarConcluida(t.id)}
              title="concluir"
              style={{ width: 22, flexShrink: 0, background: t.concluida ? "#81215B" : "#fff", border: "none", borderRight: "1px solid rgba(0,0,0,.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {t.concluida && (
                <svg width="9" height="9" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
              )}
            </button>
            <div style={{ padding: "6px 8px", flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "Anonymous Pro, monospace", textDecoration: t.concluida ? "line-through" : "none", color: t.concluida ? "#aaa" : "#000" }}>{t.titulo}</div>
              <div style={{ fontSize: 8, color: "#888", marginTop: 1 }}>{t.data}{t.nota ? ` · ${t.nota}` : ""}</div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 7, background: TAG_COR[t.tag], padding: "1px 5px", borderRadius: 2, border: "1px solid rgba(0,0,0,.1)" }}>{t.tag}</span>
                <button onClick={() => abrirEdicao(t)} style={{ fontSize: 7, background: "none", border: "none", color: "#81215B", cursor: "pointer", padding: 0 }}>editar</button>
                <button onClick={() => remover(t.id)} style={{ fontSize: 7, background: "none", border: "none", color: "#999", cursor: "pointer", padding: 0 }}>excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}