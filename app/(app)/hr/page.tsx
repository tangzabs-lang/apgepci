import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge, SectionTitle, StatTile } from "@/components/table";

export default async function HrPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: employees }, { data: positions }] = await Promise.all([
    supabase
      .from("employees")
      .select("id, matricule, first_name, last_name, status, org_unit:org_units(name), position:positions(title)")
      .eq("company_id", active.company_id)
      .order("created_at", { ascending: false }),
    supabase.from("positions").select("id, title, headcount, org_unit:org_units(name)").eq("company_id", active.company_id),
  ]);

  return (
    <div>
      <PageHeader
        title="Ressources humaines"
        description="Employés, postes et effectifs."
        action={
          <div className="flex gap-2">
            <Link
              href="/hr/positions/new"
              className="btn btn-outline"
            >
              + Poste
            </Link>
            <Link
              href="/hr/employees/new"
              className="btn btn-primary"
            >
              + Employé
            </Link>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Effectif total" value={(employees ?? []).length} />
        <StatCard label="Actifs" value={(employees ?? []).filter((e) => e.status === "active").length} />
        <StatCard label="Postes" value={(positions ?? []).length} />
        <StatCard
          label="Postes vacants"
          value={(positions ?? []).reduce((sum, p) => sum + p.headcount, 0) - (employees ?? []).length}
        />
      </div>

      <SectionTitle>Employés</SectionTitle>
      <DataTable
        rows={employees ?? []}
        editHref={(row) => `/hr/employees/${row.id}`}
        columns={[
          { key: "matricule", label: "Matricule" },
          { key: "name", label: "Nom", render: (r) => `${r.first_name} ${r.last_name}` },
          { key: "position", label: "Poste", render: (r) => r.position?.title ?? "—" },
          { key: "org_unit", label: "Service", render: (r) => r.org_unit?.name ?? "—" },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={r.status === "active" ? "green" : "default"}>{r.status}</Badge>,
          },
        ]}
      />

      <SectionTitle className="mt-10">Postes</SectionTitle>
      <DataTable
        rows={positions ?? []}
        columns={[
          { key: "title", label: "Intitulé" },
          { key: "org_unit", label: "Service", render: (r) => r.org_unit?.name ?? "—" },
          { key: "headcount", label: "Effectif prévu" },
        ]}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <StatTile label={label} value={value} />;
}
