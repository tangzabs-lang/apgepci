"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type DiagnosticAnswers = {
  sells_products: boolean;
  sells_services: boolean;
  produces_goods: boolean;
  buys_from_suppliers: boolean;
  manages_stock: boolean;
  invoices_on_credit: boolean;
  delivers_goods: boolean;
  has_sales_reps: boolean;
  has_commissions: boolean;
  has_sales_objectives: boolean;
  tracks_expenses: boolean;
  manages_employees: boolean;
  has_multiple_sites: boolean;
  runs_projects_or_markets: boolean;
  current_tools: string;
  expected_reports: string;
  current_difficulties: string;
};

function recommendModules(a: DiagnosticAnswers): string[] {
  const modules = new Set<string>(["org", "dashboards", "reports", "documents", "audit"]);
  if (a.sells_products || a.sells_services) modules.add("catalog").add("clients").add("sales");
  if (a.has_sales_reps || a.has_commissions || a.has_sales_objectives) modules.add("forecasts");
  if (a.buys_from_suppliers) modules.add("purchasing");
  if (a.manages_stock) modules.add("stock");
  if (a.produces_goods) modules.add("production");
  if (a.tracks_expenses) modules.add("expenses");
  if (a.manages_employees) modules.add("hr");
  if (a.runs_projects_or_markets) modules.add("projects");
  if (a.delivers_goods || a.has_multiple_sites) modules.add("logistics");
  modules.add("crm");
  return Array.from(modules);
}

export async function saveDiagnostic(companyId: string, formData: FormData) {
  const bool = (key: string) => formData.get(key) === "on";
  const answers: DiagnosticAnswers = {
    sells_products: bool("sells_products"),
    sells_services: bool("sells_services"),
    produces_goods: bool("produces_goods"),
    buys_from_suppliers: bool("buys_from_suppliers"),
    manages_stock: bool("manages_stock"),
    invoices_on_credit: bool("invoices_on_credit"),
    delivers_goods: bool("delivers_goods"),
    has_sales_reps: bool("has_sales_reps"),
    has_commissions: bool("has_commissions"),
    has_sales_objectives: bool("has_sales_objectives"),
    tracks_expenses: bool("tracks_expenses"),
    manages_employees: bool("manages_employees"),
    has_multiple_sites: bool("has_multiple_sites"),
    runs_projects_or_markets: bool("runs_projects_or_markets"),
    current_tools: String(formData.get("current_tools") ?? ""),
    expected_reports: String(formData.get("expected_reports") ?? ""),
    current_difficulties: String(formData.get("current_difficulties") ?? ""),
  };

  const recommended_modules = recommendModules(answers);
  const supabase = await createClient();
  await supabase
    .from("company_diagnostics")
    .update({
      answers,
      recommended_modules,
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("company_id", companyId);

  revalidatePath(`/onboarding/diagnostic`);
}

export async function validateDiagnostic(companyId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase
    .from("company_diagnostics")
    .update({
      status: "validated",
      validated_by: user?.id,
      validated_at: new Date().toISOString(),
    })
    .eq("company_id", companyId);

  revalidatePath("/dashboard");
}
