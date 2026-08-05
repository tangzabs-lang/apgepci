import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { RequestForm } from "../request-form";

export default async function NewPurchaseRequestPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: orgUnits }, { data: products }] = await Promise.all([
    supabase.from("org_units").select("id, name").eq("company_id", active.company_id).order("name"),
    supabase.from("products").select("id, name").eq("company_id", active.company_id).order("name"),
  ]);

  return (
    <div>
      <PageHeader title="Nouvelle demande d'achat" />
      <RequestForm companyId={active.company_id} orgUnits={orgUnits ?? []} products={products ?? []} />
    </div>
  );
}
