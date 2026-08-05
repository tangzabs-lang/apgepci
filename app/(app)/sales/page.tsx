import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { ExportCsvButton } from "@/components/export-csv-button";

const STATUS_TONE: Record<string, "default" | "green" | "red" | "yellow"> = {
  draft: "default",
  pending: "yellow",
  validated: "green",
  delivered: "green",
  partially_delivered: "yellow",
  cancelled: "red",
  closed: "default",
};

export default async function SalesPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: sales } = await supabase
    .from("sales")
    .select("id, reference, sale_date, total, status, client:clients(name)")
    .eq("company_id", active.company_id)
    .order("sale_date", { ascending: false })
    .limit(100);

  const exportRows = (sales ?? []).map((s) => ({
    reference: s.reference,
    sale_date: s.sale_date,
    client: s.client?.name ?? "",
    total: s.total,
    status: s.status,
  }));

  return (
    <div>
      <PageHeader
        title="Ventes"
        description="Enregistrement et suivi des ventes."
        action={
          <div className="flex gap-2">
            <ExportCsvButton
              rows={exportRows}
              filename="ventes"
              columns={[
                { key: "reference", label: "Référence" },
                { key: "sale_date", label: "Date" },
                { key: "client", label: "Client" },
                { key: "total", label: "Total" },
                { key: "status", label: "Statut" },
              ]}
            />
            <Link
              href="/sales/new"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
            >
              + Nouvelle vente
            </Link>
          </div>
        }
      />
      <DataTable
        rows={sales ?? []}
        editHref={(row) => `/sales/${row.id}`}
        columns={[
          { key: "reference", label: "Référence" },
          { key: "sale_date", label: "Date" },
          { key: "client", label: "Client", render: (r) => r.client?.name ?? "—" },
          { key: "total", label: "Total", render: (r) => Number(r.total).toLocaleString("fr-FR") },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={STATUS_TONE[r.status] ?? "default"}>{r.status}</Badge>,
          },
        ]}
      />
    </div>
  );
}
