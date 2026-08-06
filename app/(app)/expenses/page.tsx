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
            className="btn btn-primary"
          >
            + Nouvelle dépense
          </Link>
        }
      />

      <div className="card overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-linear-to-r from-blue-50 to-white">
            <tr className="border-b border-slate-200 text-left text-[0.7rem] font-bold uppercase tracking-widest text-blue-900/70">
              <th className="whitespace-nowrap px-4 py-3">Référence</th>
              <th className="whitespace-nowrap px-4 py-3">Date</th>
              <th className="whitespace-nowrap px-4 py-3">Catégorie</th>
              <th className="whitespace-nowrap px-4 py-3">Bénéficiaire</th>
              <th className="whitespace-nowrap px-4 py-3">Montant</th>
              <th className="whitespace-nowrap px-4 py-3">Statut</th>
              <th className="whitespace-nowrap px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {(expenses ?? []).map((e) => (
              <tr className="transition-colors hover:bg-blue-50/50" key={e.id}>
                <td className="px-4 py-3 text-sm text-slate-700">
                  <Link href={`/expenses/${e.id}`} className="font-semibold text-blue-600 hover:underline">
                    {e.reference}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{e.expense_date}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{e.category?.name ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{e.beneficiary ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{Number(e.amount).toLocaleString("fr-FR")}</td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  <Badge tone={STATUS_TONE[e.status] ?? "default"}>{e.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <DecisionButtons expenseId={e.id} status={e.status} />
                </td>
              </tr>
            ))}
            {(expenses ?? []).length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
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
