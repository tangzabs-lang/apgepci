import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Receipt,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { SalesExpensesChart, SalesTrendChart } from "@/components/sales-trend-chart";
import { Badge } from "@/components/table";
import { statusLabel } from "@/lib/labels";

const nf = new Intl.NumberFormat("fr-FR");

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default async function DashboardPage() {
  const active = await getActiveCompany();
  if (!active) return null;

  const supabase = await createClient();
  const companyId = active.company_id;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const startOfPrevMonth = new Date(startOfMonth);
  startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1);
  const sixMonthsAgo = new Date(startOfMonth);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  const sixMonthsIso = sixMonthsAgo.toISOString().slice(0, 10);

  const [
    { count: clientsCount },
    { count: alertsCount },
    { count: pendingApprovalsCount },
    { data: trendSales },
    { data: trendExpenses },
    { data: recentSales },
  ] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }).eq("company_id", companyId),
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
    supabase
      .from("sales")
      .select("sale_date, total")
      .eq("company_id", companyId)
      .gte("sale_date", sixMonthsIso)
      .neq("status", "cancelled"),
    supabase
      .from("expenses")
      .select("expense_date, amount")
      .eq("company_id", companyId)
      .gte("expense_date", sixMonthsIso),
    supabase
      .from("sales")
      .select("id, reference, sale_date, total, status, client:clients(name)")
      .eq("company_id", companyId)
      .order("sale_date", { ascending: false })
      .limit(6),
  ]);

  // Séries mensuelles sur 6 mois, à partir des données déjà chargées.
  const buckets = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(sixMonthsAgo);
    d.setMonth(d.getMonth() + i);
    return {
      key: monthKey(d),
      month: d.toLocaleDateString("fr-FR", { month: "short" }),
      sales: 0,
      expenses: 0,
    };
  });
  for (const sale of trendSales ?? []) {
    const b = buckets.find((x) => x.key === sale.sale_date.slice(0, 7));
    if (b) b.sales += Number(sale.total ?? 0);
  }
  for (const exp of trendExpenses ?? []) {
    const b = buckets.find((x) => x.key === exp.expense_date.slice(0, 7));
    if (b) b.expenses += Number(exp.amount ?? 0);
  }

  const currentKey = monthKey(startOfMonth);
  const prevKey = monthKey(startOfPrevMonth);
  const current = buckets.find((b) => b.key === currentKey);
  const previous = buckets.find((b) => b.key === prevKey);

  const salesTotal = current?.sales ?? 0;
  const expensesTotal = current?.expenses ?? 0;
  const marginTotal = salesTotal - expensesTotal;

  function variation(now: number, before: number | undefined) {
    if (!before) return null;
    return ((now - before) / before) * 100;
  }
  const salesVariation = variation(salesTotal, previous?.sales);
  const expensesVariation = variation(expensesTotal, previous?.expenses);

  const stats = [
    {
      label: "Ventes du mois",
      value: nf.format(salesTotal),
      icon: ShoppingCart,
      variation: salesVariation,
      positiveIsGood: true,
      href: "/sales",
    },
    {
      label: "Dépenses du mois",
      value: nf.format(expensesTotal),
      icon: Receipt,
      variation: expensesVariation,
      positiveIsGood: false,
      href: "/expenses",
    },
    {
      label: "Solde opérationnel",
      value: nf.format(marginTotal),
      icon: Wallet,
      variation: null,
      positiveIsGood: true,
      href: "/forecasts",
    },
    {
      label: "Clients",
      value: nf.format(clientsCount ?? 0),
      icon: Users,
      variation: null,
      positiveIsGood: true,
      href: "/clients",
    },
  ];

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statusTone: Record<string, "default" | "blue" | "green" | "red" | "yellow"> = {
    draft: "default",
    pending: "yellow",
    validated: "green",
    delivered: "green",
    partially_delivered: "yellow",
    cancelled: "red",
    closed: "blue",
  };

  const quickActions = [
    { href: "/sales/new", label: "Nouvelle vente", icon: ShoppingCart },
    { href: "/expenses/new", label: "Nouvelle dépense", icon: Receipt },
    { href: "/clients/new", label: "Nouveau client", icon: UserPlus },
    { href: "/catalog/new", label: "Nouvel article", icon: Boxes },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Bandeau d'accueil */}
      <section className="panel-gradient relative overflow-hidden rounded-lg px-4 py-6 text-white shadow-[0_24px_60px_-30px_rgba(30,64,175,0.9)] sm:rounded-lg sm:px-8 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 88% 10%, rgba(255,255,255,0.22), transparent 45%), radial-gradient(circle at 10% 120%, rgba(255,255,255,0.16), transparent 40%)",
          }}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/15 px-3 py-1 text-xs font-semibold capitalize text-blue-50 ring-1 ring-inset ring-white/20">
              {today}
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
              Tableau de bord
            </h1>
            <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-blue-50/90">
              Vue d&apos;ensemble de{" "}
              <span className="font-semibold text-white">
                {active.company?.trade_name || active.company?.name}
              </span>{" "}
              : activité du mois, tendances sur six mois et points nécessitant votre attention.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <div className="rounded-lg bg-white/12 px-3 py-3 ring-1 ring-inset ring-white/20 backdrop-blur sm:px-4">
              <p className="text-xs font-medium text-blue-50/80">Alertes ouvertes</p>
              <p className="mt-1 flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <AlertTriangle className="h-5 w-5 text-amber-200" />
                {nf.format(alertsCount ?? 0)}
              </p>
            </div>
            <div className="rounded-lg bg-white/12 px-3 py-3 ring-1 ring-inset ring-white/20 backdrop-blur sm:px-4">
              <p className="text-xs font-medium text-blue-50/80">Validations en attente</p>
              <p className="mt-1 flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <CheckCircle2 className="h-5 w-5 text-blue-100" />
                {nf.format(pendingApprovalsCount ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indicateurs clés */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((s) => {
          const up = (s.variation ?? 0) >= 0;
          const good = up === s.positiveIsGood;
          return (
            <Link key={s.label} href={s.href} className="stat-card card-hover group p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white sm:h-11 sm:w-11">
                  <s.icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-600" />
              </div>
              <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400 sm:mt-4 sm:text-xs">
                {s.label}
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">{s.value}</p>
              {s.variation !== null && (
                <p
                  className={`mt-2 inline-flex items-center gap-1 text-[0.68rem] font-semibold sm:text-xs ${
                    good ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {up ? "+" : ""}
                  {s.variation.toFixed(1)} %
                  <span className="hidden sm:inline">vs mois précédent</span>
                </p>
              )}
            </Link>
          );
        })}
      </section>

      {/* Graphiques */}
      <section className="grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-5">
        <div className="card p-4 sm:p-6 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Tendance des ventes</h2>
              <p className="text-sm text-slate-500">Six derniers mois, ventes non annulées.</p>
            </div>
            <Link href="/sales" className="btn btn-secondary">
              Détail
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <SalesTrendChart data={buckets.map(({ month, sales }) => ({ month, total: sales }))} />
        </div>

        <div className="card p-4 sm:p-6 xl:col-span-2">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Ventes vs dépenses</h2>
            <p className="text-sm text-slate-500">Comparatif mensuel.</p>
          </div>
          <SalesExpensesChart
            data={buckets.map(({ month, sales, expenses }) => ({ month, sales, expenses }))}
          />
        </div>
      </section>

      {/* Dernières ventes + actions rapides */}
      <section className="grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-5">
        <div className="card overflow-hidden xl:col-span-3">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-linear-to-r from-blue-50 to-white px-5 py-4">
            <h2 className="text-base font-bold text-slate-900">Dernières ventes</h2>
            <Link
              href="/sales"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Tout voir <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {(recentSales ?? []).length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">
              Aucune vente enregistrée pour le moment.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {(recentSales ?? []).map((sale) => (
                <li key={sale.id}>
                  <Link
                    href={`/sales/${sale.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-blue-50/50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-800">
                        {sale.client?.name ?? "Client non renseigné"}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {sale.reference} · {sale.sale_date}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <Badge tone={statusTone[sale.status] ?? "default"}>{statusLabel(sale.status)}</Badge>
                      <span className="text-sm font-bold text-slate-900">
                        {nf.format(Number(sale.total ?? 0))}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-4 sm:p-6 xl:col-span-2">
          <h2 className="text-base font-bold text-slate-900">Actions rapides</h2>
          <p className="text-sm text-slate-500">Les saisies les plus fréquentes.</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <a.icon className="h-4 w-4" />
                </span>
                {a.label}
                <ArrowRight className="ml-auto h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
