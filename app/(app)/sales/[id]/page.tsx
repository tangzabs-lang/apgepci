import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader, Badge, DataTable } from "@/components/table";
import { SalesForm } from "../sales-form";
import { StatusActions } from "./status-actions";

export default async function SaleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: sale } = await supabase.from("sales").select("*").eq("id", id).single();
  if (!sale) notFound();

  const { data: saleLines } = await supabase
    .from("sale_lines")
    .select("product_id, quantity, unit_price, discount, tax_rate, product:products(name)")
    .eq("sale_id", id);

  if (sale.status === "draft") {
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
        <PageHeader title={`Vente ${sale.reference}`} />
        <StatusActions saleId={sale.id} status={sale.status} />
        <div className="mt-6">
          <SalesForm
            companyId={active.company_id}
            clients={clients ?? []}
            salesReps={(reps ?? []).map((r) => ({ id: r.id, label: r.profile?.full_name ?? "Utilisateur" }))}
            sites={sites ?? []}
            products={products ?? []}
            defaultValues={{
              id: sale.id,
              sale_date: sale.sale_date,
              client_id: sale.client_id,
              sales_rep_id: sale.sales_rep_id,
              site_id: sale.site_id,
              notes: sale.notes,
              lines: (saleLines ?? []).map((l) => ({
                product_id: l.product_id ?? "",
                quantity: Number(l.quantity),
                unit_price: Number(l.unit_price),
                discount: Number(l.discount),
                tax_rate: Number(l.tax_rate),
              })),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Vente ${sale.reference}`}
        action={<Badge tone="green">{sale.status}</Badge>}
      />
      <StatusActions saleId={sale.id} status={sale.status} />

      <div className="mt-6">
        <DataTable
          rows={(saleLines ?? []).map((l, i) => ({ id: String(i), ...l }))}
          columns={[
            { key: "product", label: "Article", render: (r) => r.product?.name ?? "—" },
            { key: "quantity", label: "Quantité" },
            { key: "unit_price", label: "Prix unitaire", render: (r) => Number(r.unit_price).toLocaleString("fr-FR") },
            { key: "discount", label: "Remise", render: (r) => Number(r.discount).toLocaleString("fr-FR") },
          ]}
        />
      </div>

      <dl className="mt-6 max-w-xs space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-500 dark:text-zinc-400">Total</dt>
          <dd className="font-semibold">{Number(sale.total).toLocaleString("fr-FR")}</dd>
        </div>
      </dl>
    </div>
  );
}
