"use client";

import { logout } from "@/lib/actions/auth";
import { setActiveCompany } from "@/lib/actions/session";

type CompanyMembership = {
  company_id: string;
  company: { id: string; name: string; trade_name: string | null } | null;
};

export function Topbar({
  companies,
  activeCompanyId,
  userEmail,
}: {
  companies: CompanyMembership[];
  activeCompanyId: string;
  userEmail: string;
}) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <form action={setActiveCompany}>
        <select
          name="company_id"
          defaultValue={activeCompanyId}
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className="rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
        >
          {companies.map((c) => (
            <option key={c.company_id} value={c.company_id}>
              {c.company?.trade_name || c.company?.name}
            </option>
          ))}
        </select>
      </form>

      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{userEmail}</span>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </header>
  );
}
