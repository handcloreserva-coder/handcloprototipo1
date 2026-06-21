import { useRef, useState } from "react";
import { APPS, type AppKey } from "./apps/registry";

function FloatingWindow({
  appKey,
  index,
  initialLeft,
  initialTop,
  onClose,
  onFocus,
}: {
  appKey: AppKey;
  index: number;
  initialLeft: number;
  initialTop: number;
  onClose: () => void;
  onFocus: () => void;
}) {
  const def = APPS[appKey];
  const [pos, setPos] = useState({ left: initialLeft, top: initialTop });
  const drag = useRef<{ x: number; y: number; l: number; t: number } | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    drag.current = { x: e.clientX, y: e.clientY, l: pos.left, t: pos.top };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    onFocus();
    e.preventDefault();
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return;
    setPos({
      left: Math.max(0, drag.current.l + (e.clientX - drag.current.x)),
      top: Math.max(0, drag.current.t + (e.clientY - drag.current.y)),
    });
  }
  function onPointerUp() {
    drag.current = null;
  }

  const Component = def.Component;

  return (
    <div
      className="app-win"
      onPointerDown={onFocus}
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        width: def.largura,
        maxWidth: "calc(100% - 16px)",
        background: "#fff",
        border: "2.5px solid #000",
        borderRadius: 6,
        boxShadow: "4px 4px 0 #000",
        overflow: "hidden",
        zIndex: 100 + index,
        maxHeight: "calc(100% - 40px)",
        display: "flex",
        flexDirection: "column",
        touchAction: "none",
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          padding: "5px 6px 5px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: def.cor,
          borderBottom: "1.5px solid rgba(0,0,0,.12)",
          flexShrink: 0,
          cursor: "move",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "Anonymous Pro, monospace", color: "rgba(30,10,40,.8)" }}>{def.titulo}</span>
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onClose}
          style={{ width: 18, height: 16, background: "#fff", border: "2px solid #000", borderRadius: 1, fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          ✕
        </div>
      </div>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <Component />
      </div>
    </div>
  );
}

export default function WindowManager({
  openApps,
  onClose,
  onFocus,
}: {
  openApps: AppKey[];
  onClose: (key: AppKey) => void;
  onFocus: (key: AppKey) => void;
}) {
  return (
    <>
      {openApps.map((key, i) => (
        <FloatingWindow
          key={key}
          appKey={key}
          index={i}
          initialLeft={20 + i * 18}
          initialTop={40 + i * 18}
          onClose={() => onClose(key)}
          onFocus={() => onFocus(key)}
        />
      ))}
    </>
  );
}