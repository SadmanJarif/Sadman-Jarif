import { listMediaRows } from "@/lib/admin/media-actions";
import MediaManager from "@/components/admin/MediaManager";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const res = await listMediaRows();
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load media: {res.message}</p>;
  }
  return <MediaManager initial={res.rows as unknown as React.ComponentProps<typeof MediaManager>["initial"]} />;
}
