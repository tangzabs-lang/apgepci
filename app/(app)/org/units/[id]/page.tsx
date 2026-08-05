import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { OrgUnitForm } from "../org-unit-form";

export default async function EditOrgUnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: unit }, { data: sites }, { data: units }] = await Promise.all([
    supabase.from("org_units").select("*").eq("id", id).single(),
    supabase.from("sites").select("id, name").eq("company_id", active.company_id).order("name"),
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id).order("name"),
  ]);

  if (!unit) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${unit.name}`} />
      <OrgUnitForm
        companyId={active.company_id}
        sites={sites ?? []}
        units={units ?? []}
        defaultValues={unit}
      />
    </div>
  );
}
