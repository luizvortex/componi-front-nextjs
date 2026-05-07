import { Avatar } from "@/components/ui/avatar";
import { COMMENTS } from "../data";

export function DiscussionTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0 0 16px",
          marginBottom: 16,
          display: "flex",
          gap: 10,
        }}
      >
        <Avatar name="Y" size={32} color="#A31F37" />
        <div
          style={{
            flex: 1,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            padding: "10px 14px",
            font: "400 13px var(--font-ui)",
            color: "var(--fg-muted)",
          }}
        >
          Leave a comment…
        </div>
      </div>
      {COMMENTS.map((c, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 10,
            padding: "14px 0",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <Avatar name={c.name} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)" }}>
                {c.name}
              </span>
              {c.isAuthor && (
                <span
                  style={{
                    padding: "1px 6px",
                    borderRadius: 4,
                    font: "500 10px var(--font-ui)",
                    background: "var(--accent-muted)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  author
                </span>
              )}
              <span
                style={{
                  font: "400 12px var(--font-mono)",
                  color: "var(--fg-muted)",
                  marginLeft: "auto",
                }}
              >
                {c.time}
              </span>
            </div>
            <p
              style={{
                font: "400 13px var(--font-ui)",
                color: "var(--fg-secondary)",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {c.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
