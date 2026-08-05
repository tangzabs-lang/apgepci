import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { SiteForm } from "../site-form";

export default async function EditSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: site } = await supabase.from("sites").select("*").eq("id", id).single();
  if (!site) notFound();

  return (
    <div>
      <PageHeader title={`Modifier : ${site.name}`} />
      <SiteForm companyId={active.company_id} defaultValues={site} />
    </div>
  );
}
