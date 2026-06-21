import { useMemo } from "react";
import { useStore } from "./store-context";

export default function CloAssistant({ onClose }: { onClose: () => void }) {
  const { pecas, looks, viagens, tarefas } = useStore();

  const avisos = useMemo(() => {
    const lista: { txt: string; cor: string }[] = [];
    const semUso = pecas.pecas.filter((p) => (p.usos ?? 0) === 0).length;
    if (semUso > 0) lista.push({ txt: `${semUso} peça${semUso > 1 ? "s" : ""} sem uso no closet — monte um look no provador`, cor: "#81215B" });

    const proxima = [...viagens.viagens].sort((a, b) => a.inicio.localeCompare(b.inicio)).find((v) => v.inicio >= new Date().toISOString().slice(0, 10)) ?? viagens.viagens[0];
    if (proxima) {
      const prontas = proxima.itens.filter((i) => i.pronta).length;
      const dias = Math.max(0, Math.ceil((new Date(proxima.inicio).getTime() - Date.now()) / 86400000));
      lista.push({ txt: `viagem pra ${proxima.destino} em ${dias} dias — ${prontas}/${proxima.itens.length} prontas`, cor: "#D0DCEE" });
    }

    const pendentes = tarefas.filter((t) => !t.concluida).length;
    if (pendentes > 0) lista.push({ txt: `${pendentes} tarefa${pendentes > 1 ? "s" : ""} pendente${pendentes > 1 ? "s" : ""} na agenda`, cor: "#FDEAB8" });

    if (looks.looks.length > 0) lista.push({ txt: `${looks.looks.length} look${looks.looks.length > 1 ? "s" : ""} salvos no arquivo de estilo`, cor: "#E8D4E8" });

    if (lista.length === 0) lista.push({ txt: "tudo em dia — adicione peças no closet para começar", cor: "#81215B" });
    return lista;
  }, [pecas.pecas, looks.looks, viagens.viagens, tarefas]);

  return (
    <div className="clo-win">
      <div className="clo-title">
        <span className="clo-title-text">clō</span>
        <div className="clo-title-btns">
          <div className="clo-btn" onClick={onClose}>_</div>
          <div className="clo-btn" onClick={onClose}>✕</div>
        </div>
      </div>
      <div className="clo-body">
        <div className="clo-saudacao">olá, <span>eduarda.</span></div>
        <div className="clo-msgs">
          {avisos.map((a, i) => (
            <div className="clo-msg-item" key={i}>
              <div className="clo-dot" style={{ background: a.cor, border: a.cor !== "#81215B" ? "1px solid rgba(0,0,0,.15)" : undefined }} />
              <span>{a.txt}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="clo-footer">
        <span className="clo-count">{avisos.length} avisos</span>
        <button className="clo-ver-btn">ver tudo →</button>
      </div>
    </div>
  );
}