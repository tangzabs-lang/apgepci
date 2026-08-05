import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { SalesTrendChart } from "@/components/sales-trend-chart";

export default async function DashboardPage() {
  const active = await getActiveCompany();
  if (!active) return null;

  const supabase = await createClient();
  const companyId = active.company_id;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const monthIso = startOfMonth.toISOString().slice(0, 10);

  const [
    { count: clientsCount },
    { data: monthSales },
    { data: monthExpenses },
    { count: alertsCount },
    { count: pendingApprovalsCount },
  ] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("sales").select("total").eq("company_id", companyId).gte("sale_date", monthIso),
    supabase.from("expenses").select("amount").eq("company_id", companyId).gte("expense_date", monthIso),
    supabase
      .from("alerts")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId)
      .eq("status", "open"),
    supabase
      .from("approval_steps")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId)
      .eq("status", "pending"),
  ]);

  const salesTotal = (monthSales ?? []).reduce((sum, s) => sum + Number(s.total ?? 0), 0);
  const expensesTotal = (monthExpenses ?? []).reduce((sum, e) => sum + Number(e.amount ?? 0), 0);

  const sixMonthsAgo = new Date(startOfMonth);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  const { data: trendSales } = await supabase
    .from("sales")
    .select("sale_date, total")
    .eq("company_id", companyId)
    .gte("sale_date", sixMonthsAgo.toISOString().slice(0, 10))
    .neq("status", "cancelled");

  const monthBuckets: { key: string; month: string; total: number }[] = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(sixMonthsAgo);
    d.setMonth(d.getMonth() + i);
    return {
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      month: d.toLocaleDateString("fr-FR", { month: "short" }),
      total: 0,
    };
  });
  for (const sale of trendSales ?? []) {
    const key = sale.sale_date.slice(0, 7);
    const bucket = monthBuckets.find((b) => b.key === key);
    if (bucket) bucket.total += Number(sale.total);
  }

  const stats = [
    { label: "Clients", value: clientsCount ?? 0 },
    { label: "Ventes du mois", value: salesTotal.toLocaleString("fr-FR") },
    { label: "Dépenses du mois", value: expensesTotal.toLocaleString("fr-FR") },
    { label: "Alertes ouvertes", value: alertsCount ?? 0 },
    { label: "Validations en attente", value: pendingApprovalsCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Tableau de bord</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Vue d&apos;ensemble de {active.company?.trade_name || active.company?.name}.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <SalesTrendChart data={monthBuckets.map(({ month, total }) => ({ month, total }))} />
      </div>
    </div>
  );
}
