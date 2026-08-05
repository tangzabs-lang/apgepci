import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { SupplierForm } from "../supplier-form";

export default async function NewSupplierPage() {
  const active = await getActiveCompany();
  if (!active) return null;

  return (
    <div>
      <PageHeader title="Nouveau fournisseur" />
      <SupplierForm companyId={active.company_id} />
    </div>
  );
}
