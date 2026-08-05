import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { PositionForm } from "../position-form";

export default async function NewPositionPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();
  const { data: orgUnits } = await supabase.from("org_units").select("id, name").eq("company_id", active.company_id);

  return (
    <div>
      <PageHeader title="Nouveau poste" />
      <PositionForm companyId={active.company_id} orgUnits={orgUnits ?? []} />
    </div>
  );
}
