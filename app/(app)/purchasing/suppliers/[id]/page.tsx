import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { SupplierForm } from "../supplier-form";

export default async function EditSupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: supplier } = await supabase.from("suppliers").select("*").eq("id", id).single();
  if (!supplier) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${supplier.name}`} />
      <SupplierForm
        companyId={active.company_id}
        defaultValues={{
          ...supplier,
          contacts: supplier.contacts as { phone?: string; email?: string } | null,
        }}
      />
    </div>
  );
}
