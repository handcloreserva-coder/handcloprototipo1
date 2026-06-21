import "@fontsource/dm-mono/300.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "@fontsource/anonymous-pro/400.css";
import "@fontsource/anonymous-pro/700.css";

import { useEffect, useState } from "react";
import { HandcloStoreProvider } from "./store-context";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import CloAssistant from "./CloAssistant";
import ClosetDrawer from "./ClosetDrawer";
import type { AppKey } from "./apps/registry";

function useRelogio() {
  const [info, setInfo] = useState({ hora: "", data: "" });
  useEffect(() => {
    const tick = () => {
      const a = new Date();
      const h = String(a.getHours()).padStart(2, "0");
      const m = String(a.getMinutes()).padStart(2, "0");
      const dias = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
      const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
      setInfo({ hora: `${h}:${m}`, data: `${dias[a.getDay()]}, ${a.getDate()} ${meses[a.getMonth()]}` });
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return info;
}

export default function Desktop() {
  const { hora, data } = useRelogio();
  const [openApps, setOpenApps] = useState<AppKey[]>([]);
  const [closetAberto, setClosetAberto] = useState(false);
  const [cloVisivel, setCloVisivel] = useState(true);

  function abrir(key: AppKey) {
    setOpenApps((prev) => (prev.includes(key) ? [...prev.filter((k) => k !== key), key] : [...prev, key]));
  }
  function fechar(key: AppKey) {
    setOpenApps((prev) => prev.filter((k) => k !== key));
  }
  function focar(key: AppKey) {
    setOpenApps((prev) => (prev[prev.length - 1] === key ? prev : [...prev.filter((k) => k !== key), key]));
  }

  return (
    <HandcloStoreProvider>
      <div className="hc">
        <div className="desktop">
          <div className="jeans-bg" />
          <div className="jeans-overlay" />
          <div className="jeans-luz" />

          <div className="statusbar">
            <span className="status-txt">handclō os · v1.0.0</span>
            <span className="status-txt">{hora}</span>
          </div>

          <div className="desktop-area">
            <DesktopIcons onOpen={abrir} />

            <div className="closet-tab" onClick={() => setClosetAberto((v) => !v)}>
              <svg width="12" height="20" viewBox="0 0 14 24" fill="none">
                <line x1="7" y1="0" x2="7" y2="4" stroke="rgba(255,255,255,.75)" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M7 4 Q7 2 9.5 2 Q12 2 12 4 Q12 6.5 7 9.5 Q2 6.5 2 4 Q2 2 4.5 2 Q7 2 7 4Z" stroke="rgba(255,255,255,.75)" strokeWidth="1.1" fill="none" />
                <path d="M1 20 Q7 14 13 20" stroke="rgba(255,255,255,.75)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            <ClosetDrawer aberto={closetAberto} onClose={() => setClosetAberto(false)} />

            <WindowManager openApps={openApps} onClose={fechar} onFocus={focar} />

            {cloVisivel && <CloAssistant onClose={() => setCloVisivel(false)} />}
          </div>

          <div className="taskbar">
            <button className="start-btn" onClick={() => setCloVisivel((v) => !v)}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="8" width="20" height="18" rx="4" fill="#fff" stroke="#000" strokeWidth="2" />
                <circle cx="12" cy="16" r="2.5" fill="#000" />
                <circle cx="20" cy="16" r="2.5" fill="#000" />
                <rect x="13" y="21" width="6" height="2" rx="1" fill="#81215B" />
                <line x1="16" y1="4" x2="16" y2="8" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="3" r="1.5" fill="#000" />
                <rect x="2" y="13" width="4" height="7" rx="2" fill="#fff" stroke="#000" strokeWidth="1.5" />
                <rect x="26" y="13" width="4" height="7" rx="2" fill="#fff" stroke="#000" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="tb-sep" />

            <button className="tb-btn" title="provador" onClick={() => abrir("provador")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7H4a1 1 0 00-1 1v8a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" /><line x1="12" y1="7" x2="12" y2="17" /></svg>
            </button>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <button className="tb-look" style={{ position: "relative" }} onClick={() => abrir("arquivo")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                <div className="tb-badge">2</div>
              </button>
              <div className="tb-tray">
                <span>{hora}</span>
                <span className="tb-tray-data">{data}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HandcloStoreProvider>
  );
}