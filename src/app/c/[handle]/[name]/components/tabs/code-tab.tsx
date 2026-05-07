"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, DownloadIcon } from "@/components/icons";
import { GhostBtn } from "@/components/ui/ghost-btn";
import { CODE_LINES } from "../data";

const FILES = ["command-palette.tsx", "types.ts"];

export function CodeTab() {
  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState(0);

  const doCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          padding: "0 12px",
        }}
      >
        {FILES.map((f, i) => (
          <button
            key={f}
            onClick={() => setActiveFile(i)}
            style={{
              padding: "10px 14px",
              font: "500 12px var(--font-mono)",
              color: i === activeFile ? "var(--fg-primary)" : "var(--fg-muted)",
              borderBottom:
                i === activeFile ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
          >
            {f}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <GhostBtn icon={copied ? <CheckIcon /> : <CopyIcon />} onClick={doCopy}>
          {copied ? "Copied" : "Copy"}
        </GhostBtn>
        <div style={{ width: 8 }} />
        <GhostBtn icon={<DownloadIcon />}>Download</GhostBtn>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "16px 0",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          lineHeight: 1.7,
          background: "var(--bg-canvas)",
        }}
      >
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              padding: "0 16px 0 0",
              minHeight: "1.7em",
            }}
          >
            <span
              style={{
                width: 42,
                textAlign: "right",
                paddingRight: 20,
                font: "400 12px var(--font-mono)",
                color: "var(--fg-muted)",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              {i + 1}
            </span>
            <span style={{ whiteSpace: "pre" }}>
              {line.tokens.length === 0
                ? " "
                : line.tokens.map((tok, j) => (
                    <span key={j} className={`tok-${tok.t}`}>
                      {tok.v}
                    </span>
                  ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
