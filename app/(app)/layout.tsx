import { redirect } from "next/navigation";
import { getCurrentUser, getUserCompanies } from "@/lib/data/companies";
import { getActiveCompany } from "@/lib/active-company";
import { getMyPermissions } from "@/lib/data/permissions";
import { AppShell } from "./app-shell";
import { MobileTabBar } from "./sidebar";
import { Topbar } from "./topbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const companies = await getUserCompanies();
  if (companies.length === 0) redirect("/onboarding");

  const active = await getActiveCompany();
  if (!active) redirect("/onboarding");

  const perms = Array.from(await getMyPermissions(active.company_id));

  return (
    <div className="app-shell-bg flex min-h-screen flex-1">
      <AppShell permissions={perms}>
        <Topbar
          companies={companies}
          activeCompanyId={active.company_id}
          userEmail={user.email ?? ""}
          permissions={perms}
        />
        {/* pb-24 : réserve la place de la barre d'onglets basse sur mobile. */}
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pb-24 pt-5 sm:px-6 sm:pb-10 sm:pt-8 lg:pb-12">
          <div className="animate-rise">{children}</div>
        </main>
      </AppShell>
      <MobileTabBar permissions={perms} />
    </div>
  );
}
