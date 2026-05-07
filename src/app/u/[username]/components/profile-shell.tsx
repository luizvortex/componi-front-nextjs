"use client";

import Link from "next/link";
import { useState } from "react";
import { LeftSidebar } from "@/components/left-sidebar";
import { useViewport } from "@/components/use-viewport";
import { Avatar } from "@/components/ui/avatar";
import { FwBadge } from "@/components/ui/fw-badge";
import { BottomNav } from "@/app/(home)/components/bottom-nav";
import { MobileTopBar } from "@/app/(home)/components/mobile-topbar";
import { PostPreview } from "@/app/(home)/components/post-previews";
import {
  ExternalLinkIcon,
  ForkIcon,
  HeartIcon,
  HeartFillIcon,
  MoreIcon,
  MsgIcon,
  StarIcon,
} from "@/components/icons";
import { fmtNum } from "@/lib/utils";

type Tab = "components" | "collections" | "likes" | "forks";

const PROFILE_CARDS = [
  { seed: 0, title: "Command Palette", author: "luiz", fw: "React", likes: 1200, forks: 89, comments: 34, tags: ["search", "keyboard"] },
  { seed: 1, title: "Animated Tab Bar", author: "luiz", fw: "React", likes: 876, forks: 45, comments: 21, tags: ["animation", "tabs"] },
  { seed: 2, title: "Modal System", author: "luiz", fw: "React", likes: 543, forks: 23, comments: 12, tags: ["modal", "overlay"] },
  { seed: 0, title: "Tooltip", author: "luiz", fw: "React", likes: 412, forks: 31, comments: 9, tags: ["tooltip", "ui"] },
  { seed: 1, title: "Sidebar Nav", author: "luiz", fw: "React", likes: 310, forks: 17, comments: 6, tags: ["navigation"] },
  { seed: 2, title: "Badge", author: "luiz", fw: "React", likes: 287, forks: 14, comments: 8, tags: ["badge", "label"] },
  { seed: 0, title: "Skeleton Loader", author: "luiz", fw: "React", likes: 230, forks: 11, comments: 5, tags: ["loading", "ux"] },
  { seed: 1, title: "Dropdown Menu", author: "luiz", fw: "React", likes: 198, forks: 9, comments: 4, tags: ["dropdown", "menu"] },
  { seed: 2, title: "Pagination", author: "luiz", fw: "React", likes: 175, forks: 8, comments: 3, tags: ["pagination"] },
];

const FORK_CARDS = PROFILE_CARDS.slice(0, 6).map((c) => ({ ...c, forkedFrom: "sarah_dev" }));

function ProfileCard({
  seed, title, author, fw, likes, forks, comments, tags, forkedFrom,
}: {
  seed: number; title: string; author: string; fw: string;
  likes: number; forks: number; comments: number; tags: string[]; forkedFrom?: string;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const href = `/c/${author}/${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <article
      style={{
        background: "var(--bg-surface)",
        borderRadius: 8,
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
        transition: "border-color 120ms",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
    >
      <Link href={href} style={{ display: "block", position: "relative" }}>
        <PostPreview seed={seed} h={160} />
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <FwBadge fw={fw} variant="overlay" />
        </div>
      </Link>
      <div style={{ padding: "10px 12px 12px" }}>
        <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)", marginBottom: 2 }}>
            {title}
          </div>
          {forkedFrom && (
            <div style={{ font: "400 11px var(--font-ui)", color: "var(--fg-muted)", marginBottom: 6 }}>
              forked from @{forkedFrom}
            </div>
          )}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <button
            onClick={(e) => { e.preventDefault(); setLiked((v) => { setLikeCount((c) => c + (v ? -1 : 1)); return !v; }); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "transparent", border: "none", color: liked ? "var(--accent)" : "var(--fg-secondary)", padding: 0, font: "500 12px var(--font-ui)", cursor: "pointer" }}
          >
            {liked ? <HeartFillIcon width={13} height={13} /> : <HeartIcon width={13} height={13} />}
            {fmtNum(likeCount)}
          </button>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "500 12px var(--font-ui)", color: "var(--fg-secondary)" }}>
            <ForkIcon width={13} height={13} /> {fmtNum(forks)}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "500 12px var(--font-ui)", color: "var(--fg-secondary)" }}>
            <MsgIcon width={13} height={13} /> {comments}
          </span>
          <button style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4, background: "transparent", border: "none", color: "var(--fg-secondary)", padding: 0, font: "500 12px var(--font-ui)", cursor: "pointer" }}>
            <StarIcon width={13} height={13} />
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {tags.map((t) => (
            <span key={t} style={{ height: 18, padding: "0 7px", background: "var(--bg-elevated)", color: "var(--fg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: 4, font: "500 10px var(--font-ui)", display: "inline-flex", alignItems: "center" }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

const TABS_LIST: { k: Tab; label: string }[] = [
  { k: "components", label: "Components" },
  { k: "collections", label: "Collections" },
  { k: "likes", label: "Likes" },
  { k: "forks", label: "Forks" },
];

const METRICS = [
  { label: "Followers", value: "2.1k" },
  { label: "Following", value: "340" },
  { label: "Components", value: "47" },
  { label: "Forks received", value: "312" },
];

function MainContent({ username }: { username: string }) {
  const [tab, setTab] = useState<Tab>("components");
  const [following, setFollowing] = useState(false);

  const displayName = username === "luiz" ? "Luiz Felipe" : username;

  const cards = tab === "forks" ? FORK_CARDS : PROFILE_CARDS;

  return (
    <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
      {/* Cover */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 180,
            background: "radial-gradient(ellipse at 50% 80%, #1A0A0D 0%, #0A0B0D 70%)",
          }}
        />
        {/* Avatar overlapping cover */}
        <div
          style={{
            position: "absolute",
            bottom: -48,
            left: 24,
          }}
        >
          <div
            style={{
              padding: 4,
              background: "var(--bg-canvas)",
              borderRadius: "50%",
            }}
          >
            <Avatar name={displayName} size={88} />
          </div>
        </div>
      </div>

      {/* Info + actions */}
      <div style={{ padding: "60px 24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ font: "700 20px var(--font-ui)", color: "var(--fg-primary)" }}>{displayName}</h1>
            <div style={{ font: "400 14px var(--font-mono)", color: "var(--fg-muted)", marginTop: 2 }}>
              @{username}
            </div>
            <div style={{ font: "400 14px var(--font-ui)", color: "var(--fg-secondary)", marginTop: 6, maxWidth: 400 }}>
              Design engineer. Building Componi.
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                font: "400 13px var(--font-ui)",
                color: "var(--accent)",
                marginTop: 6,
                cursor: "pointer",
              }}
            >
              componi.dev/@{username}
              <ExternalLinkIcon width={12} height={12} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => setFollowing((v) => !v)}
              style={{
                height: 34,
                padding: "0 20px",
                background: following ? "var(--accent)" : "transparent",
                border: `1px solid ${following ? "var(--accent)" : "var(--border-strong)"}`,
                borderRadius: 6,
                font: "500 13px var(--font-ui)",
                color: following ? "#fff" : "var(--fg-primary)",
                cursor: "pointer",
                transition: "all 120ms",
              }}
            >
              {following ? "Following" : "Follow"}
            </button>
            <button
              style={{
                width: 34,
                height: 34,
                background: "transparent",
                border: "1px solid var(--border-strong)",
                borderRadius: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--fg-primary)",
              }}
            >
              <MoreIcon width={16} height={16} />
            </button>
          </div>
        </div>

        {/* Metrics strip */}
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 20,
            paddingBottom: 16,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {METRICS.map((m) => (
            <button
              key={m.label}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ font: "700 16px var(--font-ui)", color: "var(--fg-primary)" }}>{m.value}</span>
              <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-muted)" }}>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 0,
            borderBottom: "1px solid var(--border-subtle)",
            overflowX: "auto",
          }}
        >
          {TABS_LIST.map((t) => {
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
                  flexShrink: 0,
                  transition: "color 120ms",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
            paddingBottom: 48,
          }}
        >
          {cards.map((c, i) => <ProfileCard key={i} {...c} />)}
        </div>
      </div>
    </div>
  );
}

export function ProfileShell({ username }: { username: string }) {
  const width = useViewport();
  const isDesktop = width >= 1024;

  if (isDesktop) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-canvas)" }}>
        <LeftSidebar active="profile" />
        <MainContent username={username} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-canvas)", display: "flex", flexDirection: "column" }}>
      <MobileTopBar />
      <div style={{ flex: 1, paddingBottom: 58 }}>
        <MainContent username={username} />
      </div>
      <BottomNav />
    </div>
  );
}
