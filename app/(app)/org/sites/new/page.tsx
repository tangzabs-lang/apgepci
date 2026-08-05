import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { SiteForm } from "../site-form";

export default async function NewSitePage() {
  const active = await getActiveCompany();
  if (!active) return null;

  return (
    <div>
      <PageHeader title="Nouveau site" />
      <SiteForm companyId={active.company_id} />
    </div>
  );
}
