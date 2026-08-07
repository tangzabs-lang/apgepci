import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, SectionTitle } from "@/components/table";
import { typeLabel } from "@/lib/labels";

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
              className="btn btn-outline"
            >
              + Site
            </Link>
            <Link
              href="/org/units/new"
              className="btn btn-primary"
            >
              + Unité organisationnelle
            </Link>
          </div>
        }
      />

      <SectionTitle>Sites</SectionTitle>
      <DataTable
        rows={sites ?? []}
        editHref={(row) => `/org/sites/${row.id}`}
        columns={[
          { key: "name", label: "Nom" },
          { key: "type", label: "Type", render: (r) => typeLabel(r.type) },
          { key: "city", label: "Ville" },
          {
            key: "is_active",
            label: "Statut",
            render: (r) => (r.is_active ? "Actif" : "Inactif"),
          },
        ]}
      />

      <SectionTitle className="mt-10">
        Unités organisationnelles
      </SectionTitle>
      <DataTable
        rows={orgUnits ?? []}
        editHref={(row) => `/org/units/${row.id}`}
        columns={[
          { key: "name", label: "Nom" },
          { key: "type", label: "Type", render: (r) => typeLabel(r.type) },
          { key: "site", label: "Site", render: (r) => r.site?.name ?? "—" },
          { key: "status", label: "Statut" },
        ]}
      />
    </div>
  );
}
