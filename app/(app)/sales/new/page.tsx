import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { SalesForm } from "../sales-form";

export default async function NewSalePage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: clients }, { data: reps }, { data: sites }, { data: products }] = await Promise.all([
    supabase.from("clients").select("id, name").eq("company_id", active.company_id).order("name"),
    supabase
      .from("company_users")
      .select("id, profile:profiles(full_name)")
      .eq("company_id", active.company_id)
      .eq("status", "active"),
    supabase.from("sites").select("id, name").eq("company_id", active.company_id).order("name"),
    supabase
      .from("products")
      .select("id, name, sale_price, tax_rate")
      .eq("company_id", active.company_id)
      .eq("status", "active")
      .order("name"),
  ]);

  return (
    <div>
      <PageHeader title="Nouvelle vente" />
      <SalesForm
        companyId={active.company_id}
        clients={clients ?? []}
        salesReps={(reps ?? []).map((r) => ({ id: r.id, label: r.profile?.full_name ?? "Utilisateur" }))}
        sites={sites ?? []}
        products={products ?? []}
      />
    </div>
  );
}
