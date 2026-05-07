type Props = {
  fw: string;
  variant?: "overlay" | "inline";
};

const DOTS: Record<string, string> = {
  React: "#61DAFB",
  Vue: "#42B883",
  Svelte: "#FF3E00",
  Solid: "#2C4F7C",
  Angular: "#DD0031",
};

export function FwBadge({ fw, variant = "inline" }: Props) {
  const dot = DOTS[fw] || "var(--accent)";
  if (variant === "overlay") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: 22,
          padding: "0 8px",
          borderRadius: 4,
          font: "500 11px var(--font-mono)",
          background: "rgba(10,11,13,0.72)",
          color: "#F5F5F7",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: dot,
          }}
        />
        {fw}
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: 22,
        padding: "0 10px",
        borderRadius: 4,
        font: "500 11px var(--font-mono)",
        background: "var(--bg-elevated)",
        color: "var(--fg-secondary)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dot,
        }}
      />
      {fw}
    </span>
  );
}
