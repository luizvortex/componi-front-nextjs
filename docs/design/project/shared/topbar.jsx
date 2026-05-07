/* global React, ICONS, Logo, Avatar, Btn */
const { useState, useEffect, useRef } = React;

/* ──────────────────────────────────────────────────────────────────────────
   TopBar — sticky, responsive, theme-aware
   ────────────────────────────────────────────────────────────────────────── */

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("componi-theme", theme); } catch {}
  }, [theme]);
  useEffect(() => {
    try {
      const t = localStorage.getItem("componi-theme");
      if (t) setTheme(t);
    } catch {}
  }, []);
  return [theme, setTheme];
}

function TopBar({ active = "home", onSearch, onNotifications, unread = 0 }) {
  const [theme, setTheme] = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mq, setMq] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const onR = () => setMq(window.innerWidth);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  const isMobile = mq < 768;
  const isTablet = mq < 1024;

  const navItems = [
    { k: "home", label: "Home", href: "Home Feed.html", icon: ICONS.home },
    { k: "explore", label: "Explore", href: "#" },
    { k: "following", label: "Following", href: "#" },
  ];

  return (
    <>
      <header style={{
        height: "56px", padding: "0 16px",
        display: "flex", alignItems: "center", gap: "12px",
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky", top: 0, zIndex: 30,
      }}>
        {isMobile && (
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
            style={{ width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", color: "var(--fg-secondary)", cursor: "pointer", borderRadius: 6 }}>
            {ICONS.menu}
          </button>
        )}

        <a href="Home Feed.html" style={{ textDecoration: "none", display: "inline-flex" }}>
          <Logo size={20} />
        </a>

        {!isTablet && (
          <nav style={{ display: "flex", gap: "2px", marginLeft: "8px" }}>
            {navItems.map(i =>
              <a key={i.k} href={i.href} style={{
                padding: "6px 12px", borderRadius: "6px",
                font: "500 13px var(--font-ui)",
                color: active === i.k ? "var(--fg-primary)" : "var(--fg-muted)",
                background: active === i.k ? "var(--bg-elevated)" : "transparent",
                cursor: "pointer", textDecoration: "none",
                transition: "background var(--dur-state), color var(--dur-state)",
              }}>{i.label}</a>
            )}
          </nav>
        )}

        <div style={{ flex: 1 }} />

        {/* Search trigger */}
        {!isMobile ? (
          <button onClick={onSearch} aria-label="Open command palette"
            style={{
              height: "36px", width: isTablet ? "200px" : "320px", padding: "0 10px",
              display: "flex", alignItems: "center", gap: "8px",
              background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)",
              borderRadius: "8px", color: "var(--fg-muted)", font: "400 13px var(--font-ui)",
              cursor: "pointer",
            }}>
            <span style={{ color: "var(--fg-muted)" }}>{ICONS.search}</span>
            <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Search components, people…</span>
            <span style={{
              marginLeft: "auto", font: "500 11px var(--font-mono)",
              padding: "2px 6px", borderRadius: "4px", background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)", color: "var(--fg-secondary)",
            }}>⌘K</span>
          </button>
        ) : (
          <button onClick={onSearch} aria-label="Search"
            style={{ width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", color: "var(--fg-secondary)", cursor: "pointer", borderRadius: 6 }}>
            {ICONS.search}
          </button>
        )}

        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme"
          style={{ width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", color: "var(--fg-secondary)", cursor: "pointer", borderRadius: 6 }}>
          {theme === "dark" ? ICONS.sun : ICONS.moon}
        </button>

        <button onClick={onNotifications} aria-label="Notifications"
          style={{ width: 36, height: 36, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", color: "var(--fg-secondary)", cursor: "pointer", borderRadius: 6 }}>
          {ICONS.bell}
          {unread > 0 && <span style={{
            position: "absolute", top: 6, right: 6, minWidth: 16, height: 16, padding: "0 4px",
            background: "var(--accent)", color: "#fff", borderRadius: 999,
            font: "600 10px var(--font-mono)", display: "inline-flex", alignItems: "center", justifyContent: "center",
            border: "2px solid var(--bg-surface)",
          }}>{unread}</span>}
        </button>

        {!isMobile && (
          <Btn kind="primary" icon={ICONS.plus}>New</Btn>
        )}

        <Avatar name="Y" size={32} color="#A31F37" />
      </header>

      {/* Mobile menu drawer */}
      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "82%", maxWidth: 320,
            background: "var(--bg-surface)", borderRight: "1px solid var(--border-subtle)",
            padding: "20px", display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ marginBottom: 20 }}><Logo size={22} /></div>
            {navItems.map(i =>
              <a key={i.k} href={i.href} style={{
                padding: "10px 12px", borderRadius: 6, textDecoration: "none",
                font: "500 14px var(--font-ui)",
                color: active === i.k ? "var(--fg-primary)" : "var(--fg-secondary)",
                background: active === i.k ? "var(--bg-elevated)" : "transparent",
              }}>{i.label}</a>
            )}
            <div style={{ flex: 1 }} />
            <Btn kind="primary" icon={ICONS.plus} full>New component</Btn>
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { TopBar, useTheme });
