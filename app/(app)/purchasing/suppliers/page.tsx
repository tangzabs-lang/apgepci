import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { statusLabel } from "@/lib/labels";

export default async function SuppliersPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("id, code, name, lead_time_days, status")
    .eq("company_id", active.company_id)
    .order("name");

  return (
    <div>
      <PageHeader
        title="Fournisseurs"
        action={
          <Link
            href="/purchasing/suppliers/new"
            className="btn btn-primary"
          >
            + Fournisseur
          </Link>
        }
      />
      <DataTable
        rows={suppliers ?? []}
        editHref={(row) => `/purchasing/suppliers/${row.id}`}
        columns={[
          { key: "code", label: "Code" },
          { key: "name", label: "Nom" },
          { key: "lead_time_days", label: "Délai (j)" },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={r.status === "active" ? "green" : "default"}>{statusLabel(r.status)}</Badge>,
          },
        ]}
      />
    </div>
  );
}
