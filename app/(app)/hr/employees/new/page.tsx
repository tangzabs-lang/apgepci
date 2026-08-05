import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { EmployeeForm } from "../employee-form";

export default async function NewEmployeePage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: orgUnits }, { data: positions }, { data: sites }] = await Promise.all([
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id),
    supabase.from("positions").select("id, title").eq("company_id", active.company_id),
    supabase.from("sites").select("id, name").eq("company_id", active.company_id),
  ]);

  return (
    <div>
      <PageHeader title="Nouvel employé" />
      <EmployeeForm
        companyId={active.company_id}
        orgUnits={orgUnits ?? []}
        positions={positions ?? []}
        sites={sites ?? []}
      />
    </div>
  );
}
