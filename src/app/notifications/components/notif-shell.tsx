"use client";

import { useState } from "react";
import { LeftSidebar } from "@/components/left-sidebar";
import { useViewport } from "@/components/use-viewport";
import { Avatar } from "@/components/ui/avatar";
import { BottomNav } from "@/app/(home)/components/bottom-nav";
import { MobileTopBar } from "@/app/(home)/components/mobile-topbar";
import { PostPreview } from "@/app/(home)/components/post-previews";

type Tab = "all" | "unread" | "likes" | "comments" | "follows";

type Notif = {
  id: number;
  read: boolean;
  type: "like" | "fork" | "comment" | "reply" | "follow" | "version" | "mention";
  actor: { name: string; handle: string };
  content: string;
  quotedText?: string;
  time: string;
  thumb?: boolean;
  thumbSeed?: number;
};

const NOTIFS: Notif[] = [
  { id: 1, read: false, type: "like",    actor: { name: "Sarah Chen",    handle: "sarah_dev" }, content: "liked your component", time: "2m ago",  thumb: true, thumbSeed: 0 },
  { id: 2, read: false, type: "fork",    actor: { name: "Carlos Mendes", handle: "carlosm"   }, content: "forked Command Palette", time: "15m ago", thumb: true, thumbSeed: 0 },
  { id: 3, read: false, type: "comment", actor: { name: "priya_ui",      handle: "priya_ui"  }, content: "commented on Command Palette", quotedText: "Loved this implementation, could you add keyboard trap?", time: "1h ago", thumb: true, thumbSeed: 0 },
  { id: 4, read: false, type: "reply",   actor: { name: "Felix Wagner",  handle: "felix"     }, content: "replied to your comment", quotedText: "Great point!", time: "2h ago", thumb: true, thumbSeed: 0 },
  { id: 5, read: false, type: "follow",  actor: { name: "Anya Petrova",  handle: "anya"      }, content: "started following you", time: "3h ago",  thumb: false },
  { id: 6, read: true,  type: "version", actor: { name: "Sarah Chen",    handle: "sarah_dev" }, content: "published v3 of Animated Tab Bar", time: "1d ago", thumb: true, thumbSeed: 1 },
  { id: 7, read: true,  type: "like",    actor: { name: "Felix Wagner",  handle: "felix"     }, content: "liked Data Table", time: "2d ago", thumb: true, thumbSeed: 0 },
  { id: 8, read: true,  type: "mention", actor: { name: "Carlos Mendes", handle: "carlosm"   }, content: "mentioned you in a comment", time: "3d ago", thumb: true, thumbSeed: 2 },
];

const typeLabel: Record<Notif["type"], string> = {
  like: "❤️",
  fork: "⑂",
  comment: "💬",
  reply: "↩",
  follow: "👤",
  version: "🚀",
  mention: "@",
};

function NotifRow({ n }: { n: Notif }) {
  const targetMap: Record<string, string> = {
    like: "Command Palette",
    fork: "Command Palette",
    comment: "Command Palette",
    reply: "your comment",
    follow: "",
    version: "Animated Tab Bar",
    like2: "Data Table",
    mention: "a comment",
  };
  const target = targetMap[n.type] ?? "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 0",
        borderBottom: "1px solid var(--border-subtle)",
        borderLeft: !n.read ? "3px solid var(--accent)" : "3px solid transparent",
        paddingLeft: !n.read ? 13 : 0,
        background: !n.read ? "rgba(26,13,20,0.3)" : "transparent",
        marginLeft: !n.read ? -16 : 0,
        paddingRight: 0,
        transition: "background 120ms",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar name={n.actor.name} size={36} />
        <span
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: 16,
            height: 16,
            background: "var(--bg-elevated)",
            borderRadius: "50%",
            border: "2px solid var(--bg-canvas)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
          }}
        >
          {typeLabel[n.type]}
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "400 13px var(--font-ui)", color: "var(--fg-secondary)", lineHeight: 1.5 }}>
          <span style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)" }}>{n.actor.name}</span>{" "}
          {n.content}
          {target && (
            <>
              {" "}
              <span style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)" }}>{target}</span>
            </>
          )}
        </div>
        {n.quotedText && (
          <div
            style={{
              marginTop: 6,
              padding: "6px 12px",
              background: "var(--bg-elevated)",
              borderRadius: 6,
              font: "400 13px var(--font-ui)",
              color: "var(--fg-secondary)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {n.quotedText}
          </div>
        )}
        <div style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)", marginTop: 4 }}>
          {n.time}
        </div>
      </div>

      {n.thumb && n.thumbSeed !== undefined && (
        <div
          style={{
            width: 48,
            height: 36,
            borderRadius: 6,
            overflow: "hidden",
            flexShrink: 0,
            border: "1px solid var(--border-subtle)",
          }}
        >
          <PostPreview seed={n.thumbSeed} h={36} />
        </div>
      )}
    </div>
  );
}

const TABS: { k: Tab; label: string; badge?: number }[] = [
  { k: "all", label: "All" },
  { k: "unread", label: "Unread", badge: 5 },
  { k: "likes", label: "Likes" },
  { k: "comments", label: "Comments" },
  { k: "follows", label: "Follows" },
];

function MainContent() {
  const [tab, setTab] = useState<Tab>("all");

  const visible = tab === "unread" ? NOTIFS.filter((n) => !n.read) : NOTIFS;

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Header */}
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <h1 style={{ font: "700 28px var(--font-ui)", color: "var(--fg-primary)", letterSpacing: "-0.02em" }}>
          Notifications
        </h1>
        <button
          style={{
            background: "transparent",
            border: "none",
            font: "400 13px var(--font-ui)",
            color: "var(--fg-muted)",
            cursor: "pointer",
          }}
        >
          Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "0 24px",
          borderBottom: "1px solid var(--border-subtle)",
          overflowX: "auto",
        }}
      >
        {TABS.map((t) => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                padding: "12px 0",
                font: `${active ? "600" : "400"} 14px var(--font-ui)`,
                color: active ? "var(--fg-primary)" : "var(--fg-muted)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                transition: "color 120ms",
              }}
            >
              {t.label}
              {t.badge && (
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
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div style={{ padding: "0 24px" }}>
        {visible.map((n) => <NotifRow key={n.id} n={n} />)}
      </div>
    </div>
  );
}

export function NotifShell() {
  const width = useViewport();
  const isDesktop = width >= 1024;

  if (isDesktop) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-canvas)" }}>
        <LeftSidebar active="notifs" />
        <MainContent />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-canvas)", display: "flex", flexDirection: "column" }}>
      <MobileTopBar />
      <div style={{ flex: 1, paddingBottom: 58 }}>
        <MainContent />
      </div>
      <BottomNav />
    </div>
  );
}
