import { avColor } from "@/lib/utils";

type Props = {
  name?: string;
  size?: number;
  color?: string;
  ring?: boolean;
  ringColor?: string;
  gap?: number;
};

export function Avatar({
  name = "M",
  size = 36,
  color,
  ring = false,
  ringColor = "var(--accent)",
  gap = 2,
}: Props) {
  const c = color || avColor(name);
  const initial = name[0]?.toUpperCase() ?? "";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        background: `linear-gradient(135deg, ${c} 0%, rgba(0,0,0,0.45) 100%)`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        font: `600 ${Math.round(size * 0.42)}px var(--font-ui)`,
        outline: ring ? `2px solid ${ringColor}` : "none",
        outlineOffset: gap,
        userSelect: "none",
      }}
    >
      {initial}
    </div>
  );
}
