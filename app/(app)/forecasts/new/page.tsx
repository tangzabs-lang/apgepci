import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ForecastForm } from "../forecast-form";

export default async function NewForecastPage() {
  const active = await getActiveCompany();
  if (!active) return null;

  return (
    <div>
      <PageHeader title="Nouvelle prévision" />
      <ForecastForm companyId={active.company_id} />
    </div>
  );
}
