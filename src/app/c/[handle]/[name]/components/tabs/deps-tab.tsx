import { WarningIcon } from "@/components/icons";
import { DEPENDENCIES } from "../data";

export function DepsTab() {
  const unpinned = DEPENDENCIES.filter((d) => !d.pinned).length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 0 16px",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 6,
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.2)",
            font: "500 12px var(--font-ui)",
            color: "var(--warn)",
          }}
        >
          <WarningIcon />
          {unpinned} unpinned versions
        </div>
        <button
          style={{
            height: 28,
            padding: "0 12px",
            borderRadius: 6,
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            font: "500 12px var(--font-ui)",
            cursor: "pointer",
          }}
        >
          Pin all
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {DEPENDENCIES.map((d) => (
          <div
            key={d.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 6,
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                flexShrink: 0,
                background: d.pinned ? "var(--success)" : "var(--warn)",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ font: "500 13px var(--font-mono)", color: "var(--fg-primary)" }}>
                {d.name}
              </span>
              <span
                style={{
                  font: "400 12px var(--font-ui)",
                  color: "var(--fg-muted)",
                  marginLeft: 8,
                }}
              >
                {d.desc}
              </span>
            </div>
            <span
              style={{
                font: "500 12px var(--font-mono)",
                color: d.pinned ? "var(--fg-secondary)" : "var(--warn)",
                background: d.pinned ? "var(--bg-elevated)" : "rgba(245,158,11,0.08)",
                border: `1px solid ${d.pinned ? "var(--border-subtle)" : "rgba(245,158,11,0.2)"}`,
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              {d.version}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
