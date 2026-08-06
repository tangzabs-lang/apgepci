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
            className="btn btn-primary"
          >
            + Prévision
          </Link>
        }
      />

      <div className="card overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-linear-to-r from-blue-50 to-white">
            <tr className="border-b border-slate-200 text-left text-[0.7rem] font-bold uppercase tracking-widest text-blue-900/70">
              <th className="whitespace-nowrap px-4 py-3">Sujet</th>
              <th className="whitespace-nowrap px-4 py-3">Période</th>
              <th className="whitespace-nowrap px-4 py-3">Prévu</th>
              <th className="whitespace-nowrap px-4 py-3">Réalisé</th>
              <th className="whitespace-nowrap px-4 py-3">Écart</th>
              <th className="whitespace-nowrap px-4 py-3">Taux</th>
              <th className="whitespace-nowrap px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((r) => (
              <tr className="transition-colors hover:bg-blue-50/50" key={r.id}>
                <td className="px-4 py-3 text-sm text-slate-700">{SUBJECT_LABELS[r.subject] ?? r.subject}</td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {r.period_start} → {r.period_end}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{Number(r.target_value).toLocaleString("fr-FR")}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{r.actual.toLocaleString("fr-FR")}</td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  <Badge tone={r.variance >= 0 ? "green" : "red"}>
                    {r.variance >= 0 ? "+" : ""}
                    {r.variance.toLocaleString("fr-FR")}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {r.target_value ? `${(100 + r.variancePct).toFixed(0)}%` : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/forecasts/${r.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
                    Détails
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
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
