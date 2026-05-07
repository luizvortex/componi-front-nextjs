import type { Metadata } from "next";
import { SettingsShell } from "./components/settings-shell";

export const metadata: Metadata = { title: "Settings · Componi" };

export default function SettingsPage() {
  return <SettingsShell />;
}
