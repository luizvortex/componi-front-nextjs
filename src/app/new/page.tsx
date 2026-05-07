import type { Metadata } from "next";
import { PublishShell } from "./components/publish-shell";

export const metadata: Metadata = { title: "New component · Componi" };

export default function NewPage() {
  return <PublishShell />;
}
