import { getActivity } from "@/lib/admin/actions";
import ActivityList from "@/components/admin/ActivityList";

export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  const res = await getActivity(100);
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load activity: {res.message}</p>;
  }
  return <ActivityList rows={res.rows} />;
}
