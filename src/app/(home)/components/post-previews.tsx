type Props = { h: number };

function CommandPalettePreview({ h }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: h,
        background: "radial-gradient(circle at 55% 40%,#1A1D24 0%,#0A0B0D 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "72%",
          maxWidth: 340,
          background: "#12141A",
          border: "1px solid #2E323B",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            padding: "10px 14px",
            borderBottom: "1px solid #23262D",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "1.5px solid #71717A",
              opacity: 0.5,
            }}
          />
          <div style={{ flex: 1, height: 4, background: "#2E323B", borderRadius: 2 }} />
          <span
            style={{
              font: "500 10px var(--font-mono)",
              color: "#71717A",
              padding: "2px 5px",
              background: "#1A1D24",
              borderRadius: 3,
              border: "1px solid #23262D",
            }}
          >
            ⌘K
          </span>
        </div>
        {[true, false, false].map((active, i) => (
          <div
            key={i}
            style={{
              padding: "9px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: active ? "#3D0B14" : "transparent",
              borderLeft: active ? "2px solid #8B1A2F" : "2px solid transparent",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: active ? "#8B1A2F" : "#2E323B",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 4,
                background: active ? "#8B1A2F" : "#23262D",
                borderRadius: 2,
              }}
            />
            {active && (
              <span
                style={{
                  font: "500 9px var(--font-mono)",
                  padding: "1px 5px",
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
            padding: "7px 14px",
            borderTop: "1px solid #23262D",
            display: "flex",
            gap: 12,
          }}
        >
          {["↑↓ nav", "⏎ open", "Esc close"].map((k) => (
            <span key={k} style={{ font: "400 9px var(--font-mono)", color: "#71717A" }}>
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedTabBarPreview({ h }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: h,
        background: "linear-gradient(135deg,#12141A 0%,#1A1D24 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          width: "75%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 2,
            background: "#1A1D24",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "25%",
              width: "25%",
              height: "100%",
              background: "#8B1A2F",
              borderRadius: 2,
              boxShadow: "0 0 12px rgba(139,26,47,0.7)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 5,
            background: "rgba(10,11,13,0.6)",
            border: "1px solid #23262D",
            borderRadius: 999,
          }}
        >
          {["Feed", "Search", "Inbox", "Profile"].map((l, i) => (
            <div
              key={i}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                font: "500 12px var(--font-ui)",
                background: i === 1 ? "#8B1A2F" : "transparent",
                color: i === 1 ? "#fff" : "#A1A1AA",
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MultiStepFormPreview({ h }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: h,
        background: "linear-gradient(135deg,#0A0B0D 0%,#12141A 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "68%",
          maxWidth: 270,
          padding: 20,
          background: "#12141A",
          border: "1px solid #23262D",
          borderRadius: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: i <= 2 ? "#8B1A2F" : "#2E323B",
              }}
            />
          ))}
        </div>
        <div
          style={{
            font: "500 9px var(--font-ui)",
            color: "#71717A",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Step 2 of 3
        </div>
        {["Full name", "Email address", "Password"].map((l, i) => (
          <div key={i} style={{ marginBottom: 7 }}>
            <div
              style={{
                font: "500 9px var(--font-ui)",
                color: "#A1A1AA",
                marginBottom: 3,
              }}
            >
              {l}
            </div>
            <div
              style={{
                height: 26,
                background: "#1A1D24",
                border: `1px solid ${i === 1 ? "#8B1A2F" : "#23262D"}`,
                borderRadius: 5,
              }}
            />
          </div>
        ))}
        <div
          style={{
            height: 28,
            background: "#8B1A2F",
            borderRadius: 5,
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            font: "600 11px var(--font-ui)",
            color: "#fff",
          }}
        >
          Continue →
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = [CommandPalettePreview, AnimatedTabBarPreview, MultiStepFormPreview];

export function PostPreview({ seed, h }: { seed: number; h: number }) {
  const Cmp = PREVIEWS[seed % PREVIEWS.length];
  return <Cmp h={h} />;
}
