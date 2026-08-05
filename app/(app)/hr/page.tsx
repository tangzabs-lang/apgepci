import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";

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
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              + Poste
            </Link>
            <Link
              href="/hr/employees/new"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
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

      <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Employés</h2>
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

      <h2 className="mb-2 mt-8 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Postes</h2>
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
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}
