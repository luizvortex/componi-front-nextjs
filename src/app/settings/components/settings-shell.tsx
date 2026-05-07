"use client";

import { useState } from "react";
import { LeftSidebar } from "@/components/left-sidebar";
import { useViewport } from "@/components/use-viewport";
import { useTheme } from "@/components/use-theme";
import { Avatar } from "@/components/ui/avatar";
import { BottomNav } from "@/app/(home)/components/bottom-nav";
import { MobileTopBar } from "@/app/(home)/components/mobile-topbar";
import {
  BlockIcon, CameraIcon, DatabaseIcon, GithubIcon, GlobeIcon,
  LockIcon, TrashIcon, UserIcon, VolumeXIcon,
} from "@/components/icons";

type NavSection = { label: string; items: { k: string; label: string; icon: React.ReactNode }[] };

const NAV: NavSection[] = [
  {
    label: "Account",
    items: [
      { k: "profile", label: "Profile", icon: <UserIcon width={14} height={14} /> },
      { k: "account", label: "Account", icon: <LockIcon width={14} height={14} /> },
      { k: "privacy", label: "Privacy", icon: <LockIcon width={14} height={14} /> },
    ],
  },
  {
    label: "Preferences",
    items: [
      { k: "appearance", label: "Appearance", icon: <UserIcon width={14} height={14} /> },
      { k: "notifications", label: "Notifications", icon: <UserIcon width={14} height={14} /> },
    ],
  },
  {
    label: "Safety",
    items: [
      { k: "blocked", label: "Blocked users", icon: <BlockIcon width={14} height={14} /> },
      { k: "muted", label: "Muted users", icon: <VolumeXIcon width={14} height={14} /> },
    ],
  },
  {
    label: "Legal",
    items: [
      { k: "data", label: "Data export", icon: <DatabaseIcon width={14} height={14} /> },
      { k: "delete", label: "Delete account", icon: <TrashIcon width={14} height={14} /> },
    ],
  },
];

function SettingsNav({ active, onSelect }: { active: string; onSelect: (k: string) => void }) {
  return (
    <aside
      style={{
        width: 200,
        flexShrink: 0,
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        padding: 8,
        alignSelf: "flex-start",
        position: "sticky",
        top: 24,
      }}
    >
      {NAV.map((section) => (
        <div key={section.label} style={{ marginBottom: 12 }}>
          <div
            style={{
              font: "500 11px var(--font-ui)",
              color: "var(--fg-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "0 8px 4px",
            }}
          >
            {section.label}
          </div>
          {section.items.map((it) => {
            const isActive = active === it.k;
            return (
              <button
                key={it.k}
                onClick={() => onSelect(it.k)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  height: 32,
                  padding: "0 8px",
                  borderRadius: 6,
                  background: isActive ? "var(--bg-elevated)" : "transparent",
                  border: "none",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  font: `${isActive ? "600" : "400"} 13px var(--font-ui)`,
                  color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 120ms",
                }}
              >
                {it.icon}
                {it.label}
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  height: 36,
  padding: "0 12px",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border-subtle)",
  borderRadius: 6,
  font: "400 13px var(--font-ui)",
  color: "var(--fg-primary)",
  outline: "none",
  transition: "border-color 120ms",
};

function ProfileContent() {
  const [bio, setBio] = useState("Design engineer. Building Componi.");
  const [theme, toggle] = useTheme();

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ font: "700 20px var(--font-ui)", color: "var(--fg-primary)", marginBottom: 4 }}>Profile</h2>
        <p style={{ font: "400 14px var(--font-ui)", color: "var(--fg-muted)" }}>How others see you on Componi</p>
      </div>

      {/* Avatar upload */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <Avatar name="Luiz Felipe" size={72} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              height: 32,
              padding: "0 14px",
              background: "transparent",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              font: "500 13px var(--font-ui)",
              color: "var(--fg-primary)",
              cursor: "pointer",
            }}
          >
            <CameraIcon width={14} height={14} />
            Change avatar
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              font: "400 13px var(--font-ui)",
              color: "var(--danger)",
              cursor: "pointer",
              textAlign: "left",
              padding: 0,
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "Display name", value: "Luiz Felipe", type: "text" },
          { label: "Username", value: "luiz", type: "text", prefix: "@" },
          { label: "Pronouns", value: "", placeholder: "e.g. they/them", type: "text" },
          { label: "Website", value: "", placeholder: "https://…", type: "url", icon: <GlobeIcon width={14} height={14} /> },
          { label: "GitHub username", value: "", placeholder: "@handle", type: "text", icon: <GithubIcon width={14} height={14} /> },
        ].map((field) => (
          <div key={field.label}>
            <label
              style={{
                display: "block",
                font: "500 13px var(--font-ui)",
                color: "var(--fg-secondary)",
                marginBottom: 6,
              }}
            >
              {field.label}
            </label>
            <div style={{ position: "relative" }}>
              {field.prefix && (
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    font: "400 13px var(--font-ui)",
                    color: "var(--fg-muted)",
                    pointerEvents: "none",
                  }}
                >
                  {field.prefix}
                </span>
              )}
              {field.icon && (
                <span
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--fg-muted)",
                    pointerEvents: "none",
                    display: "flex",
                  }}
                >
                  {field.icon}
                </span>
              )}
              <input
                type={field.type}
                defaultValue={field.value}
                placeholder={field.placeholder}
                style={{
                  ...INPUT_STYLE,
                  paddingLeft: field.prefix ? 28 : field.icon ? 32 : 12,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
              />
            </div>
          </div>
        ))}

        {/* Bio textarea */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <label style={{ font: "500 13px var(--font-ui)", color: "var(--fg-secondary)" }}>Bio</label>
            <span style={{ font: "400 12px var(--font-ui)", color: "var(--fg-muted)" }}>
              {bio.length} / 160
            </span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
            rows={3}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              font: "400 13px var(--font-ui)",
              color: "var(--fg-primary)",
              outline: "none",
              resize: "vertical",
              transition: "border-color 120ms",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
          />
        </div>
      </div>

      {/* Save row */}
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          marginTop: 24,
          paddingTop: 16,
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <button
          style={{
            height: 36,
            padding: "0 16px",
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            borderRadius: 6,
            font: "500 13px var(--font-ui)",
            color: "var(--fg-secondary)",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          style={{
            height: 36,
            padding: "0 20px",
            background: "var(--accent)",
            border: "none",
            borderRadius: 6,
            font: "600 13px var(--font-ui)",
            color: "#fff",
            cursor: "pointer",
            transition: "background 120ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        >
          Save changes
        </button>
      </div>

      {/* Appearance section */}
      <div style={{ marginTop: 32, borderTop: "1px solid var(--border-subtle)", paddingTop: 24 }}>
        <h3 style={{ font: "600 16px var(--font-ui)", color: "var(--fg-primary)", marginBottom: 16 }}>Appearance</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ font: "400 13px var(--font-ui)", color: "var(--fg-secondary)" }}>Theme</span>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {(["dark", "system", "light"] as const).map((t) => {
              const active = t === "system" ? false : theme === t;
              return (
                <button
                  key={t}
                  onClick={() => { if (t !== "system" && theme !== t) toggle(); }}
                  style={{
                    height: 32,
                    padding: "0 16px",
                    background: active ? "var(--bg-elevated)" : "transparent",
                    border: "none",
                    borderLeft: t !== "dark" ? "1px solid var(--border-subtle)" : "none",
                    font: `${active ? "600" : "400"} 13px var(--font-ui)`,
                    color: active ? "var(--fg-primary)" : "var(--fg-secondary)",
                    cursor: "pointer",
                    transition: "all 120ms",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsShell() {
  const width = useViewport();
  const isDesktop = width >= 1024;
  const [activeNav, setActiveNav] = useState("profile");

  const content = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          maxWidth: 840,
          margin: "0 auto",
          padding: isDesktop ? "32px 32px 80px" : "16px 16px 80px",
          display: "flex",
          gap: 32,
        }}
      >
        {isDesktop && <SettingsNav active={activeNav} onSelect={setActiveNav} />}
        <ProfileContent />
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-canvas)" }}>
        <LeftSidebar active="settings" />
        {content}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-canvas)", display: "flex", flexDirection: "column" }}>
      <MobileTopBar />
      <div style={{ flex: 1, paddingBottom: 58 }}>
        {content}
      </div>
      <BottomNav />
    </div>
  );
}
