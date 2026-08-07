import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { statusLabel } from "@/lib/labels";

const STATUS_TONE: Record<string, "default" | "green" | "red" | "yellow"> = {
  draft: "default",
  sent: "yellow",
  confirmed: "yellow",
  partially_received: "yellow",
  received: "green",
  cancelled: "red",
  closed: "default",
};

export default async function PurchaseOrdersPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("purchase_orders")
    .select("id, reference, status, total, supplier:suppliers(name)")
    .eq("company_id", active.company_id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader title="Commandes fournisseurs" />
      <DataTable
        rows={orders ?? []}
        editHref={(row) => `/purchasing/orders/${row.id}`}
        columns={[
          { key: "reference", label: "Référence" },
          { key: "supplier", label: "Fournisseur", render: (r) => r.supplier?.name ?? "—" },
          { key: "total", label: "Total", render: (r) => Number(r.total).toLocaleString("fr-FR") },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={STATUS_TONE[r.status] ?? "default"}>{statusLabel(r.status)}</Badge>,
          },
        ]}
      />
    </div>
  );
}
