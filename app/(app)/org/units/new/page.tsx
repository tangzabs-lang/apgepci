import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { OrgUnitForm } from "../org-unit-form";

export default async function NewOrgUnitPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: sites }, { data: units }] = await Promise.all([
    supabase.from("sites").select("id, name").eq("company_id", active.company_id).order("name"),
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id).order("name"),
  ]);

  return (
    <div>
      <PageHeader title="Nouvelle unité organisationnelle" />
      <OrgUnitForm companyId={active.company_id} sites={sites ?? []} units={units ?? []} />
    </div>
  );
}
