import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const { module } = await searchParams;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  let query = supabase
    .from("audit_log")
    .select("id, action, module, entity_table, reason, risk_level, created_at")
    .eq("company_id", active.company_id)
    .order("created_at", { ascending: false })
    .limit(200);

  if (module) query = query.eq("module", module);
  const { data: logs } = await query;

  return (
    <div>
      <PageHeader title="Journal d'audit" description="Traçabilité des actions sur l'entreprise." />

      <form className="mb-4">
        <input
          name="module"
          defaultValue={module}
          placeholder="Filtrer par module (ex: sales, hr...)"
          className="w-full max-w-sm rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </form>

      <DataTable
        rows={logs ?? []}
        columns={[
          { key: "created_at", label: "Date", render: (r) => new Date(r.created_at).toLocaleString("fr-FR") },
          { key: "action", label: "Action" },
          { key: "module", label: "Module" },
          { key: "entity_table", label: "Table" },
          {
            key: "risk_level",
            label: "Risque",
            render: (r) => (
              <Badge tone={r.risk_level === "high" ? "red" : r.risk_level === "low" ? "default" : "yellow"}>
                {r.risk_level}
              </Badge>
            ),
          },
          { key: "reason", label: "Motif" },
        ]}
        emptyMessage="Aucune entrée dans le journal d'audit."
      />
    </div>
  );
}
