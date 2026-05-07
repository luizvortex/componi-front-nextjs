"use client";

import Link from "next/link";
import { useState } from "react";
import { useViewport } from "@/components/use-viewport";
import { Logo } from "@/components/ui/logo";
import { ChevronDownIcon, RefreshIcon, WarningIcon, XIcon } from "@/components/icons";

const CODE_LINES = [
  { tokens: [{ t: "kw", v: "import" }, { t: "pl", v: " React" }, { t: "op", v: "," }, { t: "pl", v: " { useState, useEffect, useRef }" }, { t: "kw", v: " from " }, { t: "str", v: "'react'" }] },
  { tokens: [] },
  { tokens: [{ t: "kw", v: "interface " }, { t: "fn", v: "CommandPaletteProps" }, { t: "op", v: " {" }] },
  { tokens: [{ t: "pl", v: "  open" }, { t: "op", v: ": " }, { t: "kw", v: "boolean" }] },
  { tokens: [{ t: "pl", v: "  onClose" }, { t: "op", v: ": " }, { t: "op", v: "() => " }, { t: "kw", v: "void" }] },
  { tokens: [{ t: "op", v: "}" }] },
  { tokens: [] },
  { tokens: [{ t: "kw", v: "export " }, { t: "fn", v: "function " }, { t: "fn", v: "CommandPalette" }, { t: "op", v: "({ " }, { t: "pl", v: "open" }, { t: "op", v: ", " }, { t: "pl", v: "onClose" }, { t: "op", v: " }): " }, { t: "fn", v: "CommandPaletteProps" }, { t: "op", v: ") {" }] },
  { tokens: [{ t: "kw", v: "  const " }, { t: "op", v: "[" }, { t: "pl", v: "query" }, { t: "op", v: ", " }, { t: "pl", v: "setQuery" }, { t: "op", v: "] = " }, { t: "fn", v: "useState" }, { t: "op", v: "<" }, { t: "kw", v: "string" }, { t: "op", v: ">(" }, { t: "str", v: "''" }, { t: "op", v: ")" }] },
  { tokens: [{ t: "kw", v: "  const " }, { t: "pl", v: "inputRef" }, { t: "op", v: " = " }, { t: "fn", v: "useRef" }, { t: "op", v: "<" }, { t: "fn", v: "HTMLInputElement" }, { t: "op", v: ">(null)" }] },
  { tokens: [] },
  { tokens: [{ t: "kw", v: "  if " }, { t: "op", v: "(!open) " }, { t: "kw", v: "return " }, { t: "kw", v: "null" }] },
  { tokens: [] },
  { tokens: [{ t: "kw", v: "  return " }, { t: "op", v: "(" }] },
  { tokens: [{ t: "op", v: "    <" }, { t: "fn", v: "div" }, { t: "pl", v: " role" }, { t: "op", v: '="' }, { t: "str", v: "dialog" }, { t: "op", v: '">' }] },
  { tokens: [{ t: "cm", v: "      {/* backdrop + modal */}" }] },
  { tokens: [{ t: "op", v: "    </" }, { t: "fn", v: "div" }, { t: "op", v: ">" }] },
  { tokens: [{ t: "op", v: "  )" }] },
  { tokens: [{ t: "op", v: "}" }] },
];

function CodeEditor() {
  return (
    <div
      style={{
        flex: "0 0 60%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-canvas)",
        borderRight: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* file header */}
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 10,
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          flexShrink: 0,
        }}
      >
        <span style={{ font: "400 12px var(--font-mono)", color: "var(--fg-muted)" }}>App.tsx</span>
        <span
          style={{
            padding: "1px 6px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 4,
            font: "500 10px var(--font-mono)",
            color: "var(--fg-muted)",
          }}
        >
          TSX
        </span>
      </div>

      {/* code area */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px 0" }}>
        {CODE_LINES.map((line, row) => (
          <div
            key={row}
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: 20,
              paddingRight: 16,
            }}
          >
            <div
              style={{
                width: 40,
                textAlign: "right",
                paddingRight: 16,
                font: "400 12px var(--font-mono)",
                color: "var(--fg-muted)",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              {row + 1}
            </div>
            <div style={{ font: "400 13px var(--font-mono)" }}>
              {line.tokens.map((tok, i) => (
                <span key={i} className={`tok-${tok.t}`}>{tok.v}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewPane({ loading }: { loading: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-canvas)",
        overflow: "hidden",
      }}
    >
      {/* preview header */}
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 10,
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
              animation: "shimmer 1s ease-in-out infinite",
            }}
          />
        )}
        <style>{`@keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:1} }`}</style>
        <span style={{ font: "400 12px var(--font-mono)", color: "var(--fg-muted)", flex: 1 }}>Preview</span>
        {loading && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <RefreshIcon
              width={14}
              height={14}
              style={{ color: "var(--fg-muted)", animation: "spin 1s linear infinite" }}
            />
            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
          </span>
        )}
        <button
          style={{
            height: 26,
            padding: "0 10px",
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            borderRadius: 5,
            font: "400 12px var(--font-ui)",
            color: "var(--fg-muted)",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </div>

      {/* preview content */}
      <div style={{ flex: 1, padding: 12, overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "var(--bg-elevated)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {/* miniature command palette preview */}
          <div
            style={{
              width: "75%",
              maxWidth: 320,
              background: "var(--bg-surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--fg-muted)", opacity: 0.5 }} />
              <div style={{ flex: 1, height: 4, background: "var(--border-strong)", borderRadius: 2 }} />
              <span style={{ font: "500 10px var(--font-mono)", color: "var(--fg-muted)", padding: "2px 5px", background: "var(--bg-elevated)", borderRadius: 3, border: "1px solid var(--border-subtle)" }}>
                ⌘K
              </span>
            </div>
            {[true, false, false].map((active, i) => (
              <div
                key={i}
                style={{
                  padding: "9px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: active ? "var(--accent-muted)" : "transparent",
                  borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: active ? "var(--accent)" : "var(--border-strong)" }} />
                <div style={{ flex: 1, height: 4, background: active ? "var(--accent)" : "var(--border-subtle)", borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValidationBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      style={{
        background: "rgba(245,158,11,0.08)",
        borderTop: "1px solid rgba(245,158,11,0.25)",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <WarningIcon width={14} height={14} style={{ color: "var(--warn)", flexShrink: 0 }} />
      <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-secondary)", flex: 1 }}>
        3 dependencies have unpinned versions —{" "}
        <span style={{ color: "var(--accent)", textDecoration: "underline", cursor: "pointer" }}>
          publish anyway?
        </span>
      </span>
      <button
        onClick={onDismiss}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          background: "transparent",
          border: "none",
          color: "var(--fg-muted)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <XIcon width={14} height={14} />
      </button>
    </div>
  );
}

function BottomBar({ published }: { published: boolean }) {
  const [name, setName] = useState("");
  const [fw, setFw] = useState("React");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState(["search", "modal"]);

  const canPublish = name.trim().length > 0;

  return (
    <div
      style={{
        height: 56,
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        overflowX: "auto",
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Component name…"
        style={{
          width: 180,
          height: 32,
          padding: "0 10px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 6,
          font: "400 13px var(--font-ui)",
          color: "var(--fg-primary)",
          outline: "none",
          flexShrink: 0,
        }}
      />

      <div style={{ position: "relative", flexShrink: 0 }}>
        <select
          value={fw}
          onChange={(e) => setFw(e.target.value)}
          style={{
            width: 120,
            height: 32,
            padding: "0 24px 0 10px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 6,
            font: "400 13px var(--font-ui)",
            color: "var(--fg-primary)",
            appearance: "none",
            WebkitAppearance: "none",
            cursor: "pointer",
          }}
        >
          {["React", "Vue", "Svelte", "Solid", "Angular"].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <ChevronDownIcon
          width={12}
          height={12}
          style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", color: "var(--fg-muted)", pointerEvents: "none" }}
        />
      </div>

      {tags.map((t) => (
        <span
          key={t}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            height: 26,
            padding: "0 8px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 999,
            font: "500 12px var(--font-ui)",
            color: "var(--fg-secondary)",
            flexShrink: 0,
          }}
        >
          #{t}
          <button
            onClick={() => setTags((ts) => ts.filter((x) => x !== t))}
            style={{ background: "transparent", border: "none", padding: 0, color: "var(--fg-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <XIcon width={10} height={10} />
          </button>
        </span>
      ))}

      <button
        style={{
          height: 26,
          padding: "0 10px",
          background: "transparent",
          border: "1px dashed var(--border-subtle)",
          borderRadius: 999,
          font: "400 12px var(--font-ui)",
          color: "var(--fg-muted)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        + Add tag
      </button>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-secondary)" }}>Public</span>
        <button
          onClick={() => setIsPublic((v) => !v)}
          style={{
            width: 36,
            height: 20,
            borderRadius: 999,
            border: "none",
            background: isPublic ? "var(--accent)" : "var(--bg-elevated)",
            cursor: "pointer",
            position: "relative",
            transition: "background 120ms",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: isPublic ? 18 : 2,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 120ms",
            }}
          />
        </button>
      </div>

      <button
        disabled={!canPublish}
        style={{
          height: 36,
          padding: "0 20px",
          background: canPublish ? "var(--accent)" : "var(--bg-elevated)",
          border: "none",
          borderRadius: 6,
          font: "600 13px var(--font-ui)",
          color: canPublish ? "#fff" : "var(--fg-muted)",
          cursor: canPublish ? "pointer" : "not-allowed",
          opacity: canPublish ? 1 : 0.5,
          flexShrink: 0,
          transition: "all 120ms",
        }}
      >
        Publish →
      </button>
    </div>
  );
}

export function PublishShell() {
  const width = useViewport();
  const isDesktop = width >= 1024;
  const [loading] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--bg-canvas)", overflow: "hidden" }}>
      {/* Topbar */}
      <header
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Logo size={18} />
        </Link>
        <div style={{ flex: 1 }} />
        <button
          style={{
            height: 32,
            padding: "0 14px",
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            borderRadius: 6,
            font: "400 13px var(--font-ui)",
            color: "var(--fg-secondary)",
            cursor: "pointer",
          }}
        >
          Save draft
        </button>
        <button
          style={{
            height: 32,
            padding: "0 14px",
            background: "var(--accent)",
            border: "none",
            borderRadius: 6,
            font: "600 13px var(--font-ui)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Publish →
        </button>
      </header>

      {/* Split pane */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {isDesktop ? (
          <>
            <CodeEditor />
            {/* resize handle */}
            <div
              style={{
                width: 4,
                flexShrink: 0,
                background: "var(--border-subtle)",
                cursor: "col-resize",
                transition: "background 120ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,26,47,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--border-subtle)")}
            />
            <PreviewPane loading={loading} />
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ flex: "0 0 50%", overflow: "hidden", display: "flex" }}>
              <CodeEditor />
            </div>
            <div style={{ height: 1, background: "var(--border-subtle)", flexShrink: 0 }} />
            <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
              <PreviewPane loading={loading} />
            </div>
          </div>
        )}
      </div>

      {/* Validation banner */}
      {showBanner && <ValidationBanner onDismiss={() => setShowBanner(false)} />}

      {/* Bottom bar */}
      <BottomBar published={false} />
    </div>
  );
}
