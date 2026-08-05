import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: categories }, { data: units }, { data: suppliers }] = await Promise.all([
    supabase.from("product_categories").select("name").eq("company_id", active.company_id),
    supabase.from("units_of_measure").select("symbol").eq("company_id", active.company_id),
    supabase.from("suppliers").select("id, name").eq("company_id", active.company_id),
  ]);

  return (
    <div>
      <PageHeader title="Nouvel article" />
      <ProductForm
        companyId={active.company_id}
        categories={(categories ?? []).map((c) => c.name)}
        units={(units ?? []).map((u) => u.symbol)}
        suppliers={suppliers ?? []}
      />
    </div>
  );
}
