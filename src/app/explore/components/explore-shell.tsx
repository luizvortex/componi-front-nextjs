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
  ChevronDownIcon,
  ForkIcon,
  HeartIcon,
  HeartFillIcon,
  MsgIcon,
  StarIcon,
} from "@/components/icons";
import { fmtNum } from "@/lib/utils";

const FRAMEWORKS = ["All", "React", "Vue", "Svelte", "Solid", "Angular"];

const SORT_OPTIONS = ["Trending", "Newest", "Most liked", "Most forked"];

const CARDS = [
  { seed: 0, title: "Command Palette", author: "luiz", name: "Luiz Felipe", fw: "React", likes: 1200, forks: 89, comments: 34, tags: ["search", "keyboard", "modal"] },
  { seed: 1, title: "Animated Tab Bar", author: "sarah_dev", name: "Sarah Chen", fw: "React", likes: 876, forks: 45, comments: 21, tags: ["animation", "tabs", "framer"] },
  { seed: 2, title: "Multi-Step Form", author: "carlosm", name: "Carlos Mendes", fw: "Vue", likes: 543, forks: 23, comments: 12, tags: ["forms", "validation"] },
  { seed: 0, title: "Data Table", author: "priya_ui", name: "Priya Kapoor", fw: "React", likes: 412, forks: 31, comments: 9, tags: ["table", "sorting"] },
  { seed: 1, title: "Toast System", author: "felix", name: "Felix Wagner", fw: "Svelte", likes: 310, forks: 17, comments: 6, tags: ["notifications", "portal"] },
  { seed: 2, title: "Color Picker", author: "anya", name: "Anya Petrova", fw: "React", likes: 287, forks: 14, comments: 8, tags: ["inputs", "color"] },
  { seed: 0, title: "Rich Text Editor", author: "kenji", name: "Kenji Tanaka", fw: "React", likes: 230, forks: 11, comments: 5, tags: ["editor", "wysiwyg"], featured: true },
  { seed: 1, title: "Drag & Drop List", author: "sara_v", name: "Sara Vaughn", fw: "React", likes: 198, forks: 9, comments: 4, tags: ["dnd", "sortable"] },
  { seed: 2, title: "Calendar Picker", author: "otis", name: "Otis Park", fw: "Vue", likes: 175, forks: 8, comments: 3, tags: ["date", "calendar"] },
];

function ExploreCard({
  seed, title, author, name, fw, likes, forks, comments, tags, featured = false,
}: {
  seed: number; title: string; author: string; name: string; fw: string;
  likes: number; forks: number; comments: number; tags: string[]; featured?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const href = `/c/${author}/${title.toLowerCase().replace(/\s+/g, "-")}`;

  const doLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked((v) => {
      setLikeCount((c) => c + (v ? -1 : 1));
      return !v;
    });
  };

  return (
    <article
      style={{
        background: "var(--bg-surface)",
        borderRadius: 8,
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
        gridColumn: featured ? "span 2" : undefined,
        transition: "border-color 120ms",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
    >
      <Link href={href} style={{ display: "block", position: "relative" }}>
        <PostPreview seed={seed} h={featured ? 240 : 180} />
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <Avatar name={name} size={22} />
          <span style={{ font: "500 11px var(--font-ui)", color: "var(--fg-secondary)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
            @{author}
          </span>
        </div>
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <FwBadge fw={fw} variant="overlay" />
        </div>
      </Link>

      <div style={{ padding: "10px 12px 12px" }}>
        <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)", marginBottom: 6 }}>
            {title}
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <button
            onClick={doLike}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "transparent",
              border: "none",
              color: liked ? "var(--accent)" : "var(--fg-secondary)",
              padding: 0,
              font: "500 12px var(--font-ui)",
              cursor: "pointer",
              transition: "color 120ms",
            }}
          >
            {liked
              ? <HeartFillIcon width={14} height={14} />
              : <HeartIcon width={14} height={14} />}
            {fmtNum(likeCount)}
          </button>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, font: "500 12px var(--font-ui)", color: "var(--fg-secondary)" }}>
            <ForkIcon width={14} height={14} /> {fmtNum(forks)}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, font: "500 12px var(--font-ui)", color: "var(--fg-secondary)" }}>
            <MsgIcon width={14} height={14} /> {comments}
          </span>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "transparent",
              border: "none",
              color: "var(--fg-secondary)",
              padding: 0,
              font: "500 12px var(--font-ui)",
              cursor: "pointer",
            }}
          >
            <StarIcon width={14} height={14} />
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                height: 18,
                padding: "0 7px",
                background: "var(--bg-elevated)",
                color: "var(--fg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 4,
                font: "500 10px var(--font-ui)",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function FilterBar({
  fw, setFw, sort, setSort,
}: {
  fw: string; setFw: (v: string) => void;
  sort: string; setSort: (v: string) => void;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        overflowX: "auto",
      }}
    >
      <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-muted)", flexShrink: 0 }}>Filter:</span>

      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        {FRAMEWORKS.map((f) => {
          const active = fw === f;
          return (
            <button
              key={f}
              onClick={() => setFw(f)}
              style={{
                height: 28,
                padding: "0 12px",
                borderRadius: 999,
                font: "500 12px var(--font-ui)",
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#fff" : "var(--fg-secondary)",
                border: `1px solid ${active ? "var(--accent)" : "var(--border-subtle)"}`,
                cursor: "pointer",
                transition: "all 120ms",
                flexShrink: 0,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div style={{ width: 1, height: 20, background: "var(--border-subtle)", flexShrink: 0 }} />

      <div style={{ position: "relative", flexShrink: 0 }}>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            height: 32,
            padding: "0 28px 0 10px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 6,
            font: "400 13px var(--font-ui)",
            color: "var(--fg-primary)",
            cursor: "pointer",
            appearance: "none",
            WebkitAppearance: "none",
          }}
        >
          {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDownIcon
          width={12}
          height={12}
          style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "var(--fg-muted)", pointerEvents: "none" }}
        />
      </div>

      <button
        style={{
          height: 28,
          padding: "0 12px",
          borderRadius: 999,
          font: "500 12px var(--font-ui)",
          background: "transparent",
          color: "var(--fg-muted)",
          border: "1px dashed var(--border-subtle)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        + Tags
      </button>

      <div style={{ flex: 1, minWidth: 24 }} />

      <span style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)", flexShrink: 0 }}>
        1,284 components
      </span>
    </div>
  );
}

function MainContent() {
  const [fw, setFw] = useState("React");
  const [sort, setSort] = useState("Trending");

  const filtered = fw === "All" ? CARDS : CARDS.filter((c) => c.fw === fw || c.fw === "React");

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      <FilterBar fw={fw} setFw={setFw} sort={sort} setSort={setSort} />
      <div
        style={{
          padding: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((c, i) => <ExploreCard key={i} {...c} />)}
      </div>
      <div style={{ padding: "24px 0", display: "flex", justifyContent: "center" }}>
        <button
          style={{
            height: 36,
            padding: "0 24px",
            borderRadius: 6,
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            color: "var(--fg-secondary)",
            font: "500 13px var(--font-ui)",
            cursor: "pointer",
          }}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

export function ExploreShell() {
  const width = useViewport();
  const isDesktop = width >= 1024;

  if (isDesktop) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-canvas)" }}>
        <LeftSidebar active="explore" />
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
