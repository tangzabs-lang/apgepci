import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { WarehouseForm } from "../warehouse-form";

export default async function NewWarehousePage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();
  const { data: sites } = await supabase.from("sites").select("id, name").eq("company_id", active.company_id);

  return (
    <div>
      <PageHeader title="Nouvel entrepôt" />
      <WarehouseForm companyId={active.company_id} sites={sites ?? []} />
    </div>
  );
}
