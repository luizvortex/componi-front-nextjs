export const AV_PALETTE = [
  "#A31F37",
  "#4F46E5",
  "#0EA5E9",
  "#10B981",
  "#D97706",
  "#7C3AED",
  "#DB2777",
  "#059669",
] as const;

export function avColor(name = ""): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AV_PALETTE[h % AV_PALETTE.length];
}

export function fmtNum(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}
