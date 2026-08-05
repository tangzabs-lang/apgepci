import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader } from "@/components/table";

export default async function OrgPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: orgUnits }, { data: sites }] = await Promise.all([
    supabase
      .from("org_units")
      .select("id, name, code, type, status, parent_id, site:sites(name)")
      .eq("company_id", active.company_id)
      .order("name"),
    supabase
      .from("sites")
      .select("id, name, code, type, city, is_active")
      .eq("company_id", active.company_id)
      .order("name"),
  ]);

  return (
    <div>
      <PageHeader
        title="Organigramme"
        description="Structure fonctionnelle, sites et unités de l'entreprise."
        action={
          <div className="flex gap-2">
            <Link
              href="/org/sites/new"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              + Site
            </Link>
            <Link
              href="/org/units/new"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
            >
              + Unité organisationnelle
            </Link>
          </div>
        }
      />

      <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Sites</h2>
      <DataTable
        rows={sites ?? []}
        editHref={(row) => `/org/sites/${row.id}`}
        columns={[
          { key: "name", label: "Nom" },
          { key: "type", label: "Type" },
          { key: "city", label: "Ville" },
          {
            key: "is_active",
            label: "Statut",
            render: (r) => (r.is_active ? "Actif" : "Inactif"),
          },
        ]}
      />

      <h2 className="mb-2 mt-8 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        Unités organisationnelles
      </h2>
      <DataTable
        rows={orgUnits ?? []}
        editHref={(row) => `/org/units/${row.id}`}
        columns={[
          { key: "name", label: "Nom" },
          { key: "type", label: "Type" },
          { key: "site", label: "Site", render: (r) => r.site?.name ?? "—" },
          { key: "status", label: "Statut" },
        ]}
      />
    </div>
  );
}
