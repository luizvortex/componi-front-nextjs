"use client";

import { LeftSidebar } from "@/components/left-sidebar";
import { useViewport } from "@/components/use-viewport";
import { BottomNav } from "./bottom-nav";
import { POSTS } from "./data";
import { MobileTopBar } from "./mobile-topbar";
import { Post } from "./post";
import { RightRail } from "./right-rail";
import { StoriesRow } from "./stories-row";

const LOAD_MORE_BTN: React.CSSProperties = {
  height: 34,
  padding: "0 24px",
  borderRadius: 6,
  background: "transparent",
  border: "1px solid var(--border-subtle)",
  color: "var(--fg-secondary)",
  font: "500 13px var(--font-ui)",
  cursor: "pointer",
};

export function FeedShell() {
  const width = useViewport();
  const isDesktop = width >= 1024;

  if (isDesktop) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "var(--bg-canvas)",
        }}
      >
        <LeftSidebar active="home" />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: 1800,
            borderRight: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 20,
              height: 52,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              borderBottom: "1px solid var(--border-subtle)",
              background: "var(--bg-canvas)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <h2 style={{ font: "600 15px var(--font-ui)", color: "var(--fg-primary)" }}>
              Following
            </h2>
            <span
              style={{
                marginLeft: 8,
                font: "400 12px var(--font-mono)",
                color: "var(--fg-muted)",
              }}
            >
              · 147 today
            </span>
          </div>

          <StoriesRow />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            }}
          >
            {POSTS.map((p) => (
              <Post key={p.id} item={p} compact />
            ))}
          </div>
          <div style={{ padding: "24px 0", display: "flex", justifyContent: "center" }}>
            <button style={LOAD_MORE_BTN}>Load more</button>
          </div>
        </main>

        <RightRail />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-canvas)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileTopBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 480, paddingBottom: 68 }}>
          <StoriesRow />
          {POSTS.map((p) => (
            <Post key={p.id} item={p} />
          ))}
          <div style={{ padding: "24px 0", display: "flex", justifyContent: "center" }}>
            <button style={LOAD_MORE_BTN}>Load more</button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
