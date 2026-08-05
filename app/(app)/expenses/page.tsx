import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader, Badge } from "@/components/table";
import { DecisionButtons } from "./decision-buttons";

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
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
          >
            + Nouvelle dépense
          </Link>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr className="text-left text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
              <th className="px-4 py-2">Référence</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2">Bénéficiaire</th>
              <th className="px-4 py-2">Montant</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
            {(expenses ?? []).map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-2 text-sm">
                  <Link href={`/expenses/${e.id}`} className="underline">
                    {e.reference}
                  </Link>
                </td>
                <td className="px-4 py-2 text-sm">{e.expense_date}</td>
                <td className="px-4 py-2 text-sm">{e.category?.name ?? "—"}</td>
                <td className="px-4 py-2 text-sm">{e.beneficiary ?? "—"}</td>
                <td className="px-4 py-2 text-sm">{Number(e.amount).toLocaleString("fr-FR")}</td>
                <td className="px-4 py-2 text-sm">
                  <Badge tone={STATUS_TONE[e.status] ?? "default"}>{e.status}</Badge>
                </td>
                <td className="px-4 py-2 text-right">
                  <DecisionButtons expenseId={e.id} status={e.status} />
                </td>
              </tr>
            ))}
            {(expenses ?? []).length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Aucune dépense enregistrée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
