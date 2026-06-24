import { useEffect, useState } from "react";

type DetalheId =
  | "cargo-evolucao"
  | "painel-dados"
  | "dashboard-resumo"
  | "controle-transparencia"
  | "convite-detalhado"
  | "historico-youcom"
  | "historico-riachuelo"
  | "historico-renner"
  | "lista-parcerias"
  | "desafio-andamento"
  | "desafio-completo"
  | "resgate-confirmar"
  | "resgate-detalhe";

function MedalhaSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="14" r="11" fill="var(--vc)" stroke="#000" strokeWidth="2.2" />
      <path d="M10 13 L14 18 L22 8" stroke="#000" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22 L7 31 L16 27 L25 31 L23 22" fill="#000" stroke="#000" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function HcoinSvg() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="var(--am)" stroke="#000" strokeWidth="2.2" />
      <text x="12" y="16" fontSize="10" fontWeight="700" textAnchor="middle" fill="#000" fontFamily="DM Mono, monospace">h</text>
    </svg>
  );
}

function useCountdown() {
  const [prazo] = useState(() => Date.now() + (4 * 24 * 60 + 12 * 60 + 36) * 60 * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);
  const restante = Math.max(0, prazo - now);
  const totalMin = Math.floor(restante / 60000);
  const dias = Math.floor(totalMin / (60 * 24));
  const horas = Math.floor((totalMin % (60 * 24)) / 60);
  const min = totalMin % 60;
  const perto = dias === 0 && horas < 6;
  const p = (n: number) => String(n).padStart(2, "0");
  return { dias: p(dias), horas: p(horas), min: p(min), perto };
}

export default function OfficeDrawer({ aberto, onToggle, onClose }: { aberto: boolean; onToggle: () => void; onClose: () => void }) {
  const [detalhe, setDetalhe] = useState<DetalheId | null>(null);
  const [cloVisivel, setCloVisivel] = useState(true);
  const [conviteEstado, setConviteEstado] = useState<"aberto" | "saindo" | "fechado">("aberto");
  const [rennerAtiva, setRennerAtiva] = useState(false);
  const [resgateCodigo, setResgateCodigo] = useState<string | null>(null);
  const [estrelas, setEstrelas] = useState(0);
  const cd = useCountdown();

  function abrirDetalhe(id: DetalheId) {
    setResgateCodigo(null);
    setDetalhe(id);
  }

  function aceitarConvite(e: React.MouseEvent) {
    e.stopPropagation();
    setConviteEstado("saindo");
    setTimeout(() => {
      setConviteEstado("fechado");
      setRennerAtiva(true);
    }, 300);
  }
  function recusarConvite(e: React.MouseEvent) {
    e.stopPropagation();
    setConviteEstado("fechado");
  }

  const detalhes: Record<DetalheId, { titulo: string; body: React.ReactNode }> = {
    "cargo-evolucao": {
      titulo: "evolução de cargo",
      body: (
        <>
          <span className="tier-label" style={{ background: "var(--azc)", color: "#000" }}>Collaborator</span>
          <div className="nivel-row feito"><div className="marcador" />Arrival <span style={{ marginLeft: "auto", fontSize: 8, color: "rgba(0,0,0,.4)" }}>03/03</span></div>
          <div className="nivel-row feito"><div className="marcador" />Collaborator II</div>
          <div className="nivel-row feito"><div className="marcador" />Collaborator III</div>
          <span className="tier-label" style={{ background: "var(--am)", color: "#000" }}>Explorer</span>
          <div className="nivel-row feito"><div className="marcador" />Explorer I</div>
          <div className="nivel-row atual"><div className="marcador" />Explorer II — você está aqui</div>
          <div className="nivel-row futuro"><div className="marcador" />Explorer III</div>
          <span className="tier-label" style={{ background: "var(--mg)", color: "#fff" }}>Master</span>
          <div className="nivel-row futuro"><div className="marcador" />Master I</div>
          <div className="nivel-row futuro"><div className="marcador" />Master II</div>
          <div className="nivel-row futuro"><div className="marcador" />Master III</div>
          <div className="capstone-row">
            <MedalhaSvg className="selo-cap" />
            <div><b>Certificate of Influence</b><br /><span style={{ fontSize: 8, color: "rgba(0,0,0,.5)" }}>conquista final, fora da escada de cargos</span></div>
          </div>
          <h3>o que falta pra Explorer III</h3>
          <div className="detalhe-lista-item ok"><div className="box" />completar 2 desafios</div>
          <div className="detalhe-lista-item"><div className="box" />manter 3 parcerias ativas por 30 dias</div>
        </>
      ),
    },
    "painel-dados": {
      titulo: "painel de dados",
      body: (
        <>
          <div className="detalhe-card"><h3 style={{ marginTop: 0 }}>alcance · 12</h3>visualizações dos seus looks essa semana. <b>+12%</b> vs semana passada.</div>
          <div className="detalhe-card"><h3 style={{ marginTop: 0 }}>engajamento · 8</h3>interações registradas nos looks que você publicou.</div>
          <div className="detalhe-card"><h3 style={{ marginTop: 0 }}>cargo · Explorer II</h3>62% rumo a Explorer III.</div>
        </>
      ),
    },
    "dashboard-resumo": {
      titulo: "resumo do mês · detalhado",
      body: (
        <>
          <h3>evolução</h3>
          <div className="detalhe-grafico">
            <div className="detalhe-barra" style={{ height: "40%" }} />
            <div className="detalhe-barra" style={{ height: "55%" }} />
            <div className="detalhe-barra" style={{ height: "70%" }} />
            <div className="detalhe-barra" style={{ height: "100%" }} />
          </div>
          <h3>tipos de dado gerados</h3>
          <div className="detalhe-linha"><span>visualizações de looks</span><span className="v">186</span></div>
          <div className="detalhe-linha"><span>peças escaneadas</span><span className="v">94</span></div>
          <div className="detalhe-linha"><span>interações registradas</span><span className="v">155</span></div>
        </>
      ),
    },
    "controle-transparencia": {
      titulo: "controle de transparência",
      body: (
        <>
          <p style={{ marginBottom: 10 }}>escolha o que as marcas parceiras podem ver. dados individuais nunca são compartilhados sem agregação.</p>
          <div className="detalhe-linha"><span>alcance dos looks</span><span className="v">visível</span></div>
          <div className="detalhe-linha"><span>engajamento agregado</span><span className="v">visível</span></div>
          <div className="detalhe-linha"><span>peças individuais</span><span className="v">oculto</span></div>
          <div className="detalhe-linha"><span>localização exata</span><span className="v">oculto</span></div>
        </>
      ),
    },
    "convite-detalhado": {
      titulo: "Renner · convite de parceria",
      body: (
        <>
          <div className="detalhe-recompensa-grande"><div className="num">exclusivo</div><div>convite de parceria com a Renner</div></div>
          <h3>o que você ganha</h3>
          <div className="detalhe-lista-item ok"><div className="box" />15% off na primeira compra</div>
          <div className="detalhe-lista-item ok"><div className="box" />acesso antecipado a coleções</div>
          <h3>o que a marca vê</h3>
          <div className="detalhe-lista-item"><div className="box" />alcance e engajamento agregados</div>
        </>
      ),
    },
    "historico-youcom": {
      titulo: "Youcom · parceria ativa",
      body: (
        <>
          <div className="detalhe-linha"><span>parceira desde</span><span className="v">há 3 meses</span></div>
          <h3>benefícios recebidos</h3>
          <div className="detalhe-lista-item ok"><div className="box" />acesso antecipado coleção verão</div>
          <h3>desafios completados</h3>
          <div className="detalhe-lista-item ok"><div className="box" />indicar 1 amiga pro app</div>
        </>
      ),
    },
    "historico-riachuelo": {
      titulo: "Riachuelo · parceria ativa",
      body: (
        <>
          <div className="detalhe-linha"><span>parceira desde</span><span className="v">há 1 mês</span></div>
          <h3>benefícios recebidos</h3>
          <div className="detalhe-lista-item"><div className="box" />nenhum resgatado ainda</div>
          <h3>desafios completados</h3>
          <div className="detalhe-lista-item"><div className="box" />nenhum ainda</div>
        </>
      ),
    },
    "historico-renner": {
      titulo: "Renner · parceria ativa",
      body: (
        <>
          <div className="detalhe-linha"><span>parceira desde</span><span className="v">agora mesmo</span></div>
          <h3>benefícios recebidos</h3>
          <div className="detalhe-lista-item"><div className="box" />nenhum resgatado ainda</div>
          <h3>desafios completados</h3>
          <div className="detalhe-lista-item"><div className="box" />nenhum ainda</div>
        </>
      ),
    },
    "lista-parcerias": {
      titulo: "todas as parcerias ativas",
      body: (
        <>
          <div className="detalhe-linha"><span>Youcom</span><span className="v">há 3 meses</span></div>
          <div className="detalhe-linha"><span>Riachuelo</span><span className="v">há 1 mês</span></div>
          <div className="detalhe-linha"><span>Farm</span><span className="v">há 3 semanas</span></div>
          <div className="detalhe-linha"><span>Gang</span><span className="v">há 2 semanas</span></div>
          <div className="detalhe-linha"><span>NV</span><span className="v">há 2 semanas</span></div>
          <div className="detalhe-linha"><span>Convexo</span><span className="v">há 1 semana</span></div>
        </>
      ),
    },
    "desafio-andamento": {
      titulo: "3 looks com a Youcom",
      body: (
        <>
          <p style={{ marginBottom: 8 }}>publique 3 looks usando peças da Youcom. cada look precisa ter ao menos uma peça marcada como parceria.</p>
          <div className="detalhe-recompensa-grande"><div className="num">+200 hcōin</div><div>recompensa ao completar</div></div>
          <h3>progresso</h3>
          <div className="detalhe-lista-item ok"><div className="box" />look 1 publicado</div>
          <div className="detalhe-lista-item ok"><div className="box" />look 2 publicado</div>
          <div className="detalhe-lista-item"><div className="box" />look 3 pendente</div>
          <div className="detalhe-linha" style={{ marginTop: 8 }}><span>prazo</span><span className="v">{cd.dias}d {cd.horas}h</span></div>
        </>
      ),
    },
    "desafio-completo": {
      titulo: "indicar 1 amiga pro app",
      body: (
        <>
          <div className="detalhe-recompensa-grande"><div className="num">+100 hcōin</div><div>recompensa recebida</div></div>
          <div className="detalhe-linha"><span>concluído em</span><span className="v">14/06</span></div>
          <div className="detalhe-linha"><span>status</span><span className="v">✓ conquistado</span></div>
        </>
      ),
    },
    "resgate-confirmar": {
      titulo: "15% off Renner",
      body: resgateCodigo ? (
        <div className="detalhe-recompensa-grande"><div className="num">{resgateCodigo}</div><div>resgate confirmado — use esse código no checkout</div></div>
      ) : (
        <>
          <div className="detalhe-linha"><span>validade</span><span className="v">até 30/06</span></div>
          <div className="detalhe-linha"><span>como usar</span><span className="v">código no checkout</span></div>
          <p style={{ marginTop: 10 }}>o código é gerado depois de confirmar o resgate.</p>
          <div className="detalhe-btn-confirmar" onClick={() => setResgateCodigo("CLO-9K3X")}>confirmar resgate</div>
        </>
      ),
    },
    "resgate-detalhe": {
      titulo: "acesso antecipado Youcom",
      body: (
        <>
          <div className="detalhe-linha"><span>usado em</span><span className="v">12/06</span></div>
          <div className="detalhe-linha"><span>código usado</span><span className="v">CLO-4F21</span></div>
          <h3>avaliar experiência</h3>
          <div className="detalhe-estrelas">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={n <= estrelas ? "on" : ""} onClick={() => setEstrelas(n)}>★</span>
            ))}
          </div>
        </>
      ),
    },
  };

  return (
    <>
      <div className="office-tab" onClick={onToggle}>
        {!aberto && <div className="office-ponto" />}
        <svg width="12" height="20" viewBox="0 0 14 24" fill="none" style={{ transform: aberto ? "scaleX(-1)" : "none" }}>
          <path d="M13 20 Q7 14 1 20" stroke="rgba(255,255,255,.8)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <rect x="3" y="4" width="8" height="10" rx="1.5" stroke="rgba(255,255,255,.8)" strokeWidth="1.2" fill="none" />
          <line x1="7" y1="14" x2="7" y2="17" stroke="rgba(255,255,255,.8)" strokeWidth="1.2" />
        </svg>
      </div>

      <div className={`drawer-overlay${aberto ? " visivel" : ""}`} onClick={onClose} />

      <div className={`office-col${aberto ? " aberta" : ""}`}>
        <div className="office-main">
          <div className="office-drawer-header">
            <span className="office-drawer-title">office</span>
            <span className="office-drawer-close" onClick={onClose}>✕</span>
          </div>

          <div className="office-header">
            <div className="office-header-top" onClick={() => abrirDetalhe("cargo-evolucao")}>
              <div className="selo-glow" />
              <svg className="selo-cargo" viewBox="0 0 32 36" fill="none">
                <path d="M16 2 L29 7 V18 C29 26 23 31 16 34 C9 31 3 26 3 18 V7 Z" fill="var(--am)" stroke="#000" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M11 17 L14.5 21 L21 13" stroke="var(--mg)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="office-cargo-info">
                <div className="office-cargo-nome">Explorer II</div>
                <div className="office-cargo-sub">62% rumo a Explorer III</div>
              </div>
            </div>
            <div className="office-progress-track"><div className="office-progress-fill" style={{ width: "62%" }} /></div>
          </div>

          {cloVisivel && (
            <div className="clo-momento">
              <div className="clo-momento-x" onClick={() => setCloVisivel(false)}>✕</div>
              <div className="clo-momento-texto">você subiu pra <b>Explorer II!</b> seu closet está rendendo mais do que você imagina.</div>
            </div>
          )}

          <div className="office-scroll">
            {/* ZONA 1: PRECISA DE VOCÊ */}
            <div className="hub-urgente">
              <div className="hub-urgente-label">precisa de você</div>

              {conviteEstado !== "fechado" && (
                <div className={`hub-item card-marca-mini shimmer${conviteEstado === "saindo" ? " saindo" : ""}`} style={{ marginTop: 0 }} onClick={() => abrirDetalhe("convite-detalhado")}>
                  <div className="hub-item-origem">parcerias</div>
                  <div className="exclusivo-tag">exclusivo</div>
                  <div className="card-marca-mini-topo">
                    <div className="card-marca-logo-mini">R</div>
                    <div className="card-marca-nome-mini">Renner</div>
                  </div>
                  <div className="card-marca-desc-mini">toque para revelar os termos da parceria.</div>
                  <div className="card-marca-acoes-mini">
                    <div className="btn-mini aceitar" onClick={aceitarConvite}>aceitar</div>
                    <div className="btn-mini recusar" onClick={recusarConvite}>recusar</div>
                  </div>
                </div>
              )}

              <div className="hub-item" onClick={() => abrirDetalhe("desafio-andamento")}>
                <div className="hub-item-origem">desafios</div>
                <div className="desafio-titulo-row"><div className="desafio-titulo">3 looks com a Youcom</div></div>
                <div className="desafio-meta" style={{ alignItems: "flex-end", marginBottom: 0 }}>
                  <div>
                    <div className="countdown-row">
                      <div className={`countdown-num${cd.perto ? " perto" : ""}`}>{cd.dias}</div><span className="countdown-sep">:</span>
                      <div className={`countdown-num${cd.perto ? " perto" : ""}`}>{cd.horas}</div><span className="countdown-sep">:</span>
                      <div className={`countdown-num${cd.perto ? " perto" : ""}`}>{cd.min}</div>
                    </div>
                    <div className="countdown-label">dias : horas : min</div>
                  </div>
                  <div className="desafio-recompensa"><HcoinSvg /><span>+200 hcōin</span></div>
                </div>
                <div className="pendente-nota" style={{ marginTop: 6 }}>2 de 3 looks já publicados · checklist completo na tela de detalhe</div>
              </div>

              <div className="hub-item beneficio-destaque" style={{ marginTop: 8 }} onClick={() => abrirDetalhe("resgate-confirmar")}>
                <div>
                  <div className="hub-item-origem">benefícios</div>
                  <div className="beneficio-nome">15% off Renner</div>
                  <div className="beneficio-prazo">resgatar até 30/06</div>
                </div>
                <div className="beneficio-destaque-cta">resgatar</div>
              </div>
            </div>

            {/* ZONA 2: SEU HISTÓRICO */}
            <div className="hub-historico">
              <div className="hub-historico-label">seu histórico</div>

              <div className="card-resumo" onClick={() => abrirDetalhe("dashboard-resumo")}>
                <div className="resumo-numero">435 dados</div>
                <div className="resumo-rank-bar"><div className="resumo-rank-fill" style={{ width: "82%" }} /></div>
                <div className="resumo-texto">você está no <b style={{ color: "#000" }}>top 18%</b> das usuárias mais ativas esse mês.</div>
              </div>
              <div className="stats-row">
                <div className="stat-mini" onClick={() => abrirDetalhe("painel-dados")}>
                  <div className="stat-num">12</div>
                  <div className="stat-label">alcance</div>
                  <div className="stat-variacao">+12%</div>
                </div>
                <div className="stat-mini" onClick={() => abrirDetalhe("painel-dados")}>
                  <div className="stat-num">8</div>
                  <div className="stat-label">engajamento</div>
                </div>
                <div className="stat-mini" onClick={() => abrirDetalhe("painel-dados")}>
                  <svg className="stat-icone" viewBox="0 0 32 36" fill="none"><path d="M16 2 L29 7 V18 C29 26 23 31 16 34 C9 31 3 26 3 18 V7 Z" fill="var(--am)" stroke="#000" strokeWidth="2.4" strokeLinejoin="round" /></svg>
                  <div className="stat-num">↑</div>
                  <div className="stat-label">cargo</div>
                </div>
              </div>
              <div className="aviso-transparencia" onClick={() => abrirDetalhe("controle-transparencia")}>o que as marcas parceiras veem: alcance dos looks e engajamento. nunca dados individuais sem agregação. <b>toque pra controlar →</b></div>

              <div className="hub-historico-sub">
                <div className="hub-historico-sub-label">parcerias fechadas</div>
                <div className="colecao-grid">
                  <div className="colecao-circulo cheio" onClick={() => abrirDetalhe("historico-youcom")} style={{ fontSize: 9, fontWeight: 700 }}>Y</div>
                  <div className="colecao-circulo cheio" onClick={() => abrirDetalhe("historico-riachuelo")} style={{ fontSize: 9, fontWeight: 700 }}>R</div>
                  <div className="colecao-circulo mais" onClick={() => abrirDetalhe("lista-parcerias")}>+4</div>
                  {rennerAtiva ? (
                    <div className="colecao-circulo cheio nova" onClick={() => abrirDetalhe("historico-renner")} style={{ fontSize: 9, fontWeight: 700 }}>R</div>
                  ) : (
                    <div className="colecao-circulo vazio" onClick={() => abrirDetalhe("convite-detalhado")}>+</div>
                  )}
                </div>
                <div className="colecao-legenda">{rennerAtiva ? "7 parcerias ativas" : "6 parcerias ativas · 1 nova disponível"}</div>
              </div>

              <div className="hub-historico-sub">
                <div className="hub-historico-sub-label">desafios completados</div>
                <div className="card-desafio">
                  <div className="desafio-clicavel" onClick={() => abrirDetalhe("desafio-completo")}>
                    <div className="desafio-titulo-row">
                      <div className="desafio-titulo">indicar 1 amiga pro app</div>
                      <div className="selo-conquistado">✓ conquistado</div>
                    </div>
                    <div className="desafio-meta">
                      <span>concluído em 14/06</span>
                      <div className="desafio-recompensa"><HcoinSvg /><span>+100 hcōin</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hub-historico-sub">
                <div className="hub-historico-sub-label">benefícios resgatados</div>
                <div className="trofeu-strip" style={{ marginTop: 0 }}>
                  <MedalhaSvg className="trofeu-icone" />
                  <MedalhaSvg className="trofeu-icone" />
                  <MedalhaSvg className="trofeu-icone" />
                </div>
                <div className="trofeu-legenda">3 benefícios resgatados até hoje</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`office-detalhe${detalhe ? " ativo" : ""}`}>
          <div className="detalhe-header">
            <div className="detalhe-voltar" onClick={() => setDetalhe(null)}>←</div>
            <div className="detalhe-titulo">{detalhe ? detalhes[detalhe].titulo : ""}</div>
          </div>
          <div className="detalhe-body">{detalhe && detalhes[detalhe].body}</div>
        </div>
      </div>
    </>
  );
}