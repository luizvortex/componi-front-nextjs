"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { LINEAGE_EDGES, LINEAGE_NODES, type LineageNode } from "../data";
import { MiniPreview } from "../hero-preview";

const NODE_W = 90;
const NODE_H = 90;
const COL_GAP = 80;
const ROW_GAP = 20;

function getNodePos(node: LineageNode) {
  return {
    x: node.col * (NODE_W + COL_GAP),
    y: node.row * (NODE_H + ROW_GAP),
  };
}

export function LineageTab() {
  const [hovered, setHovered] = useState<string | null>(null);
  const totalCols = 4;
  const totalRows = 3;
  const svgW = totalCols * (NODE_W + COL_GAP) - COL_GAP + 40;
  const svgH = totalRows * (NODE_H + ROW_GAP) - ROW_GAP;

  return (
    <div style={{ overflowX: "auto", padding: "24px 0 32px", scrollbarWidth: "thin" }}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          minWidth: svgW + 40,
          padding: "0 20px",
        }}
      >
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: svgW + 40,
            height: svgH,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {LINEAGE_EDGES.map((e) => {
            const from = LINEAGE_NODES.find((n) => n.id === e.from)!;
            const to = LINEAGE_NODES.find((n) => n.id === e.to)!;
            const fx = getNodePos(from).x + NODE_W + 20;
            const fy = getNodePos(from).y + NODE_H / 2;
            const tx = getNodePos(to).x + 20;
            const ty = getNodePos(to).y + NODE_H / 2;
            const cx = (fx + tx) / 2;
            const isAccent = from.id === "curr" || to.id === "curr";
            const dimmed = !!hovered && hovered !== from.id && hovered !== to.id;
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={`M${fx},${fy} C${cx},${fy} ${cx},${ty} ${tx},${ty}`}
                fill="none"
                stroke={isAccent ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth={isAccent ? 2 : 1.5}
                opacity={dimmed ? 0.15 : 1}
                strokeDasharray={isAccent ? "none" : "4 3"}
                style={{ transition: "opacity 0.15s" }}
              />
            );
          })}
          {LINEAGE_EDGES.map((e) => {
            const from = LINEAGE_NODES.find((n) => n.id === e.from)!;
            const to = LINEAGE_NODES.find((n) => n.id === e.to)!;
            const tx = getNodePos(to).x + 20;
            const ty = getNodePos(to).y + NODE_H / 2;
            const isAccent = from.id === "curr" || to.id === "curr";
            const dimmed = !!hovered && hovered !== from.id && hovered !== to.id;
            return (
              <polygon
                key={`arr-${e.to}`}
                points={`${tx},${ty} ${tx - 8},${ty - 4} ${tx - 8},${ty + 4}`}
                fill={isAccent ? "var(--accent)" : "var(--border-strong)"}
                opacity={dimmed ? 0.15 : 1}
                style={{ transition: "opacity 0.15s" }}
              />
            );
          })}
        </svg>

        <div style={{ position: "relative", height: svgH }}>
          {LINEAGE_NODES.map((node) => {
            const { x, y } = getNodePos(node);
            const isHovered = hovered === node.id;
            const isDimmed = !!hovered && !node.current && hovered !== node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: x + 20,
                  top: y,
                  width: NODE_W,
                  height: NODE_H,
                  borderRadius: 8,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: node.current
                    ? "2px solid var(--accent)"
                    : "1px solid var(--border-subtle)",
                  boxShadow: node.current
                    ? "0 0 0 4px var(--accent-muted)"
                    : isHovered
                    ? "0 4px 20px rgba(0,0,0,0.4)"
                    : "none",
                  transform: node.current
                    ? "scale(1.08)"
                    : isHovered
                    ? "scale(1.04)"
                    : "scale(1)",
                  opacity: isDimmed ? 0.3 : 1,
                  transition: "transform 0.15s, opacity 0.15s, box-shadow 0.15s",
                  zIndex: node.current ? 10 : isHovered ? 5 : 1,
                  background: "var(--bg-elevated)",
                }}
              >
                <MiniPreview seed={node.seed} />
                <div style={{ position: "absolute", bottom: 6, right: 6 }}>
                  <Avatar name={node.author.slice(1)} size={20} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -38,
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      font: `${node.current ? "600" : "500"} 11px var(--font-ui)`,
                      color: node.current ? "var(--fg-primary)" : "var(--fg-secondary)",
                    }}
                  >
                    {node.name}
                  </div>
                  <div
                    style={{
                      font: "400 10px var(--font-mono)",
                      color: "var(--fg-muted)",
                    }}
                  >
                    {node.author} · ⑂{node.forks}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height: 44 }} />
      </div>
    </div>
  );
}
