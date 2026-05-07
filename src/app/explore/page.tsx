import type { Metadata } from "next";
import { ExploreShell } from "./components/explore-shell";

export const metadata: Metadata = { title: "Explore · Componi" };

export default function ExplorePage() {
  return <ExploreShell />;
}
