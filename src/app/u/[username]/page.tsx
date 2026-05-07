import type { Metadata } from "next";
import { ProfileShell } from "./components/profile-shell";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username} · Componi` };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  return <ProfileShell username={username} />;
}
