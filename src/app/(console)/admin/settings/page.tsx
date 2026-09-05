import { getSettings } from "@/lib/admin/site-actions";
import SettingsEditor from "@/components/admin/SettingsEditor";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const res = await getSettings();
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load settings: {res.message}</p>;
  }
  return <SettingsEditor initial={res.settings} />;
}
