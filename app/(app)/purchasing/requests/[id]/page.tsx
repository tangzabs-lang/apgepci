import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { RequestActions } from "./request-actions";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: request }, { data: lines }, { data: suppliers }] = await Promise.all([
    supabase.from("purchase_requests").select("*").eq("id", id).single(),
    supabase
      .from("purchase_request_lines")
      .select("id, quantity, need_description, product:products(name)")
      .eq("request_id", id),
    supabase.from("suppliers").select("id, name").eq("company_id", active.company_id),
  ]);

  if (!request) notFound();

  return (
    <div>
      <PageHeader title={`Demande ${request.reference}`} action={<Badge>{request.status}</Badge>} />
      <RequestActions requestId={request.id} status={request.status} suppliers={suppliers ?? []} />

      <div className="mt-6">
        <DataTable
          rows={lines ?? []}
          columns={[
            { key: "product", label: "Article", render: (r) => r.product?.name ?? "—" },
            { key: "quantity", label: "Quantité" },
            { key: "need_description", label: "Besoin" },
          ]}
        />
      </div>
    </div>
  );
}
