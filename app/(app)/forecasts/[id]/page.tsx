import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader, Badge } from "@/components/table";
import { getActualValue, addVarianceComment } from "@/lib/actions/forecasts";
import { ManualActualForm } from "./manual-actual-form";
import { TextAreaField, TextField, SubmitButton } from "@/components/form";

const AUTO_SUBJECTS = new Set(["sales", "expenses", "revenue"]);

export default async function ForecastDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: forecast } = await supabase.from("forecasts").select("*").eq("id", id).single();
  if (!forecast) notFound();

  const [actual, { data: comments }] = await Promise.all([
    getActualValue(active.company_id, forecast.subject, forecast.period_start, forecast.period_end, forecast.id),
    supabase.from("variance_comments").select("*").eq("forecast_id", id).order("created_at", { ascending: false }),
  ]);

  const variance = actual - Number(forecast.target_value);
  const boundAddComment = addVarianceComment.bind(null, id);

  return (
    <div>
      <PageHeader title={`Prévision : ${forecast.subject}`} />

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Prévu" value={Number(forecast.target_value).toLocaleString("fr-FR")} />
        <Stat label="Réalisé" value={actual.toLocaleString("fr-FR")} />
        <div>
          <p className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">Écart</p>
          <Badge tone={variance >= 0 ? "green" : "red"}>
            {variance >= 0 ? "+" : ""}
            {variance.toLocaleString("fr-FR")}
          </Badge>
        </div>
      </div>

      {!AUTO_SUBJECTS.has(forecast.subject) && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Saisir une réalisation manuelle
          </p>
          <ManualActualForm forecastId={forecast.id} />
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Explication des écarts</h2>
        <form action={boundAddComment} className="flex max-w-xl flex-col gap-3">
          <TextAreaField label="Commentaire" name="comment" />
          <TextField label="Cause" name="cause" />
          <TextField label="Action corrective" name="corrective_action" />
          <TextField label="Échéance" name="due_date" type="date" />
          <SubmitButton>Ajouter</SubmitButton>
        </form>

        <ul className="mt-4 space-y-3">
          {(comments ?? []).map((c) => (
            <li key={c.id} className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">
              <p>{c.comment}</p>
              {c.cause && <p className="text-zinc-500 dark:text-zinc-400">Cause : {c.cause}</p>}
              {c.corrective_action && (
                <p className="text-zinc-500 dark:text-zinc-400">Action : {c.corrective_action}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}
