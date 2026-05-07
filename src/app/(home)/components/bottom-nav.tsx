"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import {
  BellIcon,
  CompassIcon,
  HomeFillIcon,
  HomeIcon,
  PlusSquareIcon,
} from "@/components/icons";

const items = [
  { href: "/", label: "Home", renderIcon: (a: boolean) => a ? <HomeFillIcon width={24} height={24} /> : <HomeIcon width={24} height={24} /> },
  { href: "/explore", label: "Explore", renderIcon: () => <CompassIcon width={24} height={24} /> },
  { href: "/new", label: "New", renderIcon: () => <PlusSquareIcon width={24} height={24} /> },
  { href: "/notifications", label: "Notifications", badge: 5, renderIcon: () => <BellIcon width={24} height={24} /> },
  { href: "/u/luiz", label: "Profile", renderIcon: (a: boolean) => <Avatar name="Y" size={24} color="#A31F37" ring={a} ringColor="var(--accent)" gap={1} /> },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "var(--bg-canvas)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border-subtle)",
        zIndex: 50,
      }}
    >
      {items.map((it) => {
        const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-label={it.label}
            style={{
              width: 44,
              height: 44,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: active ? "var(--accent)" : "var(--fg-primary)",
              borderRadius: 8,
              position: "relative",
              transition: "color 0.12s",
              textDecoration: "none",
            }}
          >
            {it.renderIcon(active)}
            {it.badge && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  minWidth: 16,
                  height: 16,
                  padding: "0 3px",
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: 999,
                  font: "600 10px var(--font-mono)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid var(--bg-canvas)",
                }}
              >
                {it.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
