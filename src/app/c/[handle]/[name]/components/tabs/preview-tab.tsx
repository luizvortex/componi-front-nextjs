import { ExternalLinkIcon } from "@/components/icons";
import { GhostBtn } from "@/components/ui/ghost-btn";
import { HeroPreview } from "../hero-preview";

const STATS = [
  { l: "Renders in", v: "180ms" },
  { l: "Bundle size", v: "4.2kb gz" },
  { l: "Zero errors", v: "✓ clean" },
];

export function PreviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          position: "relative",
          border: "1px solid var(--border-subtle)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "6px 12px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--bg-surface)",
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#F87171" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--warn)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--success)" }} />
          <span
            style={{
              marginLeft: 8,
              font: "400 11px var(--font-mono)",
              color: "var(--fg-muted)",
              flex: 1,
            }}
          >
            componi.app/preview/command-palette
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              font: "400 11px var(--font-mono)",
              color: "var(--success)",
            }}
          >
            <span
              style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)" }}
            />
            180ms · 0 errors
          </span>
          <GhostBtn icon={<ExternalLinkIcon />} />
        </div>
        <div style={{ height: 340 }}>
          <HeroPreview />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {STATS.map((s) => (
          <div
            key={s.l}
            style={{
              padding: "12px 14px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                font: "500 10px var(--font-ui)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: 4,
              }}
            >
              {s.l}
            </div>
            <div style={{ font: "600 18px var(--font-ui)", color: "var(--fg-primary)" }}>
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
