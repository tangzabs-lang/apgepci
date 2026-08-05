import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { ClientForm } from "../client-form";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: client }, { data: reps }, { data: categories }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).single(),
    supabase
      .from("company_users")
      .select("id, profile:profiles(full_name)")
      .eq("company_id", active.company_id)
      .eq("status", "active"),
    supabase.from("client_categories").select("name").eq("company_id", active.company_id),
  ]);

  if (!client) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${client.name}`} />
      <ClientForm
        companyId={active.company_id}
        salesReps={(reps ?? []).map((r) => ({ id: r.id, label: r.profile?.full_name ?? "Utilisateur" }))}
        categories={(categories ?? []).map((c) => c.name)}
        defaultValues={client}
      />
    </div>
  );
}
