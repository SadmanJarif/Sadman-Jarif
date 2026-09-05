import { getNav } from "@/lib/admin/site-actions";
import NavEditor from "@/components/admin/NavEditor";

export const dynamic = "force-dynamic";

export default async function NavigationPage() {
  const res = await getNav();
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load navigation: {res.message}</p>;
  }
  return <NavEditor initial={res.rows} />;
}
