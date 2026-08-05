import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ExpenseForm } from "../expense-form";

export default async function EditExpensePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: expense }, { data: categories }, { data: orgUnits }] = await Promise.all([
    supabase.from("expenses").select("*, category:expense_categories(name)").eq("id", id).single(),
    supabase.from("expense_categories").select("name").eq("company_id", active.company_id),
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id).order("name"),
  ]);

  if (!expense) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${expense.reference}`} />
      <ExpenseForm
        companyId={active.company_id}
        categories={(categories ?? []).map((c) => c.name)}
        orgUnits={orgUnits ?? []}
        defaultValues={{ ...expense, category_name: expense.category?.name }}
      />
    </div>
  );
}
