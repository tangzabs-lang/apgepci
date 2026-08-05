import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { EmployeeForm } from "../employee-form";

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: employee }, { data: orgUnits }, { data: positions }, { data: sites }] = await Promise.all([
    supabase.from("employees").select("*").eq("id", id).single(),
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id),
    supabase.from("positions").select("id, title").eq("company_id", active.company_id),
    supabase.from("sites").select("id, name").eq("company_id", active.company_id),
  ]);

  if (!employee) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${employee.first_name} ${employee.last_name}`} />
      <EmployeeForm
        companyId={active.company_id}
        orgUnits={orgUnits ?? []}
        positions={positions ?? []}
        sites={sites ?? []}
        defaultValues={employee}
      />
    </div>
  );
}
