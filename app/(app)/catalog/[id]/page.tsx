import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ProductForm } from "../product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }, { data: units }, { data: suppliers }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("product_categories").select("name").eq("company_id", active.company_id),
    supabase.from("units_of_measure").select("symbol").eq("company_id", active.company_id),
    supabase.from("suppliers").select("id, name").eq("company_id", active.company_id),
  ]);

  if (!product) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${product.name}`} />
      <ProductForm
        companyId={active.company_id}
        categories={(categories ?? []).map((c) => c.name)}
        units={(units ?? []).map((u) => u.symbol)}
        suppliers={suppliers ?? []}
        defaultValues={product}
      />
    </div>
  );
}
