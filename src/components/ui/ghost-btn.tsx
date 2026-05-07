"use client";

import { useState, type ReactNode, type CSSProperties } from "react";

type Props = {
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  title?: string;
};

export function GhostBtn({ icon, children, onClick, active = false, title }: Props) {
  const [hover, setHover] = useState(false);
  const isActive = active || hover;
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 30,
    padding: children ? "0 12px" : "0 8px",
    width: children ? undefined : 30,
    borderRadius: 6,
    background: isActive ? "var(--bg-elevated)" : "transparent",
    border: "1px solid var(--border-subtle)",
    color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)",
    font: "500 12px var(--font-ui)",
    transition: "background 0.12s, color 0.12s",
  };
  return (
    <button
      onClick={onClick}
      title={title}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon}
      {children}
    </button>
  );
}
