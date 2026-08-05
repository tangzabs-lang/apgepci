import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader, Badge } from "@/components/table";
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
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
          >
            + Prévision
          </Link>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr className="text-left text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
              <th className="px-4 py-2">Sujet</th>
              <th className="px-4 py-2">Période</th>
              <th className="px-4 py-2">Prévu</th>
              <th className="px-4 py-2">Réalisé</th>
              <th className="px-4 py-2">Écart</th>
              <th className="px-4 py-2">Taux</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 text-sm">{SUBJECT_LABELS[r.subject] ?? r.subject}</td>
                <td className="px-4 py-2 text-sm">
                  {r.period_start} → {r.period_end}
                </td>
                <td className="px-4 py-2 text-sm">{Number(r.target_value).toLocaleString("fr-FR")}</td>
                <td className="px-4 py-2 text-sm">{r.actual.toLocaleString("fr-FR")}</td>
                <td className="px-4 py-2 text-sm">
                  <Badge tone={r.variance >= 0 ? "green" : "red"}>
                    {r.variance >= 0 ? "+" : ""}
                    {r.variance.toLocaleString("fr-FR")}
                  </Badge>
                </td>
                <td className="px-4 py-2 text-sm">
                  {r.target_value ? `${(100 + r.variancePct).toFixed(0)}%` : "—"}
                </td>
                <td className="px-4 py-2 text-right">
                  <Link href={`/forecasts/${r.id}`} className="text-sm font-medium underline">
                    Détails
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Aucune prévision enregistrée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
