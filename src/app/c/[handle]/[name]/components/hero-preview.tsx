export function HeroPreview() {
  const rows = [
    { active: true, label: "Command Palette · @luiz" },
    { active: false, label: "Animated Tab Bar" },
    { active: false, label: "Data Table · @priya" },
    { active: false, label: "Toast System · @felix" },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 55% 40%,#1A1D24 0%,#0A0B0D 72%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "60%",
          maxWidth: 420,
          background: "#12141A",
          border: "1px solid #2E323B",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #23262D",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "1.5px solid #71717A",
              opacity: 0.5,
            }}
          />
          <div style={{ flex: 1, height: 4, background: "#2E323B", borderRadius: 2 }} />
          <span
            style={{
              font: "500 11px var(--font-mono)",
              color: "#71717A",
              padding: "3px 7px",
              background: "#1A1D24",
              borderRadius: 4,
              border: "1px solid #23262D",
            }}
          >
            ⌘K
          </span>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: r.active ? "#3D0B14" : "transparent",
              borderLeft: r.active ? "2px solid #8B1A2F" : "2px solid transparent",
              transition: "background 0.12s",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: r.active ? "#8B1A2F" : "#2E323B",
              }}
            />
            <span
              style={{
                font: `${r.active ? "600" : "400"} 13px var(--font-ui)`,
                color: r.active ? "#F5F5F7" : "#71717A",
                flex: 1,
              }}
            >
              {r.label}
            </span>
            {r.active && (
              <span
                style={{
                  font: "500 10px var(--font-mono)",
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: "#1A1D24",
                  border: "1px solid #23262D",
                  color: "#71717A",
                }}
              >
                ⏎
              </span>
            )}
          </div>
        ))}
        <div
          style={{
            padding: "10px 16px",
            borderTop: "1px solid #23262D",
            display: "flex",
            gap: 16,
          }}
        >
          {["↑↓ navigate", "⏎ open", "Esc close"].map((k) => (
            <span key={k} style={{ font: "400 10px var(--font-mono)", color: "#546E7A" }}>
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MiniPreview({ seed = 0 }: { seed?: number }) {
  const bgs = [
    "radial-gradient(circle at 55% 40%,#1A1D24 0%,#0A0B0D 72%)",
    "linear-gradient(135deg,#12141A 0%,#1A1D24 100%)",
    "linear-gradient(135deg,#3D0B14 0%,#0A0B0D 100%)",
    "radial-gradient(circle at 30% 60%,#1A1D24 0%,#0A0B0D 70%)",
    "linear-gradient(135deg,#0A0B0D 0%,#12141A 100%)",
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgs[seed % bgs.length],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "70%" }}>
        {[80, 60, 40].map((w, i) => (
          <div
            key={i}
            style={{
              height: 5,
              borderRadius: 2,
              background: i === 0 ? "#8B1A2F" : "#23262D",
              width: `${w}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
