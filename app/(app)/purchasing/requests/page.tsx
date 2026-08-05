import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";

const STATUS_TONE: Record<string, "default" | "green" | "red" | "yellow"> = {
  draft: "default",
  submitted: "yellow",
  approved: "green",
  rejected: "red",
  converted: "default",
  received: "green",
  closed: "default",
};

export default async function PurchaseRequestsPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("purchase_requests")
    .select("id, reference, urgency, status, needed_date")
    .eq("company_id", active.company_id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader
        title="Demandes d'achat"
        action={
          <Link
            href="/purchasing/requests/new"
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
          >
            + Nouvelle demande
          </Link>
        }
      />
      <DataTable
        rows={requests ?? []}
        editHref={(row) => `/purchasing/requests/${row.id}`}
        columns={[
          { key: "reference", label: "Référence" },
          { key: "urgency", label: "Urgence" },
          { key: "needed_date", label: "Date souhaitée" },
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
