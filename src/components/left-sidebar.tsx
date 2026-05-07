"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import {
  BellIcon,
  CompassIcon,
  HomeIcon,
  MoonIcon,
  PlusIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "@/components/icons";
import { useTheme } from "@/components/use-theme";

type NavKey = "home" | "explore" | "notifs" | "profile" | "settings";

type NavItem = {
  k: NavKey;
  label: string;
  icon: ReactNode;
  badge?: number;
  href?: string;
};

type Props = {
  active?: NavKey;
};

export function LeftSidebar({ active = "home" }: Props) {
  const [theme, toggle] = useTheme();
  const [cur, setCur] = useState<NavKey>(active);

  const navItems: NavItem[] = [
    { k: "home", label: "Home", icon: <HomeIcon width={18} height={18} />, href: "/" },
    { k: "explore", label: "Explore", icon: <CompassIcon width={18} height={18} />, href: "/explore" },
    { k: "notifs", label: "Notifications", icon: <BellIcon width={18} height={18} />, badge: 5, href: "/notifications" },
    { k: "profile", label: "Profile", icon: <UserIcon width={18} height={18} />, href: "/u/luiz" },
    { k: "settings", label: "Settings", icon: <SettingsIcon width={18} height={18} />, href: "/settings" },
  ];

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        borderRight: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        padding: "20px 12px",
        background: "var(--bg-canvas)",
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "4px 12px 20px" }}>
        <Link href="/">
          <Logo size={20} />
        </Link>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((it) => {
          const isActive = cur === it.k;
          const content = (
            <>
              {it.icon}
              <span>{it.label}</span>
              {it.badge && (
                <span
                  style={{
                    marginLeft: "auto",
                    minWidth: 18,
                    height: 18,
                    padding: "0 5px",
                    background: "var(--accent)",
                    color: "#fff",
                    borderRadius: 999,
                    font: "600 10px var(--font-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {it.badge}
                </span>
              )}
            </>
          );
          const baseStyle = {
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 40,
            padding: "0 12px",
            borderRadius: 8,
            background: isActive ? "var(--bg-elevated)" : "transparent",
            color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)",
            font: `${isActive ? "600" : "500"} 14px var(--font-ui)`,
            transition: "background 0.12s, color 0.12s",
            cursor: "pointer",
            border: "none",
            textAlign: "left" as const,
            width: "100%",
          };
          if (it.href) {
            return (
              <Link
                key={it.k}
                href={it.href}
                onClick={() => setCur(it.k)}
                style={baseStyle}
              >
                {content}
              </Link>
            );
          }
          return (
            <button
              key={it.k}
              onClick={() => setCur(it.k)}
              style={baseStyle}
            >
              {content}
            </button>
          );
        })}
      </nav>

      <Link
        href="/new"
        onClick={() => setCur("home")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 36,
          borderRadius: 8,
          margin: "16px 0 0",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          font: "600 13px var(--font-ui)",
          transition: "background 0.12s",
          textDecoration: "none",
        }}
      >
        <PlusIcon width={16} height={16} /> New component
      </Link>

      <div style={{ flex: 1 }} />

      <button
        onClick={toggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 40,
          padding: "0 12px",
          borderRadius: 8,
          background: "transparent",
          border: "none",
          color: "var(--fg-secondary)",
          font: "500 13px var(--font-ui)",
          transition: "background 0.12s",
        }}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: 12,
          borderRadius: 8,
          marginTop: 4,
          cursor: "pointer",
          background: "transparent",
          transition: "background 0.12s",
        }}
      >
        <Avatar name="Y" size={32} color="#A31F37" />
        <div style={{ minWidth: 0 }}>
          <div style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)" }}>You</div>
          <div style={{ font: "400 12px var(--font-mono)", color: "var(--fg-muted)" }}>
            @yourhandle
          </div>
        </div>
      </div>
    </aside>
  );
}
