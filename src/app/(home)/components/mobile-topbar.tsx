"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { BellIcon, MoonIcon, SearchIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/components/use-theme";

const ICON_BTN: React.CSSProperties = {
  width: 40,
  height: 40,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  color: "var(--fg-primary)",
  borderRadius: 8,
};

export function MobileTopBar() {
  const [theme, toggle] = useTheme();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        height: 52,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        background: "var(--bg-canvas)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Link href="/">
        <Logo size={18} />
      </Link>
      <div style={{ flex: 1 }} />
      <button onClick={toggle} aria-label="Toggle theme" style={ICON_BTN}>
        {theme === "dark" ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
      </button>
      <button
        aria-label="Search"
        style={ICON_BTN}
        onClick={() =>
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
          )
        }
      >
        <SearchIcon width={18} height={18} />
      </button>
      <div style={{ position: "relative" }}>
        <button aria-label="Notifications" style={ICON_BTN}>
          <BellIcon width={20} height={20} />
        </button>
        <span
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            minWidth: 16,
            height: 16,
            padding: "0 3px",
            background: "var(--accent)",
            color: "#fff",
            borderRadius: 999,
            font: "600 10px var(--font-mono)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid var(--bg-canvas)",
            pointerEvents: "none",
          }}
        >
          3
        </span>
      </div>
    </header>
  );
}
