"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BackIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  ForkIcon,
  HeartFillIcon,
  HeartIcon,
  ShareIcon,
} from "@/components/icons";
import { LeftSidebar } from "@/components/left-sidebar";
import { Avatar } from "@/components/ui/avatar";
import { FwBadge } from "@/components/ui/fw-badge";
import { GhostBtn } from "@/components/ui/ghost-btn";
import { useViewport } from "@/components/use-viewport";
import { HeroPreview } from "./hero-preview";
import { DetailMobileTopBar } from "./mobile-topbar";
import { CodeTab } from "./tabs/code-tab";
import { DepsTab } from "./tabs/deps-tab";
import { DiscussionTab } from "./tabs/discussion-tab";
import { LineageTab } from "./tabs/lineage-tab";
import { PreviewTab } from "./tabs/preview-tab";

const TABS = ["Preview", "Code", "Dependencies", "Lineage", "Discussion"] as const;
const METRICS = [
  { l: "Likes", v: "1.2k" },
  { l: "Forks", v: "89" },
  { l: "Favorites", v: "340" },
  { l: "Views", v: "14.5k" },
];
const TAGS = ["#search", "#keyboard", "#modal", "#a11y"];
const VERSIONS = ["v3.2 (latest)", "v3.1", "v3.0", "v2.4"];
const USED_BY = ["Sarah", "Carlos", "Priya", "Felix", "Anya"];

type Props = {
  handle: string;
  name: string;
};

function DetailContent({ handle, name }: Props) {
  const [tab, setTab] = useState(3);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);
  const width = useViewport();
  const isDesktop = width >= 1024;

  const doLike = () => {
    setLiked((v) => {
      setLikeCount((c) => c + (v ? -1 : 1));
      return !v;
    });
  };

  const doCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const tabContent = [
    <PreviewTab key="preview" />,
    <CodeTab key="code" />,
    <DepsTab key="deps" />,
    <LineageTab key="lineage" />,
    <DiscussionTab key="discussion" />,
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: "20px 24px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--fg-muted)",
            font: "400 13px var(--font-mono)",
            gap: 6,
          }}
        >
          <BackIcon />
          <span>Home</span>
        </Link>
        <span style={{ color: "var(--fg-muted)", font: "400 13px var(--font-mono)" }}>/</span>
        <span style={{ font: "400 13px var(--font-mono)", color: "var(--fg-muted)" }}>
          @{handle}
        </span>
        <span style={{ color: "var(--fg-muted)" }}>/</span>
        <span style={{ font: "600 14px var(--font-ui)", color: "var(--fg-primary)" }}>
          {name}
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <FwBadge fw="React" />
          <span style={{ font: "400 12px var(--font-mono)", color: "var(--fg-muted)" }}>
            v3.2 · MIT
          </span>
          <GhostBtn icon={liked ? <HeartFillIcon /> : <HeartIcon />} onClick={doLike}>
            <span style={{ color: liked ? "var(--accent)" : "inherit" }}>{likeCount}</span>
          </GhostBtn>
          <GhostBtn icon={<ForkIcon />}>Fork →</GhostBtn>
          <button
            onClick={doCopy}
            style={{
              height: 30,
              padding: "0 14px",
              borderRadius: 6,
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              font: "600 12px var(--font-ui)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "background 0.12s",
              cursor: "pointer",
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied" : "Copy install"}
          </button>
        </div>
      </div>

      <div style={{ padding: "20px 24px 0" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: isDesktop ? 12 : 8,
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <HeroPreview />
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                font: "500 11px var(--font-mono)",
                background: "rgba(10,11,13,0.72)",
                color: "#F5F5F7",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              React · 5 deps
            </span>
            <button
              aria-label="Open external"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "rgba(10,11,13,0.72)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                color: "#F5F5F7",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ExternalLinkIcon />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "0 24px",
          marginTop: 20,
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          gap: 0,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: "10px 16px",
              background: "transparent",
              border: "none",
              font: `${tab === i ? "600" : "500"} 13px var(--font-ui)`,
              color: tab === i ? "var(--fg-primary)" : "var(--fg-muted)",
              borderBottom: tab === i ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "color 0.12s",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 280px" : "1fr",
          flex: 1,
          padding: 24,
          gap: isDesktop ? 32 : 0,
          minWidth: 0,
        }}
      >
        <div style={{ minWidth: 0, overflow: "hidden" }}>{tabContent[tab]}</div>

        {isDesktop && (
          <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <Avatar name="Luiz" size={44} />
                <div>
                  <div
                    style={{ font: "600 14px var(--font-ui)", color: "var(--fg-primary)" }}
                  >
                    Luiz Felipe
                  </div>
                  <div style={{ font: "400 12px var(--font-mono)", color: "var(--fg-muted)" }}>
                    @{handle}
                  </div>
                </div>
              </div>
              <p
                style={{
                  font: "400 13px var(--font-ui)",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}
              >
                Design engineer. Building Componi.
              </p>
              <button
                onClick={() => setFollowing((v) => !v)}
                style={{
                  width: "100%",
                  height: 34,
                  borderRadius: 6,
                  background: following ? "var(--accent)" : "transparent",
                  color: following ? "#fff" : "var(--fg-primary)",
                  border: "1px solid var(--border-strong)",
                  font: "600 13px var(--font-ui)",
                  transition: "all 0.12s",
                  cursor: "pointer",
                }}
              >
                {following ? "Following" : "Follow"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {METRICS.map((m) => (
                <div
                  key={m.l}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 8,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      font: "500 10px var(--font-ui)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--fg-muted)",
                      marginBottom: 4,
                    }}
                  >
                    {m.l}
                  </div>
                  <div
                    style={{ font: "600 18px var(--font-ui)", color: "var(--fg-primary)" }}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  font: "500 10px var(--font-ui)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  marginBottom: 10,
                }}
              >
                Tags
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TAGS.map((t) => (
                  <span
                    key={t}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      height: 24,
                      padding: "0 10px",
                      background: "var(--bg-elevated)",
                      color: "var(--fg-secondary)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 4,
                      font: "500 12px var(--font-ui)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  font: "500 10px var(--font-ui)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  marginBottom: 8,
                }}
              >
                Version
              </div>
              <div style={{ position: "relative" }}>
                <select
                  style={{
                    width: "100%",
                    height: 34,
                    padding: "0 12px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: 6,
                    color: "var(--fg-primary)",
                    font: "500 13px var(--font-ui)",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  defaultValue={VERSIONS[0]}
                >
                  {VERSIONS.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "var(--fg-muted)",
                  }}
                >
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            <div>
              <div
                style={{
                  font: "500 10px var(--font-ui)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  marginBottom: 10,
                }}
              >
                Used by
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {USED_BY.map((n, i) => (
                  <div
                    key={n}
                    style={{ marginLeft: i === 0 ? 0 : -6, zIndex: 5 - i }}
                  >
                    <Avatar name={n} size={26} />
                  </div>
                ))}
                <span
                  style={{
                    marginLeft: 10,
                    font: "400 12px var(--font-mono)",
                    color: "var(--fg-muted)",
                  }}
                >
                  +208 more
                </span>
              </div>
            </div>
          </aside>
        )}
      </div>

      {!isDesktop && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "stretch",
            zIndex: 20,
          }}
        >
          <button
            onClick={doLike}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "transparent",
              border: "none",
              color: liked ? "var(--accent)" : "var(--fg-secondary)",
              font: "600 13px var(--font-ui)",
              borderRight: "1px solid var(--border-subtle)",
              cursor: "pointer",
            }}
          >
            {liked ? <HeartFillIcon /> : <HeartIcon />}
            {liked ? "Liked" : "Like"}
          </button>
          <button
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--accent)",
              border: "none",
              color: "#fff",
              font: "600 13px var(--font-ui)",
              borderRight: "1px solid var(--border-subtle)",
              cursor: "pointer",
            }}
          >
            <ForkIcon />
            Fork →
          </button>
          <button
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "transparent",
              border: "none",
              color: "var(--fg-secondary)",
              font: "600 13px var(--font-ui)",
              cursor: "pointer",
            }}
          >
            <ShareIcon />
            Share
          </button>
        </div>
      )}
    </div>
  );
}

export function DetailShell({ handle, name }: Props) {
  const width = useViewport();
  const isDesktop = width >= 1024;

  if (isDesktop) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-canvas)" }}>
        <LeftSidebar active="explore" />
        <DetailContent handle={handle} name={name} />
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
      <DetailMobileTopBar />
      <DetailContent handle={handle} name={name} />
    </div>
  );
}
