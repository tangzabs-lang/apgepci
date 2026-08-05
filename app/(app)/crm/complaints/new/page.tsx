import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ComplaintForm } from "../complaint-form";

export default async function NewComplaintPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, name").eq("company_id", active.company_id);

  return (
    <div>
      <PageHeader title="Nouvelle réclamation" />
      <ComplaintForm companyId={active.company_id} clients={clients ?? []} />
    </div>
  );
}
