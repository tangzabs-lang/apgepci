"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const forecastSchema = z.object({
  company_id: z.string().uuid(),
  subject: z.enum([
    "sales", "purchases", "expenses", "production", "recruitment", "stock",
    "projects", "markets", "revenue", "quantity", "commercial_objective",
  ]),
  period_type: z.enum(["daily", "weekly", "monthly", "quarterly", "biannual", "yearly", "custom"]),
  period_start: z.string().min(1),
  period_end: z.string().min(1),
  target_value: z.coerce.number(),
});

export async function createForecast(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = forecastSchema.safeParse({
    company_id: formData.get("company_id"),
    subject: formData.get("subject"),
    period_type: formData.get("period_type"),
    period_start: formData.get("period_start"),
    period_end: formData.get("period_end"),
    target_value: formData.get("target_value"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("forecasts").insert({ ...parsed.data, scope_type: "company" });
  if (error) return { error: humanizeError(error) };

  revalidatePath("/forecasts");
  redirect("/forecasts");
}

export async function addManualActual(forecastId: string, value: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase
    .from("forecast_actuals_manual")
    .insert({ forecast_id: forecastId, actual_value: value, recorded_by: user?.id });
  revalidatePath("/forecasts");
}

export async function addVarianceComment(forecastId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dueDate = formData.get("due_date");
  await supabase.from("variance_comments").insert({
    forecast_id: forecastId,
    comment: String(formData.get("comment") || ""),
    cause: String(formData.get("cause") || ""),
    corrective_action: String(formData.get("corrective_action") || ""),
    due_date: typeof dueDate === "string" && dueDate ? dueDate : null,
    created_by: user?.id,
  });
  revalidatePath(`/forecasts/${forecastId}`);
}

export async function getActualValue(
  companyId: string,
  subject: string,
  periodStart: string,
  periodEnd: string,
  forecastId: string
): Promise<number> {
  const supabase = await createClient();

  if (subject === "sales" || subject === "revenue") {
    const { data } = await supabase
      .from("sales")
      .select("total")
      .eq("company_id", companyId)
      .gte("sale_date", periodStart)
      .lte("sale_date", periodEnd)
      .neq("status", "cancelled");
    return (data ?? []).reduce((sum, s) => sum + Number(s.total), 0);
  }

  if (subject === "expenses") {
    const { data } = await supabase
      .from("expenses")
      .select("amount")
      .eq("company_id", companyId)
      .gte("expense_date", periodStart)
      .lte("expense_date", periodEnd)
      .eq("status", "approved");
    return (data ?? []).reduce((sum, e) => sum + Number(e.amount), 0);
  }

  const { data } = await supabase
    .from("forecast_actuals_manual")
    .select("actual_value")
    .eq("forecast_id", forecastId)
    .order("recorded_at", { ascending: false })
    .limit(1);
  return data?.[0]?.actual_value ?? 0;
}
