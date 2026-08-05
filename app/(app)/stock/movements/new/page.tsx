import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { MovementForm } from "../movement-form";

export default async function NewMovementPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: warehouses }, { data: products }] = await Promise.all([
    supabase.from("warehouses").select("id, name").eq("company_id", active.company_id),
    supabase.from("products").select("id, name").eq("company_id", active.company_id).eq("status", "active"),
  ]);

  return (
    <div>
      <PageHeader title="Nouveau mouvement de stock" />
      <MovementForm companyId={active.company_id} warehouses={warehouses ?? []} products={products ?? []} />
    </div>
  );
}
