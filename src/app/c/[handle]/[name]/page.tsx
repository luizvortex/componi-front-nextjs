import { DetailShell } from "./components/detail-shell";

type Props = {
  params: Promise<{ handle: string; name: string }>;
};

export default async function ComponentDetailPage({ params }: Props) {
  const { handle, name } = await params;
  return <DetailShell handle={handle} name={name} />;
}
