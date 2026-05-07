type Props = {
  size?: number;
};

export function Logo({ size = 20 }: Props) {
  const dotSize = Math.max(4, size * 0.2);
  const dotOffset = size * 0.15;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        font: `600 ${size}px var(--font-ui)`,
        letterSpacing: "-0.04em",
        color: "var(--fg-primary)",
        userSelect: "none",
      }}
    >
      compon
      <span style={{ display: "inline-block", position: "relative" }}>
        i
        <span
          style={{
            position: "absolute",
            left: `${dotOffset}px`,
            top: `${dotOffset}px`,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            background: "var(--accent)",
            borderRadius: "1px",
          }}
        />
      </span>
    </div>
  );
}
