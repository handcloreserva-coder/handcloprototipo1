export default function CloAssistant({ onClose }: { onClose: () => void }) {
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
          <div className="clo-msg-item">
            <div className="clo-dot" style={{ background: "#81215B" }} />
            <span>jaqueta puffer sem uso há 22 dias — ela combina com 4 looks salvos</span>
          </div>
          <div className="clo-msg-item">
            <div className="clo-dot" style={{ background: "#D0DCEE", border: "1px solid rgba(0,0,0,.15)" }} />
            <span>viagem pra lisboa em 12 dias — 8 peças na mala</span>
          </div>
          <div className="clo-msg-item">
            <div className="clo-dot" style={{ background: "#FDEAB8", border: "1px solid rgba(0,0,0,.15)" }} />
            <span>42 clō.x disponíveis para resgatar</span>
          </div>
        </div>
      </div>
      <div className="clo-footer">
        <span className="clo-count">3 avisos</span>
        <button className="clo-ver-btn">ver tudo →</button>
      </div>
    </div>
  );
}