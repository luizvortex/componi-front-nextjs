"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  BellIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SearchXIcon,
  UserIcon,
} from "@/components/icons";

type Props = { open: boolean; onClose: () => void };

const COMPONENTS = [
  { name: "Command Palette", author: "luiz", fw: "React" },
  { name: "Animated Tab Bar", author: "sarah_dev", fw: "React" },
  { name: "Data Table", author: "priya_ui", fw: "React" },
];
const PEOPLE = [
  { name: "Sarah Chen", handle: "sarah_dev", followers: "4.2k" },
  { name: "Carlos Mendes", handle: "carlosm", followers: "1.8k" },
];
const TAGS = [
  { name: "animation", count: "1.2k" },
  { name: "forms", count: "890" },
];
const ACTIONS = [
  { label: "Create new component", shortcut: "⌘N", Icon: PlusIcon, href: "/new", badge: 0 },
  { label: "Go to my profile", shortcut: "", Icon: UserIcon, href: "/u/luiz", badge: 0 },
  { label: "Toggle theme", shortcut: "", Icon: MoonIcon, href: "", badge: 0 },
  { label: "View notifications", shortcut: "", Icon: BellIcon, href: "/notifications", badge: 5 },
];

const TOTAL = COMPONENTS.length + PEOPLE.length + TAGS.length + ACTIONS.length;

const sectionLabel: React.CSSProperties = {
  padding: "0 8px 4px",
  font: "500 11px var(--font-ui)",
  color: "var(--fg-muted)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

function Row({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 38,
        padding: "0 8px",
        borderRadius: 6,
        background: selected ? "var(--bg-elevated)" : "transparent",
        cursor: "pointer",
        transition: "background 120ms",
      }}
    >
      {children}
    </div>
  );
}

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, TOTAL - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(0, s - 1)); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && query.trim().length > 6;

  let idx = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10,11,13,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <style>{`
        @keyframes cp-in {
          from { opacity:0; transform:scale(.96) translateY(-6px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "60vh",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: 12,
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "cp-in 160ms ease-out",
        }}
      >
        {/* Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px 10px",
            borderBottom: "1px solid var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          <SearchIcon width={16} height={16} style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search components, people… or try /new"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--fg-primary)",
              font: "400 14px var(--font-ui)",
              caretColor: "var(--accent)",
            }}
          />
          <span
            style={{
              padding: "2px 6px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 4,
              font: "400 12px var(--font-mono)",
              color: "var(--fg-muted)",
              flexShrink: 0,
            }}
          >
            Esc
          </span>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {noResults ? (
            <div
              style={{
                padding: "48px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <SearchXIcon width={24} height={24} style={{ color: "var(--fg-muted)" }} />
              <span style={{ font: "400 14px var(--font-ui)", color: "var(--fg-secondary)" }}>
                No results for &ldquo;{query}&rdquo;
              </span>
              <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-muted)" }}>
                Try /new to create it.
              </span>
            </div>
          ) : (
            <>
              {/* Recent searches */}
              {!hasQuery && (
                <div
                  style={{
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span style={{ font: "500 11px var(--font-ui)", color: "var(--fg-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Recent
                  </span>
                  {["react modal", "data table", "animation"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      style={{
                        height: 24,
                        padding: "0 10px",
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 999,
                        font: "400 12px var(--font-ui)",
                        color: "var(--fg-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}

              {/* Components */}
              <div style={{ padding: "8px 8px 4px" }}>
                <div style={sectionLabel}>Components</div>
                {COMPONENTS.map((c) => {
                  const i = idx++;
                  return (
                    <Link
                      key={c.name}
                      href={`/c/${c.author}/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={onClose}
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      <Row selected={selected === i}>
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 4,
                            background: "linear-gradient(135deg,var(--accent-muted),var(--bg-elevated))",
                            border: "1px solid var(--border-subtle)",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1, font: "500 13px var(--font-ui)", color: "var(--fg-primary)" }}>{c.name}</span>
                        <span style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)" }}>@{c.author}</span>
                        <span
                          style={{
                            padding: "1px 6px",
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: 4,
                            font: "400 11px var(--font-mono)",
                            color: "var(--fg-muted)",
                          }}
                        >
                          {c.fw}
                        </span>
                      </Row>
                    </Link>
                  );
                })}
              </div>

              {/* People */}
              <div style={{ padding: "8px 8px 4px" }}>
                <div style={sectionLabel}>People</div>
                {PEOPLE.map((p) => {
                  const i = idx++;
                  return (
                    <Link
                      key={p.handle}
                      href={`/u/${p.handle}`}
                      onClick={onClose}
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      <Row selected={selected === i}>
                        <Avatar name={p.name} size={28} />
                        <span style={{ flex: 1, font: "500 13px var(--font-ui)", color: "var(--fg-primary)" }}>{p.name}</span>
                        <span style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)" }}>@{p.handle}</span>
                        <span style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)" }}>{p.followers} followers</span>
                      </Row>
                    </Link>
                  );
                })}
              </div>

              {/* Tags */}
              <div style={{ padding: "8px 8px 4px" }}>
                <div style={sectionLabel}>Tags</div>
                {TAGS.map((t) => {
                  const i = idx++;
                  return (
                    <Row key={t.name} selected={selected === i}>
                      <span style={{ font: "700 14px var(--font-ui)", color: "var(--accent)", width: 16, textAlign: "center" }}>#</span>
                      <span style={{ flex: 1, font: "500 13px var(--font-ui)", color: "var(--fg-primary)" }}>{t.name}</span>
                      <span style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)" }}>{t.count} components</span>
                    </Row>
                  );
                })}
              </div>

              {/* Actions */}
              <div style={{ padding: "8px 8px 4px" }}>
                <div style={sectionLabel}>Actions</div>
                {ACTIONS.map((a) => {
                  const i = idx++;
                  const Icon = a.Icon;
                  const inner = (
                    <Row key={a.label} selected={selected === i}>
                      <Icon width={16} height={16} style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
                      <span style={{ flex: 1, font: "400 13px var(--font-ui)", color: "var(--fg-primary)" }}>{a.label}</span>
                      {a.badge > 0 && (
                        <span
                          style={{
                            minWidth: 18,
                            height: 18,
                            padding: "0 4px",
                            background: "var(--accent)",
                            color: "#fff",
                            borderRadius: 999,
                            font: "600 10px var(--font-mono)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {a.badge}
                        </span>
                      )}
                      {a.shortcut && (
                        <span
                          style={{
                            padding: "2px 6px",
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: 4,
                            font: "400 12px var(--font-mono)",
                            color: "var(--fg-muted)",
                          }}
                        >
                          {a.shortcut}
                        </span>
                      )}
                    </Row>
                  );
                  return a.href ? (
                    <Link key={a.label} href={a.href} onClick={onClose} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={a.label}>{inner}</div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Keyboard hints */}
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "8px 16px",
            borderTop: "1px solid var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          {[["↑↓", "navigate"], ["↵", "select"], ["Esc", "close"]].map(([key, label]) => (
            <span
              key={key}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, font: "400 11px var(--font-ui)", color: "var(--fg-muted)" }}
            >
              <span
                style={{
                  padding: "1px 5px",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 3,
                  font: "400 11px var(--font-mono)",
                  color: "var(--fg-muted)",
                }}
              >
                {key}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
