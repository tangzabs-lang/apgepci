"use client";

import { Building2, ChevronDown, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { setActiveCompany } from "@/lib/actions/session";
import { MobileNav } from "./sidebar";

type CompanyMembership = {
  company_id: string;
  company: { id: string; name: string; trade_name: string | null } | null;
};

export function Topbar({
  companies,
  activeCompanyId,
  userEmail,
  permissions,
}: {
  companies: CompanyMembership[];
  activeCompanyId: string;
  userEmail: string;
  permissions: string[];
}) {
  const initials = userEmail.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <MobileNav permissions={permissions} />

          <form action={setActiveCompany} className="min-w-0">
            <label className="relative flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.12)] hover:border-blue-200">
              <Building2 className="h-4 w-4 shrink-0 text-blue-600" />
              <select
                name="company_id"
                defaultValue={activeCompanyId}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                aria-label="Entreprise active"
                className="min-w-0 max-w-[40vw] appearance-none truncate bg-transparent pr-5 font-semibold text-slate-800 outline-none sm:max-w-none"
              >
                {companies.map((c) => (
                  <option key={c.company_id} value={c.company_id}>
                    {c.company?.trade_name || c.company?.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-slate-400" />
            </label>
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-blue-400 text-xs font-bold text-white">
              {initials}
            </span>
            <span className="max-w-[16rem] truncate text-sm font-medium text-slate-600">
              {userEmail}
            </span>
          </div>

          <form action={logout}>
            <button type="submit" className="btn btn-outline" title="Déconnexion">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
