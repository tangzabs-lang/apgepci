import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ProjectForm } from "../project-form";

export default async function NewProjectPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, name").eq("company_id", active.company_id);

  return (
    <div>
      <PageHeader title="Nouveau projet" />
      <ProjectForm companyId={active.company_id} clients={clients ?? []} />
    </div>
  );
}
