"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { SearchIcon, TrendingIcon } from "@/components/icons";
import { fmtNum } from "@/lib/utils";
import { SUGGESTIONS, TRENDING } from "./data";

export function RightRail() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  return (
    <aside
      style={{
        width: 300,
        flexShrink: 0,
        borderLeft: "1px solid var(--border-subtle)",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 36,
          padding: "0 12px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 8,
          cursor: "text",
        }}
      >
        <SearchIcon style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
        <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-muted)" }}>
          Search…
        </span>
        <span
          style={{
            marginLeft: "auto",
            font: "500 11px var(--font-mono)",
            padding: "1px 5px",
            borderRadius: 3,
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            color: "var(--fg-secondary)",
          }}
        >
          ⌘K
        </span>
      </div>

      <section>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <span style={{ color: "var(--accent)" }}>
            <TrendingIcon width={14} height={14} />
          </span>
          <h3 style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)", flex: 1 }}>
            Trending this week
          </h3>
          <a href="#" style={{ font: "500 12px var(--font-ui)", color: "var(--fg-muted)" }}>
            See all
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {TRENDING.map((t, i) => (
            <a
              key={t.rank}
              href="#"
              style={{
                display: "grid",
                gridTemplateColumns: "22px 1fr auto",
                alignItems: "center",
                gap: 10,
                padding: "9px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
                textDecoration: "none",
              }}
            >
              <span style={{ font: "500 11px var(--font-mono)", color: "var(--fg-muted)" }}>
                {String(t.rank).padStart(2, "0")}
              </span>
              <div>
                <div
                  style={{
                    font: "600 13px var(--font-ui)",
                    color: "var(--fg-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.name}
                </div>
                <div style={{ font: "400 11px var(--font-mono)", color: "var(--fg-muted)" }}>
                  @{t.author}
                </div>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  font: "500 11px var(--font-mono)",
                  color: "var(--fg-muted)",
                }}
              >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {fmtNum(t.likes)}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)", flex: 1 }}>
            Suggested creators
          </h3>
          <a href="#" style={{ font: "500 12px var(--font-ui)", color: "var(--fg-muted)" }}>
            See all
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {SUGGESTIONS.map((p, i) => {
            const isFollowing = !!following[p.handle];
            return (
              <div
                key={p.handle}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
                }}
              >
                <Avatar name={p.name} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)" }}>
                    {p.name}
                  </div>
                  <div
                    style={{
                      font: "400 11px var(--font-mono)",
                      color: "var(--fg-muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    @{p.handle} · {p.bio}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setFollowing((f) => ({ ...f, [p.handle]: !f[p.handle] }))
                  }
                  style={{
                    height: 28,
                    padding: "0 12px",
                    borderRadius: 6,
                    border: "1px solid var(--border-strong)",
                    background: isFollowing ? "var(--accent)" : "transparent",
                    color: isFollowing ? "#fff" : "var(--fg-secondary)",
                    font: "500 12px var(--font-ui)",
                    flexShrink: 0,
                    transition: "all 0.12s",
                  }}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div
        style={{
          font: "400 11px var(--font-mono)",
          color: "var(--fg-muted)",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: "auto",
        }}
      >
        <a href="#" style={{ color: "inherit" }}>About</a>
        <a href="#" style={{ color: "inherit" }}>Docs</a>
        <a href="#" style={{ color: "inherit" }}>API</a>
        <a href="#" style={{ color: "inherit" }}>Terms</a>
        <span>· © Componi 2026</span>
      </div>
    </aside>
  );
}
