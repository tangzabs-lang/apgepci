import { redirect } from "next/navigation";
import { getCurrentUser, getUserCompanies } from "@/lib/data/companies";
import { getActiveCompany } from "@/lib/active-company";
import { getMyPermissions } from "@/lib/data/permissions";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const companies = await getUserCompanies();
  if (companies.length === 0) redirect("/onboarding");

  const active = await getActiveCompany();
  if (!active) redirect("/onboarding");

  const perms = await getMyPermissions(active.company_id);

  return (
    <div className="flex min-h-screen flex-1 bg-zinc-50 dark:bg-zinc-950">
      <Sidebar permissions={Array.from(perms)} />
      <div className="flex flex-1 flex-col">
        <Topbar
          companies={companies}
          activeCompanyId={active.company_id}
          userEmail={user.email ?? ""}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
