import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { getActualValue } from "@/lib/actions/forecasts";

const SUBJECT_LABELS: Record<string, string> = {
  sales: "Ventes",
  purchases: "Achats",
  expenses: "Dépenses",
  production: "Production",
  recruitment: "Recrutements",
  stock: "Stock",
  projects: "Projets",
  markets: "Marchés",
  revenue: "Chiffre d'affaires",
  quantity: "Quantités",
  commercial_objective: "Objectif commercial",
};

export default async function ForecastsPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: forecasts } = await supabase
    .from("forecasts")
    .select("id, subject, period_type, period_start, period_end, target_value")
    .eq("company_id", active.company_id)
    .order("period_start", { ascending: false });

  const rows = await Promise.all(
    (forecasts ?? []).map(async (f) => {
      const actual = await getActualValue(active.company_id, f.subject, f.period_start, f.period_end, f.id);
      const variance = actual - Number(f.target_value);
      const variancePct = f.target_value ? (variance / Number(f.target_value)) * 100 : 0;
      return { ...f, actual, variance, variancePct };
    })
  );

  return (
    <div>
      <PageHeader
        title="Prévisions, réalisations et écarts"
        action={
          <Link
            href="/forecasts/new"
            className="btn btn-primary"
          >
            + Prévision
          </Link>
        }
      />

      <DataTable
        rows={rows}
        emptyMessage="Aucune prévision enregistrée."
        editHref={(r) => `/forecasts/${r.id}`}
        columns={[
          { key: "subject", label: "Sujet", render: (r) => SUBJECT_LABELS[r.subject] ?? r.subject },
          { key: "period", label: "Période", render: (r) => `${r.period_start} → ${r.period_end}` },
          {
            key: "target_value",
            label: "Prévu",
            render: (r) => Number(r.target_value).toLocaleString("fr-FR"),
          },
          {
            key: "actual",
            label: "Réalisé",
            render: (r) => (
              <span className="font-semibold text-slate-900">
                {r.actual.toLocaleString("fr-FR")}
              </span>
            ),
          },
          {
            key: "variance",
            label: "Écart",
            render: (r) => (
              <Badge tone={r.variance >= 0 ? "green" : "red"}>
                {r.variance >= 0 ? "+" : ""}
                {r.variance.toLocaleString("fr-FR")}
              </Badge>
            ),
          },
          {
            key: "rate",
            label: "Taux",
            render: (r) => (r.target_value ? `${(100 + r.variancePct).toFixed(0)}%` : "—"),
          },
        ]}
      />
    </div>
  );
}
