import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ProspectForm } from "../prospect-form";

export default async function NewProspectPage() {
  const active = await getActiveCompany();
  if (!active) return null;

  return (
    <div>
      <PageHeader title="Nouveau prospect" />
      <ProspectForm companyId={active.company_id} />
    </div>
  );
}
