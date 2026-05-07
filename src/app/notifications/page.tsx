import type { Metadata } from "next";
import { NotifShell } from "./components/notif-shell";

export const metadata: Metadata = { title: "Notifications · Componi" };

export default function NotificationsPage() {
  return <NotifShell />;
}
