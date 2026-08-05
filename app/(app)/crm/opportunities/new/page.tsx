import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { OpportunityForm } from "../opportunity-form";

export default async function NewOpportunityPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: clients }, { data: prospects }] = await Promise.all([
    supabase.from("clients").select("id, name").eq("company_id", active.company_id),
    supabase.from("prospects").select("id, name").eq("company_id", active.company_id),
  ]);

  return (
    <div>
      <PageHeader title="Nouvelle opportunité" />
      <OpportunityForm companyId={active.company_id} clients={clients ?? []} prospects={prospects ?? []} />
    </div>
  );
}
