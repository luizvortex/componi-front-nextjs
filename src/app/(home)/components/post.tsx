"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  BookmarkFillIcon,
  BookmarkIcon,
  ForkIcon,
  HeartFillIcon,
  HeartIcon,
  MoreIcon,
  MsgIcon,
  ShareIcon,
} from "@/components/icons";
import { fmtNum } from "@/lib/utils";
import type { Post as PostType } from "./data";
import { PostPreview } from "./post-previews";

type Props = {
  item: PostType;
  compact?: boolean;
};

const ACTION_ICON_SIZE = 22;

export function Post({ item, compact = false }: Props) {
  const [liked, setLiked] = useState(item.liked);
  const [likeCount, setLikeCount] = useState(item.likes);
  const [saved, setSaved] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const lastTap = useRef(0);

  const doLike = () => {
    setLiked((v) => {
      setLikeCount((c) => c + (v ? -1 : 1));
      return !v;
    });
  };

  const onImgTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 350) {
      if (!liked) {
        setLiked(true);
        setLikeCount((c) => c + 1);
      }
      setShowHeart(true);
      window.setTimeout(() => setShowHeart(false), 800);
    }
    lastTap.current = now;
  };

  const previewH = compact ? 260 : 300;
  const detailHref = `/c/${item.author}/${item.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <article style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px" }}>
        <Avatar name={item.name} size={34} ring={liked} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: "600 13px var(--font-ui)", color: "var(--fg-primary)" }}>
            {item.name}
          </div>
          <div style={{ font: "400 12px var(--font-mono)", color: "var(--fg-muted)" }}>
            @{item.author} · {item.time}
          </div>
        </div>
        <span
          style={{
            padding: "3px 10px",
            borderRadius: 999,
            font: "500 11px var(--font-mono)",
            background: "var(--bg-elevated)",
            color: "var(--fg-secondary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {item.fw}
        </span>
        <button
          aria-label="More options"
          style={{
            width: 30,
            height: 30,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            color: "var(--fg-muted)",
            borderRadius: 6,
          }}
        >
          <MoreIcon />
        </button>
      </div>

      {/* Preview */}
      <Link
        href={detailHref}
        onClick={(e) => {
          // double-tap should not navigate; we detect quickly and prevent navigation when liking
          if (Date.now() - lastTap.current < 350) {
            e.preventDefault();
          }
          onImgTap();
        }}
        style={{
          position: "relative",
          width: "100%",
          cursor: "pointer",
          userSelect: "none",
          display: "block",
        }}
      >
        <PostPreview seed={item.seed} h={previewH} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            opacity: showHeart ? 1 : 0,
            transition: "opacity 0.12s",
          }}
        >
          <div
            style={{
              transform: showHeart ? "scale(1)" : "scale(0.5)",
              transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
              filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.5))",
            }}
          >
            <svg width={72} height={72} viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth={0.5}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flex: 1 }}>
          <button
            onClick={doLike}
            aria-label={liked ? "Unlike" : "Like"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "none",
              color: liked ? "var(--accent)" : "var(--fg-primary)",
              padding: 0,
              transition: "transform 0.12s",
            }}
          >
            {liked ? (
              <HeartFillIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
            ) : (
              <HeartIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
            )}
            <span
              style={{
                font: "500 13px var(--font-ui)",
                color: liked ? "var(--accent)" : "var(--fg-secondary)",
              }}
            >
              {fmtNum(likeCount)}
            </span>
          </button>
          <button
            aria-label="Comments"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "none",
              color: "var(--fg-primary)",
              padding: 0,
            }}
          >
            <MsgIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
            <span style={{ font: "500 13px var(--font-ui)", color: "var(--fg-secondary)" }}>
              {item.comments}
            </span>
          </button>
          <button
            aria-label="Forks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "none",
              color: "var(--fg-primary)",
              padding: 0,
            }}
          >
            <ForkIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
            <span style={{ font: "500 13px var(--font-ui)", color: "var(--fg-secondary)" }}>
              {item.forks}
            </span>
          </button>
          <button
            aria-label="Share"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              background: "transparent",
              border: "none",
              color: "var(--fg-primary)",
              padding: 0,
            }}
          >
            <ShareIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
          </button>
        </div>
        <button
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? "Unsave" : "Save"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            background: "transparent",
            border: "none",
            color: saved ? "var(--accent)" : "var(--fg-primary)",
            padding: 0,
            transition: "color 0.12s",
          }}
        >
          {saved ? (
            <BookmarkFillIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
          ) : (
            <BookmarkIcon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
          )}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "4px 16px 14px" }}>
        <div style={{ font: "400 13px var(--font-ui)", color: "var(--fg-primary)", lineHeight: 1.5 }}>
          <span style={{ fontWeight: 600 }}>{item.name}</span>
          {"  "}
          {item.title}
        </div>
        <div
          style={{
            font: "400 13px var(--font-ui)",
            color: "var(--fg-secondary)",
            marginTop: 2,
            lineHeight: 1.45,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          A polished {item.fw} component — production-ready, minimal deps.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
          {item.tags.map((t) => (
            <span
              key={t}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 20,
                padding: "0 8px",
                background: "var(--bg-elevated)",
                color: "var(--fg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 4,
                font: "500 11px var(--font-ui)",
              }}
            >
              #{t}
            </span>
          ))}
        </div>
        <div
          style={{
            font: "400 13px var(--font-ui)",
            color: "var(--fg-muted)",
            marginTop: 6,
            cursor: "pointer",
          }}
        >
          View {item.comments} comments
        </div>
        <div
          style={{
            font: "500 10px var(--font-ui)",
            color: "var(--fg-muted)",
            marginTop: 3,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {item.time}
        </div>
      </div>
    </article>
  );
}
