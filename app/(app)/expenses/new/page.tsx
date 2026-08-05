import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ExpenseForm } from "../expense-form";

export default async function NewExpensePage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: categories }, { data: orgUnits }] = await Promise.all([
    supabase.from("expense_categories").select("name").eq("company_id", active.company_id),
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id).order("name"),
  ]);

  return (
    <div>
      <PageHeader title="Nouvelle dépense" />
      <ExpenseForm
        companyId={active.company_id}
        categories={(categories ?? []).map((c) => c.name)}
        orgUnits={orgUnits ?? []}
      />
    </div>
  );
}
