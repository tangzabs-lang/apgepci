import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { DecisionButtons } from "./decision-buttons";
import { statusLabel } from "@/lib/labels";

const STATUS_TONE: Record<string, "default" | "green" | "red" | "yellow"> = {
  draft: "default",
  requested: "yellow",
  pending_approval: "yellow",
  approved: "green",
  rejected: "red",
  paid: "green",
};

export default async function ExpensesPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: expenses } = await supabase
    .from("expenses")
    .select("id, reference, expense_date, amount, status, beneficiary, category:expense_categories(name)")
    .eq("company_id", active.company_id)
    .order("expense_date", { ascending: false })
    .limit(100);

  return (
    <div>
      <PageHeader
        title="Dépenses"
        description="Suivi des dépenses et validations."
        action={
          <Link
            href="/expenses/new"
            className="btn btn-primary"
          >
            + Nouvelle dépense
          </Link>
        }
      />

      <DataTable
        rows={expenses ?? []}
        emptyMessage="Aucune dépense enregistrée."
        columns={[
          {
            key: "reference",
            label: "Référence",
            render: (e) => (
              <Link href={`/expenses/${e.id}`} className="font-semibold text-blue-600 hover:underline">
                {e.reference}
              </Link>
            ),
          },
          { key: "expense_date", label: "Date" },
          { key: "category", label: "Catégorie", render: (e) => e.category?.name ?? "—" },
          { key: "beneficiary", label: "Bénéficiaire", render: (e) => e.beneficiary ?? "—" },
          {
            key: "amount",
            label: "Montant",
            render: (e) => (
              <span className="font-semibold text-slate-900">
                {Number(e.amount).toLocaleString("fr-FR")}
              </span>
            ),
          },
          {
            key: "status",
            label: "Statut",
            render: (e) => <Badge tone={STATUS_TONE[e.status] ?? "default"}>{statusLabel(e.status)}</Badge>,
          },
          {
            key: "actions",
            label: "Décision",
            render: (e) => <DecisionButtons expenseId={e.id} status={e.status} />,
          },
        ]}
      />
    </div>
  );
}
