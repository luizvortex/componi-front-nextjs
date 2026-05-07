import { avColor } from "@/lib/utils";
import { STORIES } from "./data";

export function StoriesRow() {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        overflowX: "auto",
        padding: "14px 16px",
        borderBottom: "1px solid var(--border-subtle)",
        scrollbarWidth: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              border: "2px dashed var(--border-strong)",
              background: "var(--bg-elevated)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--fg-muted)",
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1={12} y1={5} x2={12} y2={19} />
              <line x1={5} y1={12} x2={19} y2={12} />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid var(--bg-canvas)",
            }}
          >
            <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
              <line x1={12} y1={5} x2={12} y2={19} />
              <line x1={5} y1={12} x2={19} y2={12} />
            </svg>
          </div>
        </div>
        <span style={{ font: "400 11px var(--font-ui)", color: "var(--fg-muted)" }}>You</span>
      </div>
      {STORIES.map((s) => (
        <div
          key={s.handle}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              padding: 2,
              borderRadius: "50%",
              background: s.unread ? "var(--accent)" : "transparent",
              border: s.unread ? "none" : "2px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${avColor(s.name)} 0%,rgba(0,0,0,0.4) 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                font: "600 18px var(--font-ui)",
                border: "2px solid var(--bg-canvas)",
              }}
            >
              {s.name[0]}
            </div>
          </div>
          <span
            style={{
              font: "400 11px var(--font-ui)",
              color: "var(--fg-secondary)",
              maxWidth: 62,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            @{s.handle}
          </span>
        </div>
      ))}
    </div>
  );
}
